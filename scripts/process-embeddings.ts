#!/usr/bin/env tsx

/**
 * Script to process files and create embeddings
 *
 * Usage:
 *   npm run embeddings:process -- <path>
 *   npm run embeddings:process -- <path> --chunk
 *   npm run embeddings:process -- <path> --skip-existing
 *
 * Examples:
 *   npm run embeddings:process -- public/data.csv
 *   npm run embeddings:process -- public --chunk
 *   npm run embeddings:process -- . --skip-existing --chunk
 */

import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';
import { FileEmbeddingsProcessor } from '../src/lib/file-embeddings-processor';

// Load environment variables
dotenv.config();

async function main() {
  const args = process.argv.slice(2);

  if (args.length === 0 || args[0] === '--help' || args[0] === '-h') {
    console.log(`
Usage: npm run embeddings:process -- <path> [options]

Arguments:
  <path>              File or directory to process

Options:
  --chunk             Split large files into chunks
  --skip-existing     Skip files that are already processed
  --chunk-size=N      Size of chunks (default: 2000)
  --help, -h          Show this help message

Examples:
  npm run embeddings:process -- public/data.csv
  npm run embeddings:process -- public --chunk
  npm run embeddings:process -- . --skip-existing --chunk
    `);
    process.exit(0);
  }

  const targetPath = args[0];
  const options = {
    skipExisting: args.includes('--skip-existing'),
    chunkLargeFiles: args.includes('--chunk'),
    verbose: true,
    chunkSize: 2000,
  };

  // Parse chunk size if provided
  const chunkSizeArg = args.find(arg => arg.startsWith('--chunk-size='));
  if (chunkSizeArg) {
    options.chunkSize = parseInt(chunkSizeArg.split('=')[1], 10);
  }

  // Resolve path
  const resolvedPath = path.resolve(process.cwd(), targetPath);

  if (!fs.existsSync(resolvedPath)) {
    console.error(`Error: Path does not exist: ${resolvedPath}`);
    process.exit(1);
  }

  console.log('🚀 Starting file embeddings processing...\n');
  console.log(`Target: ${resolvedPath}`);
  console.log(`Options:`, options);
  console.log('');

  try {
    const processor = new FileEmbeddingsProcessor();
    const stat = fs.statSync(resolvedPath);

    let results;
    if (stat.isDirectory()) {
      console.log('📁 Processing directory...\n');
      results = await processor.processDirectory(resolvedPath, options);
    } else {
      console.log('📄 Processing single file...\n');
      results = [await processor.processFile(resolvedPath, options)];
    }

    // Print summary
    console.log('\n' + '='.repeat(60));
    console.log('📊 PROCESSING SUMMARY');
    console.log('='.repeat(60) + '\n');

    const successful = results.filter(r => r.success).length;
    const failed = results.filter(r => !r.success).length;
    const totalChunks = results.reduce((sum, r) => sum + (r.chunksCreated || 0), 0);

    console.log(`✅ Successful: ${successful}`);
    console.log(`❌ Failed: ${failed}`);
    console.log(`📦 Total chunks created: ${totalChunks}`);
    console.log('');

    if (failed > 0) {
      console.log('Failed files:');
      results
        .filter(r => !r.success)
        .forEach(r => console.log(`  ❌ ${r.filePath}: ${r.error}`));
      console.log('');
    }

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
