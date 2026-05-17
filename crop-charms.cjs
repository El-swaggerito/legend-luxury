const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

const root = path.join(process.cwd(), "public", "images", "charms");

async function cropFolder(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      await cropFolder(full);
    } else if (/\.(jpe?g|png|webp)$/i.test(entry.name)) {
      try {
        await sharp(full)
          .trim({ background: "#000000", threshold: 40 })
          .toFile(full + ".tmp.jpg");
        fs.renameSync(full + ".tmp.jpg", full);
        console.log("Cropped:", full);
      } catch (e) {
        console.error("Skip:", entry.name, e.message);
      }
    }
  }
}

cropFolder(root).then(() => console.log("Done!"));
