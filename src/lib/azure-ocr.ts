import { DocumentAnalysisClient, AzureKeyCredential } from '@azure/ai-form-recognizer';
import fs from 'fs';
import path from 'path';

/**
 * Service for extracting text from documents using Azure Form Recognizer OCR
 */
export class AzureOCRService {
  private client: DocumentAnalysisClient;

  constructor() {
    const endpoint = process.env.AZURE_FORM_RECOGNIZER_ENDPOINT;
    const key = process.env.AZURE_FORM_RECOGNIZER_KEY;

    if (!endpoint || !key) {
      throw new Error(
        'Azure Form Recognizer credentials not found. Please set AZURE_FORM_RECOGNIZER_ENDPOINT and AZURE_FORM_RECOGNIZER_KEY in .env'
      );
    }

    this.client = new DocumentAnalysisClient(endpoint, new AzureKeyCredential(key));
  }

  /**
   * Extract text from a document file (PDF, image, etc.)
   * @param filePath Path to the file
   * @returns Extracted text content
   */
  async extractText(filePath: string): Promise<string> {
    try {
      const fileBuffer = fs.readFileSync(filePath);

      // Use the prebuilt-read model for general text extraction
      const poller = await this.client.beginAnalyzeDocument('prebuilt-read', fileBuffer);
      const result = await poller.pollUntilDone();

      if (!result.content) {
        return '';
      }

      return result.content;
    } catch (error) {
      console.error(`Error extracting text from ${filePath}:`, error);
      throw error;
    }
  }

  /**
   * Check if a file type requires OCR
   * @param filePath Path to the file
   * @returns true if file needs OCR processing
   */
  static needsOCR(filePath: string): boolean {
    const ext = path.extname(filePath).toLowerCase();
    const ocrExtensions = ['.pdf', '.png', '.jpg', '.jpeg', '.tiff', '.bmp'];
    return ocrExtensions.includes(ext);
  }

  /**
   * Extract text with detailed structure (pages, tables, etc.)
   * @param filePath Path to the file
   * @returns Detailed document analysis
   */
  async extractDetailedText(filePath: string): Promise<{
    content: string;
    pages: number;
    tables?: any[];
    metadata?: any;
  }> {
    try {
      const fileBuffer = fs.readFileSync(filePath);

      const poller = await this.client.beginAnalyzeDocument('prebuilt-read', fileBuffer);
      const result = await poller.pollUntilDone();

      return {
        content: result.content || '',
        pages: result.pages?.length || 0,
        tables: result.tables,
        metadata: {
          modelId: result.modelId,
          apiVersion: result.apiVersion,
        },
      };
    } catch (error) {
      console.error(`Error extracting detailed text from ${filePath}:`, error);
      throw error;
    }
  }
}
