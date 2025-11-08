#!/usr/bin/env tsx

/**
 * Exemple d'utilisation du système d'embeddings
 *
 * Ce fichier montre comment utiliser les services d'embeddings
 * de manière programmatique dans votre code.
 */

import dotenv from 'dotenv';
import { FileEmbeddingsProcessor } from '../src/lib/file-embeddings-processor';
import { AzureOCRService } from '../src/lib/azure-ocr';
import { EmbeddingService } from '../src/lib/embeddings';
import { SupabaseEmbeddingsService } from '../src/lib/supabase-embeddings';

// Charger les variables d'environnement
dotenv.config();

/**
 * Exemple 1: Traiter un seul fichier CSV
 */
async function example1_processCSV() {
  console.log('\n=== Exemple 1: Traiter un fichier CSV ===\n');

  const processor = new FileEmbeddingsProcessor();

  const result = await processor.processFile('public/data.csv', {
    verbose: true,
    skipExisting: false,
  });

  console.log('Résultat:', result);
}

/**
 * Exemple 2: Traiter un PDF avec OCR
 */
async function example2_processPDF() {
  console.log('\n=== Exemple 2: Traiter un PDF avec OCR ===\n');

  // Note: Vous devez avoir un fichier PDF pour tester cet exemple
  const pdfPath = 'documents/sample.pdf';

  const processor = new FileEmbeddingsProcessor();

  try {
    const result = await processor.processFile(pdfPath, {
      verbose: true,
      chunkLargeFiles: true,
      chunkSize: 1500,
    });

    console.log('Résultat:', result);
  } catch (error: any) {
    console.log('Erreur (normal si le fichier n\'existe pas):', error.message);
  }
}

/**
 * Exemple 3: Recherche sémantique
 */
async function example3_semanticSearch() {
  console.log('\n=== Exemple 3: Recherche sémantique ===\n');

  const processor = new FileEmbeddingsProcessor();

  // Chercher des documents similaires
  const results = await processor.search(
    'analyse statistique des jeux de hasard et probabilités',
    0.5, // Threshold plus bas pour avoir plus de résultats
    5    // Top 5 résultats
  );

  console.log(`\nTrouvé ${results.length} résultats:\n`);

  results.forEach((result, index) => {
    console.log(`${index + 1}. ${result.file_name}`);
    console.log(`   Similarité: ${(result.similarity * 100).toFixed(1)}%`);
    console.log(`   Type: ${result.file_type}`);
    console.log(`   Aperçu: ${result.content.substring(0, 150)}...`);
    console.log('');
  });
}

/**
 * Exemple 4: Utilisation directe des services
 */
async function example4_directServiceUsage() {
  console.log('\n=== Exemple 4: Utilisation directe des services ===\n');

  // 1. Générer un embedding
  const embeddingService = new EmbeddingService();
  const text = 'Analyse des probabilités dans les jeux de hasard';
  console.log('Génération d\'un embedding pour:', text);

  const vector = await embeddingService.generateEmbedding(text);
  console.log('Dimensions du vecteur:', vector.length);
  console.log('Premiers éléments:', vector.slice(0, 5));

  // 2. Stocker dans Supabase
  const supabaseService = new SupabaseEmbeddingsService();

  try {
    await supabaseService.storeEmbedding({
      file_path: 'example/test.txt',
      file_name: 'test.txt',
      file_type: '.txt',
      content: text,
      metadata: {
        example: true,
        created_by: 'example-script',
      },
      embedding: vector,
    });

    console.log('\n✅ Embedding stocké dans Supabase');

    // 3. Récupérer l'embedding
    const retrieved = await supabaseService.getByFilePath('example/test.txt');
    console.log('\nEmbedding récupéré:', {
      id: retrieved?.id,
      file_name: retrieved?.file_name,
      metadata: retrieved?.metadata,
    });
  } catch (error: any) {
    console.log('\n❌ Erreur:', error.message);
  }
}

/**
 * Exemple 5: Chunking de texte long
 */
async function example5_textChunking() {
  console.log('\n=== Exemple 5: Chunking de texte long ===\n');

  const longText = `
    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
    Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
    Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.
    Nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor.
    `.repeat(20); // Répéter pour avoir un texte long

  console.log('Longueur du texte original:', longText.length, 'caractères');

  const chunks = EmbeddingService.chunkText(longText, 500, 50);
  console.log('Nombre de chunks créés:', chunks.length);

  chunks.forEach((chunk, index) => {
    console.log(`\nChunk ${index + 1} (${chunk.length} caractères):`);
    console.log(chunk.substring(0, 100) + '...');
  });
}

/**
 * Exemple 6: Traiter un répertoire entier
 */
async function example6_processDirectory() {
  console.log('\n=== Exemple 6: Traiter un répertoire ===\n');

  const processor = new FileEmbeddingsProcessor();

  try {
    const results = await processor.processDirectory('public', {
      verbose: true,
      skipExisting: true,
      chunkLargeFiles: true,
    });

    console.log('\n=== Résumé ===');
    console.log('Total fichiers traités:', results.length);
    console.log('Succès:', results.filter(r => r.success).length);
    console.log('Échecs:', results.filter(r => !r.success).length);
  } catch (error: any) {
    console.log('Erreur:', error.message);
  }
}

/**
 * Fonction principale
 */
async function main() {
  console.log('🚀 Exemples d\'utilisation du système d\'embeddings\n');
  console.log('Assurez-vous d\'avoir configuré votre .env avec les clés API\n');

  try {
    // Décommentez les exemples que vous voulez exécuter

    // await example1_processCSV();
    // await example2_processPDF();
    // await example3_semanticSearch();
    // await example4_directServiceUsage();
    // await example5_textChunking();
    // await example6_processDirectory();

    console.log('\n✨ Pour exécuter un exemple, décommentez-le dans main()');
  } catch (error: any) {
    console.error('\n❌ Erreur globale:', error.message);
    if (error.stack) {
      console.error('Stack:', error.stack);
    }
  }
}

// Exécuter si lancé directement
if (require.main === module) {
  main();
}
