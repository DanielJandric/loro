-- Enable pgvector extension for vector operations
create extension if not exists vector;

-- Create table for storing file embeddings
create table if not exists file_embeddings (
  id uuid default gen_random_uuid() primary key,
  file_path text not null,
  file_name text not null,
  file_type text not null,
  content text,
  metadata jsonb default '{}'::jsonb,
  embedding vector(1536), -- OpenAI ada-002 produces 1536 dimensions
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create index for faster vector similarity search
create index if not exists file_embeddings_embedding_idx
  on file_embeddings
  using ivfflat (embedding vector_cosine_ops)
  with (lists = 100);

-- Create index for file_path lookups
create index if not exists file_embeddings_file_path_idx
  on file_embeddings (file_path);

-- Create function to search similar documents
create or replace function match_file_embeddings(
  query_embedding vector(1536),
  match_threshold float default 0.7,
  match_count int default 10
)
returns table (
  id uuid,
  file_path text,
  file_name text,
  file_type text,
  content text,
  metadata jsonb,
  similarity float
)
language sql stable
as $$
  select
    file_embeddings.id,
    file_embeddings.file_path,
    file_embeddings.file_name,
    file_embeddings.file_type,
    file_embeddings.content,
    file_embeddings.metadata,
    1 - (file_embeddings.embedding <=> query_embedding) as similarity
  from file_embeddings
  where 1 - (file_embeddings.embedding <=> query_embedding) > match_threshold
  order by file_embeddings.embedding <=> query_embedding
  limit match_count;
$$;

-- Add comments
comment on table file_embeddings is 'Stores file content embeddings for semantic search';
comment on column file_embeddings.embedding is 'Vector embedding of the file content (1536 dimensions for OpenAI ada-002)';
comment on function match_file_embeddings is 'Performs similarity search on file embeddings';
