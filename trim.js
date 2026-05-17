const sharp = require('sharp');
const fs = require('fs');
const path = require('path');
const charmsDir = './public/images/charms';
async function trimImage(filePath) {
  try {
    const buffer = await sharp(filePath)
      .trim({ background: '#000000', threshold: 30 })
      .toBuffer();
    fs.writeFileSync(filePath, buffer);
    console.log('Trimmed:', path.basename(filePath));
  } catch (err) {
    console.error('Failed:', filePath, err.message);
  }
}
function getAllImages(dir) {
  const results = [];
  fs.readdirSync(dir, { withFileTypes: true }).forEach(entry => {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) results.push(...getAllImages(full));
    else if (/\.(jpg|jpeg|png)$/i.test(entry.name)) results.push(full);
  });
  return results;
}
const images = getAllImages(charmsDir);
Promise.all(images.map(trimImage)).then(() => console.log('Done!'));
