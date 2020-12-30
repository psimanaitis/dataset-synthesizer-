import {getAllTagsReworked} from './token.mjs';
import randomWords from 'random-words';
import {generateContent} from "./tree2html.mjs";
import { promises as fs } from 'fs';

const headerContainerConfig = {
    header: [
        { 'display': ['flex'] },
        { 'flex-direction': ['row'] },
    ],
};

const headerElementActive = {
    button: [
        { 'background': ['#2f79b9'] },
        { 'color': ['#ffffff'] },
        { 'margin': ['5px'] },
        { 'padding-right': ['20px'] },
        { 'padding-left': ['20px'] },
        { 'align-self': ['baseline'] },
        { 'border-radius': ['4px'] },
        { 'height': ['36px'] },
        { 'border': ['none'] },
    ],
};


const headerElementInactive = {
    button: [
        { 'background': ['#333333'] },
        { 'color': ['#2f79b9'] },
        { 'margin': ['5px'] },
        { 'padding': ['0 20px'] },
        { 'align-self': ['baseline'] },
        { 'border-radius': ['4px'] },
        { 'height': ['36px'] },
        { 'border': ['none'] },
    ],
};

//box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.2), 0 1px 2px rgba(0, 0, 0, 0.05);
//background-image: linear-gradient(to bottom,#f3ba61,#ed9400);
const contentButtonConfig = {
    button: [{
        'color': ['white'],
        'background-image': ['linear-gradient(#ee5f5b,#bd362f)', 'linear-gradient(#fbb450,#f89406)', 'linear-gradient(#62c462,#51a351)'],
        'padding-right': ['20px'],
         'padding-left': ['20px'],
        'align-self': ['baseline'],
        'border-radius': ['4px'],
        'border-color': ['rgba(0,0,0,0.25)'],
        'border-style': ['solid'],
        'border-width': ['1px'],
        'height': ['36px'],
    }],
};
const contentStrongConfig = {
    strong: [{'margin': ['5px']}],
};

const contentSpanConfig = {
    span: [{'margin': ['5px']}],
};

const contentContainerConfig = {
    div: [
        {
            'display': ['grid'],
            'grid-template-columns': ['repeat(4,1fr)'],
            'gap': ['10px'],
            'grid-template-rows': ['repeat(3,120px)'],
        }],
};

const containsEachKey = (config) => (item) =>
    Object.keys(config)
        .map((key) => config[key].map((subKey) => Object.keys(subKey)).flat())
        .flat()
        .reduce((acc, currentStyleName) => acc && item(' ').includes(`${currentStyleName}:`), true);

const generetatePixCodeElements = () => ({
    headerContainer: getAllTagsReworked(headerContainerConfig).filter(containsEachKey(headerContainerConfig)),
    headerElements: [...getAllTagsReworked(headerElementActive).filter(containsEachKey(headerElementActive)), ...getAllTagsReworked(headerElementInactive).filter(containsEachKey(headerElementInactive))],
    contentContainer: getAllTagsReworked(contentContainerConfig).filter(containsEachKey(contentContainerConfig)),
    contentButton: getAllTagsReworked(contentButtonConfig).filter(containsEachKey(contentButtonConfig)),
    contentStrong: getAllTagsReworked(contentStrongConfig).filter(containsEachKey(contentStrongConfig)),
    contentSpan: getAllTagsReworked(contentSpanConfig).filter(containsEachKey(contentSpanConfig)),
});


const upper = lower=>lower.replace(/^\w/, c => c.toUpperCase());
const commonText = (max = 3 ) => upper(randomWords({ min: 1, max, maxLength: 5, join:' ' }));

const getStandarBlock = row =>({
    'background-color': ['#f5f5f5'],
    'grid-row': [row],
    'border-radius': ['4px'],
    'padding': ['5px'],
    'display': ['flex'],
    'flex-direction': ['column'],
    'justify-content': ['space-around'],
});

const uno = row => [
    {div: [{...getStandarBlock(row), 'grid-column' : ['1/5']}]},
];

