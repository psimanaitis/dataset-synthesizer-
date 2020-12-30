import {getAllTagsReworked} from './token.mjs';
import {generateContent} from "./tree2html.mjs";
import {promises as fs} from 'fs';
import {
    contentButtonConfig,
    contentSpanConfig,
    contentStrongConfig,
    generetatePixCodeElements,
    getHeaderButtons,
    getStandarBlock,
    headerContainerConfig,
    headerElementActive,
    headerElementInactive
} from "./pix2code/element.mjs";
import {combinations, getCombinationChildren} from "./pix2code/combinations.mjs";
import {commonText, containsEachKey} from "./pix2code/utils.mjs";


const main = async () => {
    const { headerContainer, headerElements, contentContainer, contentButton, contentStrong, contentSpan } = generetatePixCodeElements();

    const headers = getHeaderButtons(headerElements).map(headerButtons=>({
        contentFn: headerContainer[0], children:  headerButtons.map(buttonFn => ({contentFn: buttonFn, children: [{contentFn: commonText}]}))
    }));

    await fs.mkdir('./dataset/html/', { recursive: true });


    //why 48 ?
    for await (let i of [ ...Array(48).keys() ]){
        for await (let [index, combination] of combinations.entries()){
            const givenTree = {
                contentFn: content => `<body> ${content} </body>`,
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
            const html = generateContent(givenTree);
            try {
                await fs.writeFile(`./dataset/html/${i}-${index}.html`, html);
                console.info(`Successfully written ${i}-${index}`);
            } catch (error){
                console.error(error);
            }
        }

    }

    const tokens = Array.from(new Set([
        ...getAllTagsReworked(headerContainerConfig).filter(containsEachKey(headerContainerConfig)).map((callback) => callback('')),
        ...getAllTagsReworked(headerElementActive).filter(containsEachKey(headerElementActive)).map((callback) => callback('')),
        ...getAllTagsReworked(headerElementInactive).filter(containsEachKey(headerElementInactive)).map((callback) => callback('')),
        ...getAllTagsReworked(contentButtonConfig).filter(containsEachKey(contentButtonConfig)).map((callback) => callback('')),
        ...getAllTagsReworked(contentStrongConfig).filter(containsEachKey(contentStrongConfig)).map((callback) => callback('')),
        ...getAllTagsReworked(contentSpanConfig).filter(containsEachKey(contentSpanConfig)).map((callback) => callback('')),
        ...getAllTagsReworked({div: [{...getStandarBlock(1), 'grid-column' : ['1/3']}]}).filter(containsEachKey({div: [{...getStandarBlock(1), 'grid-column' : ['1/3']}]})).map((callback) => callback('')),
        ...getAllTagsReworked({div: [{...getStandarBlock(2), 'grid-column' : ['1/3']}]}).filter(containsEachKey({div: [{...getStandarBlock(2), 'grid-column' : ['1/3']}]})).map((callback) => callback('')),
        ...getAllTagsReworked({div: [{...getStandarBlock(2), 'grid-column' : ['3/5']}]}).filter(containsEachKey({div: [{...getStandarBlock(2), 'grid-column' : ['3/5']}]})).map((callback) => callback('')),
        ...getAllTagsReworked({div: [{...getStandarBlock(3), 'grid-column' : ['1/3']}]}).filter(containsEachKey({div: [{...getStandarBlock(3), 'grid-column' : ['1/3']}]})).map((callback) => callback('')),
        ...getAllTagsReworked({div: [{...getStandarBlock(3), 'grid-column' : ['3/5']}]}).filter(containsEachKey({div: [{...getStandarBlock(3), 'grid-column' : ['3/5']}]})).map((callback) => callback('')),
        ...getAllTagsReworked({div: [{...getStandarBlock(2)}]}).filter(containsEachKey({div: [{...getStandarBlock(2)}]})).map((callback) => callback('')),
        ...getAllTagsReworked({div: [{...getStandarBlock(3)}]}).filter(containsEachKey({div: [{...getStandarBlock(3)}]})).map((callback) => callback(''))
    ]
        .map(entry => entry.split('>').filter(data=>data).map(data=>`${data}>`)).flat().map(entry=> entry.split(' ')).flat( )));

    await fs.writeFile(`./dataset/tokens.json`, JSON.stringify(tokens));
};


(async ()=>{await main()})();
