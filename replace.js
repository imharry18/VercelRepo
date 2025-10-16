const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'src');

const replacements = [
  { regex: /text-white(?!(\/|-[0-9]))/g, replacement: 'text-slate-900' },
  { regex: /bg-black\/60/g, replacement: 'bg-white/80' },
  { regex: /bg-black/g, replacement: 'bg-[#fbf6f3]' },
  { regex: /border-white\/10/g, replacement: 'border-slate-200' },
  { regex: /border-white\/5/g, replacement: 'border-slate-100' },
  { regex: /bg-white\/5(?!0)/g, replacement: 'bg-slate-50' },
  { regex: /bg-white\/10/g, replacement: 'bg-white' },
  { regex: /text-slate-400/g, replacement: 'text-slate-600' },
  { regex: /text-slate-300/g, replacement: 'text-slate-700' },
  { regex: /text-brand-muted/g, replacement: 'text-slate-600' },
  { regex: /via-white/g, replacement: 'via-slate-700' },
  { regex: /from-white/g, replacement: 'from-slate-900' },
  { regex: /mix-blend-screen/g, replacement: 'mix-blend-multiply' },
  { regex: /text-white\/80/g, replacement: 'text-slate-600' },
  { regex: /text-white\/20/g, replacement: 'text-slate-400' },
];

function processDirectory(directory) {
  const files = fs.readdirSync(directory);
  for (const file of files) {
    const fullPath = path.join(directory, file);
    if (fs.statSync(fullPath).isDirectory()) {
      processDirectory(fullPath);
    } else if (fullPath.endsWith('.js') || fullPath.endsWith('.jsx')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      
      // Skip Button.js and Card.js as we did them manually
      if (file === 'Button.js' || file === 'Card.js') continue;

      let newContent = content;
      for (const { regex, replacement } of replacements) {
        newContent = newContent.replace(regex, replacement);
      }
      
      if (content !== newContent) {
        fs.writeFileSync(fullPath, newContent, 'utf8');
        console.log(`Updated ${fullPath}`);
      }
    }
  }
}

processDirectory(dir);
console.log("Done.");
