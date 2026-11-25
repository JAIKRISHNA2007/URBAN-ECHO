import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const repositoryRoot = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  '..',
);
const contractFiles = ['api.ts', 'domain.ts', 'index.ts', 'ports.ts'];

const mismatches = [];

for (const fileName of contractFiles) {
  const sourcePath = path.join(
    repositoryRoot,
    'src',
    'shared',
    'contracts',
    fileName,
  );
  const edgePath = path.join(
    repositoryRoot,
    'supabase',
    'functions',
    '_shared',
    'contracts',
    fileName,
  );

  try {
    const [source, edge] = await Promise.all([
      readFile(sourcePath, 'utf8'),
      readFile(edgePath, 'utf8'),
    ]);

    if (source !== edge) {
      mismatches.push(fileName);
    }
  } catch {
    mismatches.push(fileName);
  }
}

if (mismatches.length > 0) {
  console.error(
    `Edge contract drift detected: ${mismatches.join(', ')}. Run npm run contracts:sync.`,
  );
  process.exitCode = 1;
} else {
  console.log('Frontend and Edge contract copies match.');
}
