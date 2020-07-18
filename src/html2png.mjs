import puppeteer from 'puppeteer';
import { promises as fs } from 'fs';

export const htmlFilesToImages = async (htmlDirectory, imagesDirectory)=>{
  const dir = await fs.opendir(htmlDirectory);

  await fs.mkdir('./dataset/tokenized/');
  await fs.mkdir('./dataset/images/');

  for await (const dirent of dir) {
    const content = await fs.promises.readFile(`${htmlDirectory}/${dirent.name}`);
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setContent(content.toString());
    await page.screenshot({path: `${imagesDirectory}/${dirent.name}.png`});
    await browser.close();
    //TODO tokenize html, strip filler texts
    await fs.writeFile(`./dataset/tokenized/${dirent.name}.html`, content.toString());
  }
};

(async ()=>{await htmlFilesToImages('./dataset/html/', './dataset/images/')})();