# File Embeddings System

Système complet pour créer des embeddings de vos fichiers avec OCR Azure et stockage dans Supabase.

## 📋 Table des matières

- [Fonctionnalités](#fonctionnalités)
- [Architecture](#architecture)
- [Configuration](#configuration)
- [Utilisation](#utilisation)
- [API](#api)
- [Exemples](#exemples)

## ✨ Fonctionnalités

- **OCR Azure** : Extraction de texte depuis PDFs et images
- **Embeddings OpenAI** : Génération d'embeddings vectoriels (ada-002)
- **Stockage Supabase** : Base de données vectorielle avec pgvector
- **Recherche sémantique** : Recherche par similarité vectorielle
- **Chunking intelligent** : Découpage automatique des fichiers volumineux
- **Traitement batch** : Traitement de répertoires entiers

## 🏗️ Architecture

```
src/lib/
├── azure-ocr.ts                    # Service OCR Azure
├── embeddings.ts                   # Service génération embeddings
├── supabase-embeddings.ts          # Service stockage Supabase
└── file-embeddings-processor.ts    # Orchestrateur principal

scripts/
├── process-embeddings.ts           # Script de traitement batch
└── search-embeddings.ts            # Script de recherche

supabase/
└── schema.sql                      # Schéma de la base de données
```

## ⚙️ Configuration

### 1. Configuration Supabase

1. Créez un projet sur [Supabase](https://supabase.com)
2. Exécutez le schéma SQL :

```bash
# Dans le SQL Editor de Supabase, exécutez le contenu de :
cat supabase/schema.sql
```

Cela va :
- Activer l'extension `pgvector`
- Créer la table `file_embeddings`
- Créer les index pour la recherche vectorielle
- Créer la fonction `match_file_embeddings`

3. Récupérez vos clés API depuis Settings > API

### 2. Configuration Azure

1. Créez une ressource Form Recognizer sur [Azure Portal](https://portal.azure.com)
2. Récupérez :
   - Endpoint : `https://your-resource.cognitiveservices.azure.com/`
   - Key : depuis "Keys and Endpoint"

### 3. Configuration OpenAI

1. Créez une clé API sur [OpenAI Platform](https://platform.openai.com)
2. Récupérez votre clé API

### 4. Variables d'environnement

Créez un fichier `.env` à la racine du projet :

```bash
# Copiez le template
cp .env.example .env

# Éditez .env avec vos clés
```

Remplissez avec vos clés :

```env
# Supabase
SUPABASE_URL=https://xxxxx.supabase.co
SUPABASE_ANON_KEY=eyJhbGc...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGc...

# Azure Form Recognizer
AZURE_FORM_RECOGNIZER_ENDPOINT=https://xxxxx.cognitiveservices.azure.com/
AZURE_FORM_RECOGNIZER_KEY=xxxxx

# OpenAI
OPENAI_API_KEY=sk-xxxxx
```

## 🚀 Utilisation

### Traitement de fichiers

```bash
# Traiter un seul fichier
npm run embeddings:process -- public/data.csv

# Traiter un répertoire entier
npm run embeddings:process -- public

# Traiter avec chunking (fichiers volumineux)
npm run embeddings:process -- public --chunk

# Ignorer les fichiers déjà traités
npm run embeddings:process -- . --skip-existing

# Options combinées
npm run embeddings:process -- documents --chunk --skip-existing --chunk-size=3000
```

### Options disponibles

- `--chunk` : Découper les fichiers volumineux en chunks
- `--skip-existing` : Ignorer les fichiers déjà dans la base
- `--chunk-size=N` : Taille des chunks (défaut: 2000 caractères)

### Recherche sémantique

```bash
# Recherche simple
npm run embeddings:search -- "lottery statistics"

# Recherche avec threshold personnalisé
npm run embeddings:search -- "probability analysis" --threshold=0.8

# Limiter le nombre de résultats
npm run embeddings:search -- "data analysis" --threshold=0.7 --limit=5
```

## 📚 API

### FileEmbeddingsProcessor

Service principal orchestrant tout le processus.

```typescript
import { FileEmbeddingsProcessor } from '@/lib/file-embeddings-processor';

const processor = new FileEmbeddingsProcessor();

// Traiter un fichier
await processor.processFile('/path/to/file.pdf', {
  skipExisting: true,
  chunkLargeFiles: true,
  verbose: true,
});

// Traiter un répertoire
await processor.processDirectory('/path/to/dir', {
  skipExisting: true,
  chunkLargeFiles: true,
});

// Rechercher
const results = await processor.search(
  'your query',
  0.7,  // threshold
  10    // limit
);
```

### AzureOCRService

Service d'extraction de texte avec Azure.

```typescript
import { AzureOCRService } from '@/lib/azure-ocr';

const ocr = new AzureOCRService();

// Extraction simple
const text = await ocr.extractText('/path/to/document.pdf');

// Extraction détaillée
const details = await ocr.extractDetailedText('/path/to/document.pdf');
console.log(details.pages); // Nombre de pages
console.log(details.tables); // Tables détectées
```

### EmbeddingService

Service de génération d'embeddings.

```typescript
import { EmbeddingService } from '@/lib/embeddings';

const embedder = new EmbeddingService();

// Embedding simple
const vector = await embedder.generateEmbedding('some text');

// Embeddings multiples
const vectors = await embedder.generateEmbeddings([
  'text 1',
  'text 2',
  'text 3'
]);

// Chunking de texte
const chunks = EmbeddingService.chunkText(
  longText,
  2000,  // chunk size
  200    // overlap
);
```

### SupabaseEmbeddingsService

Service de stockage et recherche.

```typescript
import { SupabaseEmbeddingsService } from '@/lib/supabase-embeddings';

const db = new SupabaseEmbeddingsService();

// Stocker un embedding
await db.storeEmbedding({
  file_path: '/path/to/file.txt',
  file_name: 'file.txt',
  file_type: '.txt',
  content: 'file content',
  embedding: [0.1, 0.2, ...], // vector 1536 dimensions
});

// Rechercher
const results = await db.searchSimilar(
  queryVector,
  0.7,  // threshold
  10    // limit
);

// Récupérer par chemin
const embedding = await db.getByFilePath('/path/to/file.txt');

// Tout récupérer
const all = await db.getAllEmbeddings();
```

## 💡 Exemples

### Exemple 1 : Traiter tous les fichiers du projet

```bash
npm run embeddings:process -- . --chunk --skip-existing
```

### Exemple 2 : Recherche avec code personnalisé

```typescript
import { FileEmbeddingsProcessor } from '@/lib/file-embeddings-processor';

async function searchDocuments(query: string) {
  const processor = new FileEmbeddingsProcessor();
  const results = await processor.search(query, 0.75, 5);

  results.forEach(result => {
    console.log(`📄 ${result.file_name}`);
    console.log(`   Similarité: ${(result.similarity * 100).toFixed(1)}%`);
    console.log(`   Contenu: ${result.content.substring(0, 100)}...`);
  });
}

await searchDocuments('analyse statistique des jeux de hasard');
```

### Exemple 3 : Traitement personnalisé avec métadonnées

```typescript
import { FileEmbeddingsProcessor } from '@/lib/file-embeddings-processor';
import { SupabaseEmbeddingsService } from '@/lib/supabase-embeddings';

const processor = new FileEmbeddingsProcessor();

// Traiter avec options avancées
const result = await processor.processFile('data/report.pdf', {
  chunkLargeFiles: true,
  chunkSize: 1500,
  skipExisting: false,
  verbose: true,
});

console.log(`✅ Créé ${result.chunksCreated} chunks`);
```

## 📊 Types de fichiers supportés

### Avec OCR (Azure)
- PDF (`.pdf`)
- Images (`.png`, `.jpg`, `.jpeg`, `.tiff`, `.bmp`)

### Sans OCR (lecture directe)
- Texte (`.txt`)
- CSV (`.csv`)
- Markdown (`.md`)

## 🔍 Recherche vectorielle

Le système utilise la similarité cosinus pour trouver les documents les plus pertinents.

**Threshold** (seuil de similarité) :
- `0.9-1.0` : Très similaire (presque identique)
- `0.7-0.9` : Similaire (recommandé)
- `0.5-0.7` : Moyennement similaire
- `< 0.5` : Peu similaire

## 🛠️ Dépannage

### Erreur "Azure credentials not found"
Vérifiez que `.env` contient `AZURE_FORM_RECOGNIZER_ENDPOINT` et `AZURE_FORM_RECOGNIZER_KEY`.

### Erreur "OpenAI API key not found"
Vérifiez que `.env` contient `OPENAI_API_KEY`.

### Erreur "Supabase credentials not found"
Vérifiez que `.env` contient `SUPABASE_URL` et `SUPABASE_SERVICE_ROLE_KEY`.

### Pas de résultats de recherche
- Baissez le threshold (essayez `0.5`)
- Vérifiez que des embeddings existent dans la base
- Reformulez votre requête

## 📝 Notes

- Les embeddings utilisent le modèle `text-embedding-ada-002` (1536 dimensions)
- Le chunking par défaut est de 2000 caractères avec 200 de chevauchement
- La recherche vectorielle utilise l'index IVFFlat pour la performance
- Les contenus sont tronqués à 10000 caractères pour le stockage

## 🚧 Améliorations futures

- [ ] Support de plus de types de fichiers (docx, pptx, etc.)
- [ ] Interface web pour la recherche
- [ ] Cache des embeddings pour éviter les recalculs
- [ ] Métadonnées enrichies (date de modification, auteur, etc.)
- [ ] Support de modèles d'embeddings alternatifs
- [ ] Recherche hybride (vectorielle + full-text)

## 📄 Licence

Privé - Loro Project
