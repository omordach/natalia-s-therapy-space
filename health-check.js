#!/usr/bin/env node

/**
 * Health Check Script
 * Performs basic health checks on the built application
 */

import { readFileSync, existsSync } from 'fs';
import { join } from 'path';

const checks = {
  passed: 0,
  failed: 0,
  warnings: 0
};

function log(type, message) {
  const symbols = {
    success: '✓',
    error: '✗',
    warning: '⚠',
    info: 'ℹ'
  };
  console.log(`${symbols[type] || '•'} ${message}`);
}

function checkFileExists(filePath, name) {
  if (existsSync(filePath)) {
    log('success', `${name} exists`);
    checks.passed++;
    return true;
  } else {
    log('error', `${name} not found at ${filePath}`);
    checks.failed++;
    return false;
  }
}

function checkFileSize(filePath, name, maxSizeKB) {
  if (!existsSync(filePath)) {
    return false;
  }

  const stats = readFileSync(filePath);
  const sizeKB = stats.length / 1024;

  if (sizeKB > maxSizeKB) {
    log('warning', `${name} is ${sizeKB.toFixed(2)}KB (exceeds ${maxSizeKB}KB recommended)`);
    checks.warnings++;
  } else {
    log('success', `${name} size is ${sizeKB.toFixed(2)}KB`);
    checks.passed++;
  }
  return true;
}

function checkHTMLContent(filePath) {
  if (!existsSync(filePath)) {
    return false;
  }

  const content = readFileSync(filePath, 'utf-8');

  // Check for essential HTML elements
  const essentialChecks = [
    { pattern: /<html/i, name: 'HTML tag' },
    { pattern: /<head/i, name: 'HEAD tag' },
    { pattern: /<body/i, name: 'BODY tag' },
    { pattern: /<script/i, name: 'Script tag' },
  ];

  essentialChecks.forEach(({ pattern, name }) => {
    if (pattern.test(content)) {
      log('success', `${name} found in HTML`);
      checks.passed++;
    } else {
      log('error', `${name} missing in HTML`);
      checks.failed++;
    }
  });

  return true;
}

console.log('\n🏥 Running Health Checks...\n');

// Check 1: Build directory exists
console.log('📁 Checking build output...');
if (!checkFileExists('./dist', 'Build directory')) {
  process.exit(1);
}

// Check 2: Index HTML exists
console.log('\n📄 Checking HTML files...');
const indexPath = './dist/index.html';
if (checkFileExists(indexPath, 'index.html')) {
  checkHTMLContent(indexPath);
}

// Check 3: Check for JavaScript bundles
console.log('\n📦 Checking JavaScript bundles...');
import { readdirSync, statSync } from 'fs';
try {
  const assetsDir = './dist/assets';
  if (existsSync(assetsDir)) {
    const files = readdirSync(assetsDir);
    const jsFiles = files.filter(f => f.endsWith('.js'));
    const cssFiles = files.filter(f => f.endsWith('.css'));

    if (jsFiles.length > 0) {
      log('success', `Found ${jsFiles.length} JavaScript bundle(s)`);
      checks.passed++;
    } else {
      log('error', 'No JavaScript bundles found');
      checks.failed++;
    }

    if (cssFiles.length > 0) {
      log('success', `Found ${cssFiles.length} CSS file(s)`);
      checks.passed++;
    } else {
      log('warning', 'No CSS files found');
      checks.warnings++;
    }

    const maxImageKB = 250;
    const oversizedImages = files
      .filter(f => /\.(png|jpe?g|webp|avif|gif)$/i.test(f))
      .map(f => ({ name: f, sizeKB: statSync(join(assetsDir, f)).size / 1024 }))
      .filter(img => img.sizeKB > maxImageKB);

    if (oversizedImages.length === 0) {
      log('success', `All bundled images are under ${maxImageKB}KB`);
      checks.passed++;
    } else {
      oversizedImages.forEach(img =>
        log('error', `${img.name} is ${img.sizeKB.toFixed(0)}KB (budget ${maxImageKB}KB)`)
      );
      checks.failed++;
    }
  } else {
    log('error', 'Assets directory not found');
    checks.failed++;
  }
} catch (error) {
  log('error', `Error checking assets: ${error.message}`);
  checks.failed++;
}

// Check 4: Package.json validation
console.log('\n📋 Checking package.json...');
try {
  const pkg = JSON.parse(readFileSync('./package.json', 'utf-8'));

  if (pkg.name) {
    log('success', `Package name: ${pkg.name}`);
    checks.passed++;
  }

  if (pkg.version) {
    log('success', `Package version: ${pkg.version}`);
    checks.passed++;
  }

  const requiredScripts = ['dev', 'build', 'lint'];
  requiredScripts.forEach(script => {
    if (pkg.scripts && pkg.scripts[script]) {
      log('success', `Script '${script}' defined`);
      checks.passed++;
    } else {
      log('error', `Script '${script}' missing`);
      checks.failed++;
    }
  });
} catch (error) {
  log('error', `Error reading package.json: ${error.message}`);
  checks.failed++;
}

// Summary
console.log('\n' + '='.repeat(50));
console.log('📊 Health Check Summary');
console.log('='.repeat(50));
console.log(`✓ Passed:   ${checks.passed}`);
console.log(`✗ Failed:   ${checks.failed}`);
console.log(`⚠ Warnings: ${checks.warnings}`);
console.log('='.repeat(50) + '\n');

if (checks.failed > 0) {
  console.log('❌ Health check failed!\n');
  process.exit(1);
} else if (checks.warnings > 0) {
  console.log('⚠️  Health check passed with warnings\n');
  process.exit(0);
} else {
  console.log('✅ All health checks passed!\n');
  process.exit(0);
}
