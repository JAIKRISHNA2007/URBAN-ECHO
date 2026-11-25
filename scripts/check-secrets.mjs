import { execFileSync } from 'node:child_process';
import { readFile, stat } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const repositoryRoot = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  '..',
);
const files = execFileSync(
  'git',
  ['ls-files', '--cached', '--others', '--exclude-standard'],
  { cwd: repositoryRoot, encoding: 'utf8' },
)
  .split(/\r?\n/u)
  .filter(Boolean);

const secretPatterns = [
  /-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----/u,
  /\bAKIA[0-9A-Z]{16}\b/u,
  /\bAIza[0-9A-Za-z_-]{30,}\b/u,
  /\bsk-[A-Za-z0-9_-]{20,}\b/u,
  /\beyJ[A-Za-z0-9_-]{20,}\.[A-Za-z0-9_-]{20,}\.[A-Za-z0-9_-]{10,}\b/u,
];
const matches = [];

for (const relativePath of files) {
  if (relativePath === 'scripts/check-secrets.mjs') {
    continue;
  }

  const absolutePath = path.join(repositoryRoot, relativePath);
  const fileStat = await stat(absolutePath);

  if (!fileStat.isFile() || fileStat.size > 1_000_000) {
    continue;
  }

  const content = await readFile(absolutePath, 'utf8');
  if (secretPatterns.some((pattern) => pattern.test(content))) {
    matches.push(relativePath);
  }
}

if (matches.length > 0) {
  console.error(`Potential secrets detected in: ${matches.join(', ')}`);
  process.exitCode = 1;
} else {
  console.log('No high-confidence secret patterns detected.');
}
