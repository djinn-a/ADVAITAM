#!/usr/bin/env node
/**
 * Post-build prerendering script for SEO crawler visibility
 * This script renders the React app and injects the HTML content into index.html
 */

const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');
const http = require('http');
const url = require('url');

const DIST_DIR = path.resolve(__dirname, '../dist');
const PORT = 3456;

// Simple static file server
const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  let pathname = parsedUrl.pathname;

  if (pathname === '/') pathname = '/index.html';

  const filePath = path.join(DIST_DIR, pathname);
  const ext = path.extname(filePath);
  const contentTypes = {
    '.html': 'text/html',
    '.js': 'text/javascript',
    '.css': 'text/css',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
  };

  const contentType = contentTypes[ext] || 'application/octet-stream';

  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('Not found');
      return;
    }
    res.writeHead(200, { 'Content-Type': contentType });
    res.end(data);
  });
});

async function prerender() {
  console.log('🚀 Starting prerender server...');

  await new Promise((resolve) => server.listen(PORT, resolve));
  console.log(`📡 Server running on http://localhost:${PORT}`);

  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  try {
    const page = await browser.newPage();

    // Wait for the app to fully render
    await page.goto(`http://localhost:${PORT}/`, {
      waitUntil: 'networkidle0',
    });

    // Wait for React to hydrate and render
    await page.waitForSelector('#root', { timeout: 5000 });

    // Give extra time for animations and data to load
    await page.waitForTimeout(2000);

    // Get the rendered HTML
    const html = await page.content();

    // Write the prerendered HTML
    const indexPath = path.join(DIST_DIR, 'index.html');
    fs.writeFileSync(indexPath, html);

    console.log('✅ Prerender complete! HTML injected with content.');
    console.log(`📄 Output: ${indexPath}`);

    // Verify content exists
    const content = fs.readFileSync(indexPath, 'utf-8');
    const hasContent = content.includes('Advaitam') && content.includes('Forest Villa');
    console.log(`🔍 Verification: ${hasContent ? 'Content found ✓' : 'No content detected ✗'}`);

  } catch (error) {
    console.error('❌ Prerender failed:', error.message);
    process.exit(1);
  } finally {
    await browser.close();
    server.close();
    console.log('🏁 Done!');
  }
}

prerender();
