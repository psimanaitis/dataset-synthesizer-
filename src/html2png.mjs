import puppeteer from 'puppeteer';

import { promises as fs } from 'fs';
import sharp from "sharp";

export const htmlFilesToImages = async (dsDirectory)=>{
  const dir = await fs.opendir(`${dsDirectory}/html`);

  await fs.mkdir(`./${dsDirectory}/tokenized/`, { recursive: true });
  await fs.mkdir(`./${dsDirectory}/images/`, { recursive: true });
  await fs.mkdir(`./${dsDirectory}/resized/`, { recursive: true });
  const html = [];
  for await (const dirent of dir) {
    const content = await fs.readFile(`${dsDirectory}/html/${dirent.name}`);
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setContent(content.toString());
    await page.screenshot({path: `${dsDirectory}/images/${dirent.name}.png`});
    await browser.close();

    await sharp(`${dsDirectory}/images/${dirent.name}.png`)
          .resize(299,299, {fit : 'fill'})
          .toFormat('jpeg')
          .toFile(`${dsDirectory}/resized/${dirent.name}.jpeg`);

    html.push({id: dirent.name, content: content.toString()})
  }

  await fs.writeFile(`./${dsDirectory}/html.json`, JSON.stringify(html));
};

(async ()=>{await htmlFilesToImages('./train-dataset')})();
(async ()=>{await htmlFilesToImages('./test-dataset')})();