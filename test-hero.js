import { chromium } from '@playwright/test';
import { spawn } from 'child_process';
import { mkdirSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
mkdirSync(resolve(__dirname, 'test-screenshots'), { recursive: true });

// Start dev server
const server = spawn('npm', ['run', 'dev'], { 
  cwd: __dirname, 
  stdio: 'pipe',
  shell: true 
});

let serverReady = false;
server.stdout.on('data', (data) => {
  const str = data.toString();
  if (str.includes('5173') || str.includes('ready')) {
    serverReady = true;
  }
});

// Wait for server
await new Promise(r => setTimeout(r, 8000));

// Take screenshots
const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });

await page.goto('http://localhost:5173', { waitUntil: 'networkidle' });
await new Promise(r => setTimeout(r, 3000));

// Desktop
await page.screenshot({ path: resolve(__dirname, 'test-screenshots/hero-desktop.png') });
console.log('✓ Desktop screenshot saved');

// Tablet
await page.setViewportSize({ width: 768, height: 1024 });
await new Promise(r => setTimeout(r, 1000));
await page.screenshot({ path: resolve(__dirname, 'test-screenshots/hero-tablet.png') });
console.log('✓ Tablet screenshot saved');

// Mobile
await page.setViewportSize({ width: 375, height: 812 });
await new Promise(r => setTimeout(r, 1000));
await page.screenshot({ path: resolve(__dirname, 'test-screenshots/hero-mobile.png') });
console.log('✓ Mobile screenshot saved');

await browser.close();
server.kill();
console.log('\nScreenshots in test-screenshots/');
