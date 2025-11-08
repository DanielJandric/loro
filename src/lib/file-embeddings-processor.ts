import fs from 'fs';
import path from 'path';
import { AzureOCRService } from './azure-ocr';
import { EmbeddingService } from './embeddings';
import { SupabaseEmbeddingsService, FileEmbedding } from './supabase-embeddings';

export interface ProcessingOptions {
  skipExisting?: boolean;
  verbose?: boolean;
  chunkLargeFiles?: boolean;
  chunkSize?: number;
}

export interface ProcessingResult {
  success: boolean;
  filePath: string;
  error?: string;
  chunksCreated?: number;
}

/**
 * Main orchestrator service for processing files and creating embeddings
 */
export class FileEmbeddingsProcessor {
  private ocrService: AzureOCRService;
  private embeddingService: EmbeddingService;
  private supabaseService: SupabaseEmbeddingsService;

  constructor() {
    this.ocrService = new AzureOCRService();
    this.embeddingService = new EmbeddingService();
    this.supabaseService = new SupabaseEmbeddingsService();
  }

  /**
   * Process a single file: extract text, generate embedding, store in Supabase
   * @param filePath Path to the file
   * @param options Processing options
   * @returns Processing result
   */
  async processFile(
    filePath: string,
    options: ProcessingOptions = {}
  ): Promise<ProcessingResult> {
    try {
      const fileName = path.basename(filePath);
      const fileType = path.extname(filePath).toLowerCase();

      if (options.verbose) {
        console.log(`Processing: ${filePath}`);
      }

      // Check if already processed
      if (options.skipExisting) {
        const existing = await this.supabaseService.getByFilePath(filePath);
        if (existing) {
          if (options.verbose) {
            console.log(`Skipping (already exists): ${filePath}`);
          }
          return { success: true, filePath, chunksCreated: 0 };
        }
      }

      // Extract text content
      let content: string;

      if (AzureOCRService.needsOCR(filePath)) {
        // Use Azure OCR for PDFs and images
        if (options.verbose) {
          console.log(`Extracting text with OCR: ${filePath}`);
        }
        content = await this.ocrService.extractText(filePath);
      } else if (fileType === '.csv' || fileType === '.txt' || fileType === '.md') {
        // Read text files directly
        content = fs.readFileSync(filePath, 'utf-8');
      } else {
        // Skip unsupported file types
        if (options.verbose) {
          console.log(`Skipping unsupported file type: ${filePath}`);
        }
        return {
          success: false,
          filePath,
          error: `Unsupported file type: ${fileType}`,
        };
      }

      if (!content || content.trim().length === 0) {
        return {
          success: false,
          filePath,
          error: 'No content extracted from file',
        };
      }

      // Check if we need to chunk large files
      if (options.chunkLargeFiles && content.length > (options.chunkSize || 2000)) {
        return await this.processFileWithChunking(
          filePath,
          fileName,
          fileType,
          content,
          options
        );
      }

      // Generate embedding
      if (options.verbose) {
        console.log(`Generating embedding: ${filePath}`);
      }
      const embedding = await this.embeddingService.generateEmbedding(content);

      // Store in Supabase
      const fileEmbedding: FileEmbedding = {
        file_path: filePath,
        file_name: fileName,
        file_type: fileType,
        content: content.substring(0, 10000), // Store first 10k chars for reference
        metadata: {
          file_size: fs.statSync(filePath).size,
          processed_at: new Date().toISOString(),
        },
        embedding,
      };

      if (options.verbose) {
        console.log(`Storing in Supabase: ${filePath}`);
      }
      await this.supabaseService.storeEmbedding(fileEmbedding);

      return { success: true, filePath, chunksCreated: 1 };
    } catch (error: any) {
      console.error(`Error processing ${filePath}:`, error);
      return {
        success: false,
        filePath,
        error: error.message || 'Unknown error',
      };
    }
  }

  /**
   * Process a large file by splitting it into chunks
   */
  private async processFileWithChunking(
    filePath: string,
    fileName: string,
    fileType: string,
    content: string,
    options: ProcessingOptions
  ): Promise<ProcessingResult> {
    try {
      const chunks = EmbeddingService.chunkText(
        content,
        options.chunkSize || 2000,
        200
      );

      if (options.verbose) {
        console.log(`Splitting ${filePath} into ${chunks.length} chunks`);
      }

      const embeddings = await this.embeddingService.generateEmbeddings(chunks);

      const fileEmbeddings: FileEmbedding[] = chunks.map((chunk, index) => ({
        file_path: `${filePath}#chunk${index}`,
        file_name: `${fileName} (chunk ${index + 1}/${chunks.length})`,
        file_type: fileType,
        content: chunk,
        metadata: {
          file_size: fs.statSync(filePath).size,
          chunk_index: index,
          total_chunks: chunks.length,
          processed_at: new Date().toISOString(),
        },
        embedding: embeddings[index],
      }));

      await this.supabaseService.storeEmbeddings(fileEmbeddings);

      return {
        success: true,
        filePath,
        chunksCreated: chunks.length,
      };
    } catch (error: any) {
      console.error(`Error processing chunks for ${filePath}:`, error);
      return {
        success: false,
        filePath,
        error: error.message || 'Unknown error',
      };
    }
  }

  /**
   * Process multiple files
   * @param filePaths Array of file paths
   * @param options Processing options
   * @returns Array of processing results
   */
  async processFiles(
    filePaths: string[],
    options: ProcessingOptions = {}
  ): Promise<ProcessingResult[]> {
    const results: ProcessingResult[] = [];

    for (const filePath of filePaths) {
      const result = await this.processFile(filePath, options);
      results.push(result);
    }

    return results;
  }

  /**
   * Process all files in a directory recursively
   * @param dirPath Directory path
   * @param options Processing options
   * @returns Array of processing results
   */
  async processDirectory(
    dirPath: string,
    options: ProcessingOptions = {}
  ): Promise<ProcessingResult[]> {
    const files = this.getFilesRecursively(dirPath);

    if (options.verbose) {
      console.log(`Found ${files.length} files to process`);
    }

    return await this.processFiles(files, options);
  }

  /**
   * Get all files in a directory recursively
   */
  private getFilesRecursively(dirPath: string): string[] {
    const files: string[] = [];
    const items = fs.readdirSync(dirPath);

    for (const item of items) {
      const fullPath = path.join(dirPath, item);
      const stat = fs.statSync(fullPath);

      // Skip node_modules, .git, etc.
      if (item.startsWith('.') || item === 'node_modules') {
        continue;
      }

      if (stat.isDirectory()) {
        files.push(...this.getFilesRecursively(fullPath));
      } else if (stat.isFile()) {
        files.push(fullPath);
      }
    }

    return files;
  }

  /**
   * Search for similar content
   * @param query Search query
   * @param matchThreshold Similarity threshold (0-1)
   * @param matchCount Number of results
   * @returns Search results
   */
  async search(query: string, matchThreshold: number = 0.7, matchCount: number = 10) {
    const queryEmbedding = await this.embeddingService.generateEmbedding(query);
    return await this.supabaseService.searchSimilar(
      queryEmbedding,
      matchThreshold,
      matchCount
    );
  }
}
