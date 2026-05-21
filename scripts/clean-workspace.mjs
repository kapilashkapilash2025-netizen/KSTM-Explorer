import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();

const targets = [
  '.next',
  'out',
  'android/build',
  'android/app/build',
  'tsconfig.tsbuildinfo',
];

for (const rel of targets) {
  const abs = path.join(root, rel);
  if (fs.existsSync(abs)) {
    fs.rmSync(abs, { recursive: true, force: true });
    console.log(`[clean] removed: ${rel}`);
  } else {
    console.log(`[clean] skip (not found): ${rel}`);
  }
}

console.log('[clean] workspace cleanup complete');

