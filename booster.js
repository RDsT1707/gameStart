// booster.js
const fs = require('fs');
const path = require('path');

// Fichier que le script va modifier
const FILE = path.join(__dirname, 'time.ts');

console.log('🚀 Booster WakaTime lancé...');

// Si le fichier n'existe pas, on le crée
if (!fs.existsSync(FILE)) {
  fs.writeFileSync(FILE, '// Fichier généré pour booster WakaTime\n');
}

// Chaque 15 secondes, on écrit une nouvelle ligne
setInterval(() => {
  const timestamp = new Date().toISOString();
  const line = `// ${timestamp} - auto-activity\n`;
  fs.appendFileSync(FILE, line);
  console.log('✍️ Activité simulée à', timestamp);
}, 15000);
