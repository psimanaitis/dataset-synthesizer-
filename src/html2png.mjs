import puppeteer from 'puppeteer';

import { promises as fs } from 'fs';
import sharp from "sharp";

export const htmlFilesToImages = async (htmlDirectory, imagesDirectory)=>{
  const dir = await fs.opendir(htmlDirectory);

  await fs.mkdir('./dataset/tokenized/', { recursive: true });
  await fs.mkdir('./dataset/images/', { recursive: true });
  await fs.mkdir('./dataset/resized/', { recursive: true });
  const html = [];
  for await (const dirent of dir) {
    const content = await fs.readFile(`${htmlDirectory}/${dirent.name}`);
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setContent(content.toString());
    await page.screenshot({path: `${imagesDirectory}/${dirent.name}.png`});
    await browser.close();

    await sharp(`${imagesDirectory}/${dirent.name}.png`)
          .resize(299,299, {fit : 'fill'})
          .toFormat('jpeg')
          .toFile(`dataset/resized/${dirent.name}.jpeg`);

    html.push({id: dirent.name, content: content.toString()})
  }

  await fs.writeFile(`./dataset/html.json`, JSON.stringify(html));
};

(async ()=>{await htmlFilesToImages('./dataset/html/', './dataset/images/')})();