#!/usr/bin/env node
/**
 * Playwright screenshot test for HeroSection alignment
 */

import { chromium } from '@playwright/test';
import { execSync } from 'child_process';
import { createServer } from 'vite';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const SCREENSHOTS_DIR = resolve(__dirname, 'test-screenshots');

async function delay(ms) {
  return new Promise(r => setTimeout(r, ms));
}

async function main() {
  console.log('Starting Vite dev server...');
  const server = await createServer({
    root: __dirname,
    server: { port: 5173, host: true }
  });
  await server.listen();

  console.log('Launching browser...');
  const browser = await chromium.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const context = await browser.newContext({
    viewport: { width: 1280, height: 900 },
    deviceScaleFactor: 1
  });

  const page = await context.newPage();

  // Load the page and wait for animations
  console.log('Navigating to homepage...');
  await page.goto('http://localhost:5173', { waitUntil: 'networkidle' });

  // Wait for hero animations to complete
  await delay(3000);

  // Take full page screenshot
  console.log('Taking screenshots...');
  await page.screenshot({
    path: resolve(SCREENSHOTS_DIR, 'hero-desktop.png'),
    fullPage: false
  });

  // Take viewport screenshot focused on hero
  await page.screenshot({
    path: resolve(SCREENSHOTS_DIR, 'hero-viewport.png'),
    fullPage: false,
    clip: { x: 0, y: 0, width: 1280, height: 900 }
  });

  // Test mobile viewport
  await page.setViewportSize({ width: 375, height: 812 });
  await delay(1000);
  await page.screenshot({
    path: resolve(SCREENSHOTS_DIR, 'hero-mobile.png'),
    fullPage: false
  });

  console.log('Screenshots saved to:', SCREENSHOTS_DIR);
  console.log('- hero-desktop.png');
  console.log('- hero-viewport.png');
  console.log('- hero-mobile.png');

  await browser.close();
  await server.close();
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
