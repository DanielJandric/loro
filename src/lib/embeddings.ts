import OpenAI from 'openai';

/**
 * Service for generating embeddings using OpenAI
 */
export class EmbeddingService {
  private openai: OpenAI;
  private model: string = 'text-embedding-ada-002';

  constructor() {
    const apiKey = process.env.OPENAI_API_KEY;

    if (!apiKey) {
      throw new Error('OpenAI API key not found. Please set OPENAI_API_KEY in .env');
    }

    this.openai = new OpenAI({ apiKey });
  }

  /**
   * Generate embedding for a given text
   * @param text Text to embed
   * @returns Vector embedding (1536 dimensions)
   */
  async generateEmbedding(text: string): Promise<number[]> {
    try {
      // Truncate text if too long (OpenAI has token limits)
      const maxLength = 8000; // Conservative limit
      const truncatedText = text.length > maxLength
        ? text.substring(0, maxLength)
        : text;

      const response = await this.openai.embeddings.create({
        model: this.model,
        input: truncatedText,
      });

      return response.data[0].embedding;
    } catch (error) {
      console.error('Error generating embedding:', error);
      throw error;
    }
  }

  /**
   * Generate embeddings for multiple texts in batch
   * @param texts Array of texts to embed
   * @returns Array of vector embeddings
   */
  async generateEmbeddings(texts: string[]): Promise<number[][]> {
    try {
      // Process in batches to avoid rate limits
      const batchSize = 20;
      const results: number[][] = [];

      for (let i = 0; i < texts.length; i += batchSize) {
        const batch = texts.slice(i, i + batchSize);
        const truncatedBatch = batch.map(text =>
          text.length > 8000 ? text.substring(0, 8000) : text
        );

        const response = await this.openai.embeddings.create({
          model: this.model,
          input: truncatedBatch,
        });

        results.push(...response.data.map(d => d.embedding));

        // Small delay to avoid rate limits
        if (i + batchSize < texts.length) {
          await new Promise(resolve => setTimeout(resolve, 100));
        }
      }

      return results;
    } catch (error) {
      console.error('Error generating embeddings batch:', error);
      throw error;
    }
  }

  /**
   * Split long text into chunks for better embeddings
   * @param text Long text to split
   * @param chunkSize Size of each chunk (in characters)
   * @param overlap Overlap between chunks (in characters)
   * @returns Array of text chunks
   */
  static chunkText(text: string, chunkSize: number = 1000, overlap: number = 200): string[] {
    const chunks: string[] = [];
    let start = 0;

    while (start < text.length) {
      const end = Math.min(start + chunkSize, text.length);
      chunks.push(text.substring(start, end));
      start += chunkSize - overlap;
    }

    return chunks;
  }
}
