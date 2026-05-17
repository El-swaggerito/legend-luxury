const Replicate = require("replicate");
const fs = require("fs");
const path = require("path");
const https = require("https");

const REPLICATE_API_TOKEN = "r8_JqXH1EBO5ME5u9QAkl5L7s3jPcyjxg90ttS2z";
const root = path.join(process.cwd(), "public", "images", "charms");

const replicate = new Replicate({ auth: REPLICATE_API_TOKEN });

function downloadFile(url, dest) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    https.get(url, (res) => {
      res.pipe(file);
      file.on("finish", () => { file.close(); resolve(); });
    }).on("error", reject);
  });
}

async function upscaleFolder(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      await upscaleFolder(full);
    } else if (/\.(jpe?g|png|webp)$/i.test(entry.name)) {
      try {
        console.log("Upscaling:", entry.name);
        const imageData = fs.readFileSync(full);
        const base64 = `data:image/jpeg;base64,${imageData.toString("base64")}`;
        const output = await replicate.run(
          "nightmareai/real-esrgan:f121d640bd286e1fdc67f9799164c1d5be36ff74576ee11c803ae5b665dd46aa",
          { input: { image: base64, scale: 4, face_enhance: false } }
        );
        const tmpPath = full + ".tmp.jpg";
        await downloadFile(output, tmpPath);
        fs.renameSync(tmpPath, full);
        console.log("Done:", entry.name);
      } catch (e) {
        console.error("Skip:", entry.name, e.message);
      }
    }
  }
}

upscaleFolder(root).then(() => console.log("All images upscaled!"));