import { promises as fs } from 'fs';
import sharp from "sharp";
import {shuffleArray} from "../shuffleArray.mjs";

export const pixToDataset = async (guiDirectory)=>{
    const dir = await fs.opendir(guiDirectory);

    await fs.mkdir('./train-pix2code/tokenized/', { recursive: true });
    await fs.mkdir('./train-pix2code/images/', { recursive: true });
    await fs.mkdir('./train-pix2code/resized/', { recursive: true });

    await fs.mkdir('./test-pix2code/tokenized/', { recursive: true });
    await fs.mkdir('./test-pix2code/images/', { recursive: true });
    await fs.mkdir('./test-pix2code/resized/', { recursive: true });

    const trainSamples = [];
    const testSamples = [];

    const fileEntries = [];
    for await (const dirEntry of dir) {
        fileEntries.push(dirEntry.name);
    }

    const guiEntries = fileEntries.filter(dirEntry => dirEntry.includes(".gui"));


    const maxEntries = 1750;
    let currentCounter = 0;
    const allEntries = shuffleArray(Array.from(Array(maxEntries).keys()));
    const trainData = allEntries.slice(0, 1501);

    for await (const dirEntry of guiEntries) {
            currentCounter += 1;
            const content = await fs.readFile(`${guiDirectory}/${dirEntry}`);

            if(trainData.includes(currentCounter)){
                trainSamples.push({id: dirEntry, content: content.toString()})
            }else{
                testSamples.push({id: dirEntry, content: content.toString()})
            }

            await sharp(`${guiDirectory}/${dirEntry.replace('.gui', '.png')}`)
                .resize(299,299, {fit : 'fill'})
                .toFormat('jpeg')
                .toFile(`./pix2code/resized/${dirEntry.replace('.png', '')}.jpeg`);
    }

    await fs.writeFile(`./pix2code/train-html.json`, JSON.stringify(trainSamples.map(entry => (
            {
                ...entry,
                content: entry.content
                    .replace(/\n/g, ' ')
                    .replace('/{/g', ' { ')
                    .replace('/}/g', ' } ')
                    .replace(/  +/g, ' ')
            }
        )
    )));

    await fs.writeFile(`./pix2code/test-html.json`, JSON.stringify(testSamples.map(entry => (
        {
            ...entry,
            content: entry.content
            .replace(/\n/g, ' ')
            .replace('/{/g', ' { ')
            .replace('/}/g', ' } ')
            .replace(/  +/g, ' ')
        }
        )
    )));


    await fs.writeFile(`./pix2code/tokens.json`, JSON.stringify(Array.from(new Set([...trainSamples, ...testSamples ].map(entry =>
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

    await fs.writeFile(`./train-pix2code/tokens.json`, JSON.stringify(Array.from(new Set([...trainSamples, ...testSamples ].map(entry =>
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