#!/usr/bin/env node
import { execSync, spawn } from 'node:child_process';

const PORT = 9999;

function safeExec(command) {
  try {
    return execSync(command, { encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] }).trim();
  } catch {
    return '';
  }
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function cleanupPort() {
  const rawPids = safeExec(`lsof -n -iTCP:${PORT} -sTCP:LISTEN -t`);
  if (!rawPids) return;

  const pids = [...new Set(rawPids.split('\n').map((v) => v.trim()).filter(Boolean))];
  if (pids.length === 0) return;

  console.log(`[startup] Port ${PORT} is in use by PID(s): ${pids.join(', ')}`);

  const nodeLikePids = pids.filter((pid) => {
    const cmd = safeExec(`ps -p ${pid} -o command=`).toLowerCase();
    return cmd.includes('node') || cmd.includes('next');
  });

  if (nodeLikePids.length === 0) {
    console.error(
      `[startup] Port ${PORT} is occupied by a non-node process. Please free the port manually and retry.`
    );
    process.exit(1);
  }

  console.log(`[startup] Stopping stale Node/Next process(es): ${nodeLikePids.join(', ')}`);
  for (const pid of nodeLikePids) {
    try {
      process.kill(Number(pid), 'SIGTERM');
    } catch {
      // Ignore if process already ended.
    }
  }

  await sleep(1200);

  const stillInUse = safeExec(`lsof -n -iTCP:${PORT} -sTCP:LISTEN -t`);
  if (stillInUse) {
    console.error(
      `[startup] Port ${PORT} is still busy after cleanup. Run: lsof -n -iTCP:${PORT} -sTCP:LISTEN`
    );
    process.exit(1);
  }

  console.log(`[startup] Port ${PORT} is now free.`);
}

async function start() {
  console.log('[startup] Starting Next.js dev server...');
  console.log(`[startup] Target URL: http://localhost:${PORT}`);

  await cleanupPort();

  const child = spawn('npm', ['run', 'dev', '--', '--port', String(PORT), '--hostname', 'localhost'], {
    stdio: 'inherit',
    shell: process.platform === 'win32',
  });

  child.on('exit', (code, signal) => {
    if (signal) {
      process.exit(1);
    }
    process.exit(code ?? 0);
  });
}

start().catch((error) => {
  console.error('[startup] Failed to start server:', error);
  process.exit(1);
});
