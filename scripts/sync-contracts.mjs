import { cp, mkdir, rm } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const repositoryRoot = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  '..',
);
const sourceDirectory = path.join(repositoryRoot, 'src', 'shared', 'contracts');
const destinationDirectory = path.join(
  repositoryRoot,
  'supabase',
  'functions',
  '_shared',
  'contracts',
);

await rm(destinationDirectory, { force: true, recursive: true });
await mkdir(destinationDirectory, { recursive: true });
await cp(sourceDirectory, destinationDirectory, {
  recursive: true,
  filter: (source) => !source.endsWith('.test.ts'),
});

console.log('Shared contracts synchronized for Supabase Edge Functions.');
