import puppeteer from 'puppeteer';

import { promises as fs } from 'fs';
import sharp from "sharp";

export const htmlFilesToImages = async (dsDirectory)=>{
  const dir = await fs.opendir(`./${dsDirectory}-dataset/html`);

  await fs.mkdir(`./dataset/tokenized/`, { recursive: true });
  await fs.mkdir(`./dataset/images/`, { recursive: true });
  await fs.mkdir(`./dataset/resized/`, { recursive: true });
  const html = [];
  for await (const dirent of dir) {
    const content = await fs.readFile(`./${dsDirectory}-dataset/html/${dirent.name}`);
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setContent(content.toString());
    await page.screenshot({path: `./dataset/images/${dirent.name}.png`});
    await browser.close();

    await sharp(`dataset/images/${dirent.name}.png`)
          .resize(299,299, {fit : 'fill'})
          .toFormat('jpeg')
          .toFile(`dataset/resized/${dirent.name}.jpeg`);

    html.push({id: dirent.name, content: content.toString()})
  }

  await fs.writeFile(`./dataset/${dsDirectory}-html.json`, JSON.stringify(html));
};

(async ()=>{await htmlFilesToImages('train')})();
(async ()=>{await htmlFilesToImages('test')})();