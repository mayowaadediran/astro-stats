#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Create a simple SVG icon
const createIcon = (size) => {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
  <rect width="${size}" height="${size}" fill="#22c55e"/>
  <circle cx="${size/2}" cy="${size/2}" r="${size/3}" fill="white"/>
  <text x="${size/2}" y="${size/2}" font-family="Arial" font-size="${size/4}" fill="#22c55e" text-anchor="middle" dominant-baseline="middle">AS</text>
</svg>`;
};

// Icon sizes for PWA
const sizes = [72, 96, 128, 144, 152, 192, 384, 512];

// Create icons directory if it doesn't exist
const iconsDir = path.join(__dirname, '..', 'public', 'icons');
if (!fs.existsSync(iconsDir)) {
  fs.mkdirSync(iconsDir, { recursive: true });
}

// Generate SVG icons for each size
sizes.forEach(size => {
  const svg = createIcon(size);
  const filename = path.join(iconsDir, `icon-${size}x${size}.svg`);
  fs.writeFileSync(filename, svg);
  console.log(`Created ${filename}`);
});

// Create a placeholder favicon
const favicon = createIcon(32);
fs.writeFileSync(path.join(__dirname, '..', 'public', 'favicon.svg'), favicon);
console.log('Created favicon.svg');

console.log('\n✅ Icons generated successfully!');
console.log('Note: For production, replace these with proper PNG icons.');
