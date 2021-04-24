import puppeteer from 'puppeteer';

import { promises as fs } from 'fs';
import sharp from "sharp";

export const htmlFilesToImages = async (dsDirectory)=>{
  const dir = await fs.opendir(`./${dsDirectory}-dataset/html`);
  const tokensFileContent = await fs.readFile(`./dataset/tokens.json`)
  const tokens = JSON.parse(tokensFileContent);

  await fs.mkdir(`./dataset/images/`, { recursive: true });
  await fs.mkdir(`./dataset/resized/`, { recursive: true });
  const html = [];
  for await (const dirent of dir) {
    const content = await fs.readFile(`./${dsDirectory}-dataset/html/${dirent.name}`);
    const browser = await puppeteer.launch({
        args: [`--window-size=1920,1080`]
    });
    const page = await browser.newPage();
    await page.setContent(content.toString());
    await page.screenshot({path: `./dataset/images/${dirent.name}.png`,  fullScreen: true, fullPage: true});
    await browser.close();

    await sharp(`dataset/images/${dirent.name}.png`)
          .resize(300,300, {fit : 'fill'})
          .toFormat('jpeg')
          .toFile(`dataset/resized/${dirent.name}.jpeg`);

    const tokenizedContent = content.toString().split(' ')
        .map(token => tokens.includes(token) ? token : 'unknown' )
        .reduce((acc, entry, index)=>{
          if(index === 0){
            return [entry]
          }

          if(acc[acc.length-1] === entry){
            return acc;
          }
          return [...acc, entry]
        }, [])
        .join(' ')

    html.push({id: dirent.name, content: tokenizedContent})
  }

  await fs.writeFile(`./dataset/${dsDirectory}-html.json`, JSON.stringify(html));
};

(async ()=>{await htmlFilesToImages('train')})();
(async ()=>{await htmlFilesToImages('test')})();