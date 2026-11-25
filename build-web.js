const fs = require('fs');
const path = require('path');
const babel = require('@babel/core');

const htmlPath = path.join(__dirname, 'www', 'index.html');
const vendorDir = path.join(__dirname, 'www', 'vendor');
fs.mkdirSync(vendorDir, { recursive: true });

// Copy local React 18 production UMD bundles so the app never waits on unpkg.com
fs.copyFileSync(
  path.join(__dirname, 'node_modules', 'react', 'umd', 'react.production.min.js'),
  path.join(vendorDir, 'react.production.min.js')
);
fs.copyFileSync(
  path.join(__dirname, 'node_modules', 'react-dom', 'umd', 'react-dom.production.min.js'),
  path.join(vendorDir, 'react-dom.production.min.js')
);

let html = fs.readFileSync(htmlPath, 'utf8');

// Swap slow unpkg React & Babel CDN tags for local React files
html = html.replace(
  /<script src="https:\/\/unpkg\.com\/react@18\/umd\/react\.production\.min\.js"><\/script>/,
  '<script src="./vendor/react.production.min.js"></script>'
);
html = html.replace(
  /<script src="https:\/\/unpkg\.com\/react-dom@18\/umd\/react-dom\.production\.min\.js"><\/script>/,
  '<script src="./vendor/react-dom.production.min.js"></script>'
);
html = html.replace(
  /<script src="https:\/\/unpkg\.com\/@babel\/standalone\/babel\.min\.js"><\/script>\s*/g,
  ''
);

// Pre-compile the <script type="text/babel"> block into standard JavaScript
const babelRegex = /<script type="text\/babel">([\s\S]*?)<\/script>/;
const match = html.match(babelRegex);
if (match) {
  const compiled = babel.transformSync(match[1], {
    presets: [['@babel/preset-react', { runtime: 'classic' }]],
    compact: true,
    comments: false,
  });
  html = html.replace(babelRegex, () => `<script>\n${compiled.code}\n</script>`);
  console.log('Successfully pre-compiled JSX into plain JavaScript!');
}

fs.writeFileSync(htmlPath, html, 'utf8');