const dos = row => [
    {div: [{...getStandarBlock(row), 'grid-column' : ['1/3']}]},
    {div: [{...getStandarBlock(row), 'grid-column' : ['3/5']}]},
];

const cuatro = row => [
    {div: [{...getStandarBlock(row)}]},
    {div: [{...getStandarBlock(row)}]},
    {div: [{...getStandarBlock(row)}]},
    {div: [{...getStandarBlock(row)}]},
];

const randomButton = ()=>Math.floor(Math.random() * 3);

const getCombinationChildren = (contentStrong, contentSpan, contentButton) => (row, rowIndex) =>
    row(rowIndex).map(
        config => ({
                contentFn: getAllTagsReworked(config).filter(containsEachKey(config))[0],
                children: [
                    { contentFn: contentStrong[0], children: [{ contentFn: commonText }] },
                    { contentFn: contentSpan[0], children: [{ contentFn: ()=>commonText(7) }] },
                    { contentFn: contentButton[randomButton()], children: [{ contentFn: commonText }] },
                ]
            })
    ).flat();


const main = async () => {
    const { headerContainer, headerElements, contentContainer, contentButton, contentStrong, contentSpan } = generetatePixCodeElements();

    const headers = getHeaderButtons(headerElements).map(headerButtons=>({
        contentFn: headerContainer[0], children:  headerButtons.map(buttonFn => ({contentFn: buttonFn, children: [{contentFn: commonText}]}))
    }));

    await fs.mkdir('./dataset/html/', { recursive: true });
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

//Hardcoded stuff that makes people go to hell
const getHeaderButtons = ([activeButton, inActiveButton]) => [
        [activeButton, inActiveButton],
        [inActiveButton, activeButton],
        [activeButton, inActiveButton, inActiveButton],
        [inActiveButton, activeButton, inActiveButton],
        [inActiveButton, inActiveButton, activeButton],
        [activeButton, inActiveButton, inActiveButton, inActiveButton],
        [inActiveButton, activeButton, inActiveButton, inActiveButton],
        [inActiveButton, inActiveButton, activeButton, inActiveButton],
        [inActiveButton, inActiveButton, inActiveButton, activeButton],
        [activeButton, inActiveButton, inActiveButton, inActiveButton, inActiveButton],
        [inActiveButton, activeButton, inActiveButton, inActiveButton, inActiveButton],
        [inActiveButton, inActiveButton, activeButton, inActiveButton, inActiveButton],
        [inActiveButton, inActiveButton, inActiveButton, activeButton, inActiveButton],
        [inActiveButton, inActiveButton, inActiveButton, inActiveButton, activeButton],
    ];


//38
const combinations = [
    [uno],
    [dos],
    [cuatro],
    [uno,uno],
    [dos,uno],
    [cuatro, uno],
    [uno, dos],
    [dos, dos],
    [cuatro, dos],
    [uno, cuatro],
    [dos, cuatro],
    [cuatro, cuatro],
    [uno, uno, uno],
    [dos, uno, uno],
    [cuatro, uno, uno],
    [uno, dos, uno],
    [dos, dos, uno],
    [cuatro, dos, uno],
    [uno, cuatro, uno],
    [dos, cuatro, uno],
    [cuatro, cuatro, uno],
    [uno, uno, dos],
    [dos, uno, dos],
    [cuatro, uno, dos],
    [uno, dos, dos],
    [dos, dos, dos],
    [cuatro, dos, dos],
    [uno, cuatro, dos],
    [dos, cuatro, dos],
    [cuatro, cuatro, dos],
    [uno, uno, cuatro],
    [dos, uno, cuatro],
    [cuatro, uno, cuatro],
    [uno, dos, cuatro],
    [dos, dos, cuatro],
    [cuatro, dos, cuatro],
    [uno, cuatro, cuatro],
    [dos, cuatro, cuatro],
    [cuatro, cuatro, cuatro],
];

(async ()=>{await main()})();
