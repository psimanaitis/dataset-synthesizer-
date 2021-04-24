import {getAllTagsReworked} from './token.mjs';
import {generateContent} from "./tree2html.mjs";
import {promises as fs} from 'fs';
import {
    contentButtonConfig,
    contentSpanConfig,
    contentStrongConfig,
    contentContainerConfig,
    generetatePixCodeElements,
    getHeaderButtons,
    getStandarBlock,
    headerContainerConfig,
    headerElementActive,
    headerElementInactive
} from "./pix2code/element.mjs";
import {combinations, getCombinationChildren} from "./pix2code/combinations.mjs";
import {commonText, containsEachKey} from "./pix2code/utils.mjs";
import {shuffleArray} from "./shuffleArray.mjs";


const main = async () => {
    const { headerContainer, headerElements, contentContainer, contentButton, contentStrong, contentSpan } = generetatePixCodeElements();

    const headers = getHeaderButtons([headerElements[1], headerElements[3]]).map(headerButtons=>({
        contentFn: headerContainer[0], children:  headerButtons.map(buttonFn => ({contentFn: buttonFn, children: [{contentFn: commonText}]}))
    }));

    await fs.mkdir('./dataset/html/', { recursive: true });

    const maxEntries = 2000;
    let currentCounter = 0;
    const allEntries = shuffleArray(Array.from(Array(maxEntries).keys()));
    const trainData = allEntries.slice(0, 1750);

    await fs.mkdir('./test-dataset/html/', { recursive: true });
    await fs.mkdir('./train-dataset/html/', { recursive: true });

    for await (let i of [ ...Array(54).keys() ]){
        for await (let [index, combination] of combinations.entries()){
            if(currentCounter < maxEntries){
                const givenTree = {
                    contentFn: content => content,
                    children: [
                        headers[i % headers.length],
                        {
                            contentFn: contentContainer[0],
                            children:
                                combination.map(
                                    getCombinationChildren(contentStrong, contentSpan, contentButton)
                                ).flat()
                        },
                    ]
                };
                const html = `<body> ${generateContent(givenTree).replace(/  +/g, ' ') } </body>`;
                try {
                    await fs.writeFile(`./${trainData.includes(currentCounter) ? 'train-' : 'test-'}dataset/html/${i}-${index}.html`, html);
                    console.info(`Successfully written ${i}-${index}`);
                } catch (error){
                    console.error(error);
                }
            }
            currentCounter += 1;
        }
    }

    const tokens = Array.from(new Set([
        ...getAllTagsReworked(headerContainerConfig).filter(containsEachKey(headerContainerConfig)).map((callback) => callback('')),
        ...getAllTagsReworked(headerElementActive).filter(containsEachKey(headerElementActive)).map((callback) => callback('')),
        ...getAllTagsReworked(headerElementInactive).filter(containsEachKey(headerElementInactive)).map((callback) => callback('')),
        ...getAllTagsReworked(contentButtonConfig).filter(containsEachKey(contentButtonConfig)).map((callback) => callback('')),
        ...getAllTagsReworked(contentStrongConfig).filter(containsEachKey(contentStrongConfig)).map((callback) => callback('')),
        ...getAllTagsReworked(contentSpanConfig).filter(containsEachKey(contentSpanConfig)).map((callback) => callback('')),
        ...getAllTagsReworked(contentContainerConfig).filter(containsEachKey(contentContainerConfig)).map((callback) => callback('')),
        ...getAllTagsReworked({div: [{...getStandarBlock(1), 'grid-column' : ['1/3']}]}).filter(containsEachKey({div: [{...getStandarBlock(1), 'grid-column' : ['1/3']}]})).map((callback) => callback('')),
        ...getAllTagsReworked({div: [{...getStandarBlock(2), 'grid-column' : ['1/3']}]}).filter(containsEachKey({div: [{...getStandarBlock(2), 'grid-column' : ['1/3']}]})).map((callback) => callback('')),
        ...getAllTagsReworked({div: [{...getStandarBlock(2), 'grid-column' : ['3/5']}]}).filter(containsEachKey({div: [{...getStandarBlock(2), 'grid-column' : ['3/5']}]})).map((callback) => callback('')),
        ...getAllTagsReworked({div: [{...getStandarBlock(3), 'grid-column' : ['1/3']}]}).filter(containsEachKey({div: [{...getStandarBlock(3), 'grid-column' : ['1/3']}]})).map((callback) => callback('')),
        ...getAllTagsReworked({div: [{...getStandarBlock(3), 'grid-column' : ['3/5']}]}).filter(containsEachKey({div: [{...getStandarBlock(3), 'grid-column' : ['3/5']}]})).map((callback) => callback('')),
        ...getAllTagsReworked({div: [{...getStandarBlock(2)}]}).filter(containsEachKey({div: [{...getStandarBlock(0)}]})).map((callback) => callback('')),
        ...getAllTagsReworked({div: [{...getStandarBlock(2)}]}).filter(containsEachKey({div: [{...getStandarBlock(1)}]})).map((callback) => callback('')),
        ...getAllTagsReworked({div: [{...getStandarBlock(2)}]}).filter(containsEachKey({div: [{...getStandarBlock(2)}]})).map((callback) => callback('')),
        ...getAllTagsReworked({div: [{...getStandarBlock(3)}]}).filter(containsEachKey({div: [{...getStandarBlock(3)}]})).map((callback) => callback(''))
    ]
        .map(entry => entry.split('>').filter(data=>data).map(data=>`${data}>`)).flat().map(entry=> entry.split(' ')).flat( )));
    const filteredTokens = [ ...tokens.filter(token=>token), '<body>', '</body>']
    await fs.writeFile(`./dataset/tokens.json`, JSON.stringify(filteredTokens));
};


(async ()=>{await main()})();
