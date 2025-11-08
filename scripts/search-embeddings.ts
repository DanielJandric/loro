#!/usr/bin/env tsx

/**
 * Script to search for similar content using embeddings
 *
 * Usage:
 *   npm run embeddings:search -- "your query here"
 *   npm run embeddings:search -- "your query" --threshold=0.8 --limit=5
 */

import dotenv from 'dotenv';
import { FileEmbeddingsProcessor } from '../src/lib/file-embeddings-processor';

// Load environment variables
dotenv.config();

async function main() {
  const args = process.argv.slice(2);

  if (args.length === 0 || args[0] === '--help' || args[0] === '-h') {
    console.log(`
Usage: npm run embeddings:search -- "query" [options]

Arguments:
  <query>             Search query

Options:
  --threshold=N       Similarity threshold 0-1 (default: 0.7)
  --limit=N           Number of results (default: 10)
  --help, -h          Show this help message

Examples:
  npm run embeddings:search -- "lottery statistics"
  npm run embeddings:search -- "probability analysis" --threshold=0.8 --limit=5
    `);
    process.exit(0);
  }

  const query = args[0];
  let threshold = 0.7;
  let limit = 10;

  // Parse options
  const thresholdArg = args.find(arg => arg.startsWith('--threshold='));
  if (thresholdArg) {
    threshold = parseFloat(thresholdArg.split('=')[1]);
  }

  const limitArg = args.find(arg => arg.startsWith('--limit='));
  if (limitArg) {
    limit = parseInt(limitArg.split('=')[1], 10);
  }

  console.log('🔍 Searching embeddings...\n');
  console.log(`Query: "${query}"`);
  console.log(`Threshold: ${threshold}`);
  console.log(`Limit: ${limit}`);
  console.log('');

  try {
    const processor = new FileEmbeddingsProcessor();
    const results = await processor.search(query, threshold, limit);

    if (results.length === 0) {
      console.log('No results found.\n');
      process.exit(0);
    }

    console.log('='.repeat(60));
    console.log(`📋 FOUND ${results.length} RESULTS`);
    console.log('='.repeat(60) + '\n');

    results.forEach((result, index) => {
      console.log(`${index + 1}. ${result.file_name}`);
      console.log(`   Path: ${result.file_path}`);
      console.log(`   Similarity: ${(result.similarity * 100).toFixed(2)}%`);
      console.log(`   Type: ${result.file_type}`);

      // Show first 200 chars of content
      const preview = result.content.substring(0, 200).replace(/\n/g, ' ');
      console.log(`   Preview: ${preview}${result.content.length > 200 ? '...' : ''}`);

      if (result.metadata && Object.keys(result.metadata).length > 0) {
        console.log(`   Metadata:`, JSON.stringify(result.metadata, null, 2));
      }

      console.log('');
    });

    console.log('✨ Done!\n');
  } catch (error: any) {
    console.error('\n❌ Error:', error.message);
    if (error.stack) {
      console.error('\nStack trace:', error.stack);
    }
    process.exit(1);
  }
}

main();
