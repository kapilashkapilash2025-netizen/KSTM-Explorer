#!/usr/bin/env node
const url = 'http://localhost:9999/';
const timeoutMs = 5000;

const controller = new AbortController();
const timer = setTimeout(() => controller.abort(), timeoutMs);

try {
  const response = await fetch(url, { signal: controller.signal });
  clearTimeout(timer);

  if (!response.ok) {
    console.error(`[health] ${url} responded with HTTP ${response.status}`);
    process.exit(1);
  }

  console.log(`[health] OK: ${url} -> HTTP ${response.status}`);
} catch (error) {
  clearTimeout(timer);
  console.error(`[health] Failed to reach ${url}`);
  console.error(`[health] ${error?.message ?? error}`);
  process.exit(1);
}
