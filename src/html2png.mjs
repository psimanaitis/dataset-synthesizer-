import puppeteer from 'puppeteer';
import fs from 'fs';

export const htmlFilesToImages = async (htmlDirectory, imagesDirectory)=>{
  const dir = await fs.promises.opendir(htmlDirectory);
  for await (const dirent of dir) {
    const content = await fs.promises.readFile(`${htmlDirectory}/${dirent.name}`);
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setContent(content.toString());
    await page.screenshot({path: `${imagesDirectory}/${dirent.name}.png`});
    await browser.close();
  }
};
