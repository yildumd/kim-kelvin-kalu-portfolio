import { cpSync, mkdirSync, existsSync, readdirSync, lstatSync } from 'fs';
import { join } from 'path';

console.log('🚀 Starting build process...');

// Create public directory
const publicDir = './public';
if (!existsSync(publicDir)) {
  mkdirSync(publicDir, { recursive: true });
  console.log('✓ Created public directory');
}

// Files and folders to copy
const itemsToCopy = [
  'index.html',
  'css',
  'js',
  'images',
  'README.md'
];

itemsToCopy.forEach(item => {
  try {
    const source = `./${item}`;
    const destination = `${publicDir}/${item}`;
    
    if (existsSync(source)) {
      if (lstatSync(source).isDirectory()) {
        copyFolderRecursiveSync(source, destination);
      } else {
        cpSync(source, destination);
      }
      console.log(`✓ Copied: ${item}`);
    } else {
      console.log(`⚠ Not found: ${item}`);
    }
  } catch (error) {
    console.log(`✗ Error copying ${item}:`, error.message);
  }
});

console.log('✅ Build completed successfully!');

function copyFolderRecursiveSync(source, target) {
  if (!existsSync(target)) {
    mkdirSync(target, { recursive: true });
  }

  const files = readdirSync(source);
  files.forEach(file => {
    const curSource = join(source, file);
    const curTarget = join(target, file);
    
    if (lstatSync(curSource).isDirectory()) {
      copyFolderRecursiveSync(curSource, curTarget);
    } else {
      cpSync(curSource, curTarget);
    }
  });
}