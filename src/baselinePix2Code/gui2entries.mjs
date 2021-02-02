import { promises as fs } from 'fs';
import sharp from "sharp";

export const pixToDataset = async (guiDirectory)=>{
    const dir = await fs.opendir(guiDirectory);

    await fs.mkdir('./pix2code/tokenized/', { recursive: true });
    await fs.mkdir('./pix2code/images/', { recursive: true });
    await fs.mkdir('./pix2code/resized/', { recursive: true });
    const html = [];

    for await (const dirEntry of dir) {
        if(dirEntry.name.includes(".gui")){
            const content = await fs.readFile(`${guiDirectory}/${dirEntry.name}`);
            html.push({id: dirEntry.name, content: content.toString()})
        }
        if(dirEntry.name.includes(".png")){
            await sharp(`${guiDirectory}/${dirEntry.name}`)
                .resize(299,299, {fit : 'fill'})
                .toFormat('jpeg')
                .toFile(`pix2code/resized/${dirEntry.name.replace('.png', '')}.jpeg`);
        }
    }

    await fs.writeFile(`./pix2code/html.json`, JSON.stringify(html.map(entry => entry.content
        .replace(/\n\r/g, ' ')
        .replace('/{/g', ' { ')
        .replace('/}/g', ' } ')
        .replace(/  +/g, ' ')
    )));
    await fs.writeFile(`./pix2code/tokens.json`, JSON.stringify(Array.from(new Set(html.map(entry =>
        entry.content
        .replace(/\n/g, ' ')
        .replace('/{/g', ' { ')
        .replace('/}/g', ' } ')
        .replace(/  +/g, ' ')
        .split(' ')
    )
        .flat()
        .filter(value => value)
    ) )));
};

(async ()=>{await pixToDataset('./pix2codeDataset/')})();