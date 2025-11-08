import { createClient, SupabaseClient } from '@supabase/supabase-js';

export interface FileEmbedding {
  id?: string;
  file_path: string;
  file_name: string;
  file_type: string;
  content: string;
  metadata?: Record<string, any>;
  embedding: number[];
  created_at?: string;
  updated_at?: string;
}

export interface SearchResult {
  id: string;
  file_path: string;
  file_name: string;
  file_type: string;
  content: string;
  metadata: Record<string, any>;
  similarity: number;
}

/**
 * Service for managing file embeddings in Supabase
 */
export class SupabaseEmbeddingsService {
  private supabase: SupabaseClient;

  constructor() {
    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseKey) {
      throw new Error(
        'Supabase credentials not found. Please set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY (or SUPABASE_ANON_KEY) in .env'
      );
    }

    this.supabase = createClient(supabaseUrl, supabaseKey);
  }

  /**
   * Store a file embedding in Supabase
   * @param embedding File embedding data
   * @returns Stored embedding with ID
   */
  async storeEmbedding(embedding: FileEmbedding): Promise<FileEmbedding> {
    try {
      const { data, error } = await this.supabase
        .from('file_embeddings')
        .insert({
          file_path: embedding.file_path,
          file_name: embedding.file_name,
          file_type: embedding.file_type,
          content: embedding.content,
          metadata: embedding.metadata || {},
          embedding: JSON.stringify(embedding.embedding), // Supabase expects vector as string
        })
        .select()
        .single();

      if (error) {
        throw error;
      }

      return data;
    } catch (error) {
      console.error('Error storing embedding:', error);
      throw error;
    }
  }

  /**
   * Store multiple embeddings in batch
   * @param embeddings Array of file embeddings
   * @returns Array of stored embeddings
   */
  async storeEmbeddings(embeddings: FileEmbedding[]): Promise<FileEmbedding[]> {
    try {
      const records = embeddings.map(emb => ({
        file_path: emb.file_path,
        file_name: emb.file_name,
        file_type: emb.file_type,
        content: emb.content,
        metadata: emb.metadata || {},
        embedding: JSON.stringify(emb.embedding),
      }));

      const { data, error } = await this.supabase
        .from('file_embeddings')
        .insert(records)
        .select();

      if (error) {
        throw error;
      }

      return data;
    } catch (error) {
      console.error('Error storing embeddings batch:', error);
      throw error;
    }
  }

  /**
   * Update an existing embedding
   * @param id Embedding ID
   * @param embedding Updated embedding data
   * @returns Updated embedding
   */
  async updateEmbedding(id: string, embedding: Partial<FileEmbedding>): Promise<FileEmbedding> {
    try {
      const updateData: any = {};

      if (embedding.content) updateData.content = embedding.content;
      if (embedding.metadata) updateData.metadata = embedding.metadata;
      if (embedding.embedding) updateData.embedding = JSON.stringify(embedding.embedding);
      updateData.updated_at = new Date().toISOString();

      const { data, error } = await this.supabase
        .from('file_embeddings')
        .update(updateData)
        .eq('id', id)
        .select()
        .single();

      if (error) {
        throw error;
      }

      return data;
    } catch (error) {
      console.error('Error updating embedding:', error);
      throw error;
    }
  }

  /**
   * Delete an embedding by ID
   * @param id Embedding ID
   */
  async deleteEmbedding(id: string): Promise<void> {
    try {
      const { error } = await this.supabase
        .from('file_embeddings')
        .delete()
        .eq('id', id);

      if (error) {
        throw error;
      }
    } catch (error) {
      console.error('Error deleting embedding:', error);
      throw error;
    }
  }

  /**
   * Search for similar documents using vector similarity
   * @param queryEmbedding Query vector
   * @param matchThreshold Similarity threshold (0-1)
   * @param matchCount Number of results to return
   * @returns Array of similar documents with similarity scores
   */
  async searchSimilar(
    queryEmbedding: number[],
    matchThreshold: number = 0.7,
    matchCount: number = 10
  ): Promise<SearchResult[]> {
    try {
      const { data, error } = await this.supabase.rpc('match_file_embeddings', {
        query_embedding: JSON.stringify(queryEmbedding),
        match_threshold: matchThreshold,
        match_count: matchCount,
      });

      if (error) {
        throw error;
      }

      return data || [];
    } catch (error) {
      console.error('Error searching similar documents:', error);
      throw error;
    }
  }

  /**
   * Get embedding by file path
   * @param filePath Path to the file
   * @returns File embedding or null
   */
  async getByFilePath(filePath: string): Promise<FileEmbedding | null> {
    try {
      const { data, error } = await this.supabase
        .from('file_embeddings')
        .select('*')
        .eq('file_path', filePath)
        .single();

      if (error) {
        if (error.code === 'PGRST116') {
          // Not found
          return null;
        }
        throw error;
      }

      return data;
    } catch (error) {
      console.error('Error getting embedding by file path:', error);
      throw error;
    }
  }

  /**
   * Get all embeddings
   * @returns Array of all file embeddings
   */
  async getAllEmbeddings(): Promise<FileEmbedding[]> {
    try {
      const { data, error } = await this.supabase
        .from('file_embeddings')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        throw error;
      }

      return data || [];
    } catch (error) {
      console.error('Error getting all embeddings:', error);
      throw error;
    }
  }

  /**
   * Delete all embeddings (use with caution!)
   */
  async deleteAllEmbeddings(): Promise<void> {
    try {
      const { error } = await this.supabase
        .from('file_embeddings')
        .delete()
        .neq('id', '00000000-0000-0000-0000-000000000000'); // Delete all

      if (error) {
        throw error;
      }
    } catch (error) {
      console.error('Error deleting all embeddings:', error);
      throw error;
    }
  }
}
