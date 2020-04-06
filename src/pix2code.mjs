import {getAllTagsReworked} from './token.mjs';
import randomWords from 'random-words';

const headerContainer = {
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
        { 'padding': ['0 20px'] },
        { 'align-self': ['baseline'] },
        { 'border-radius': ['4px'] },
        { 'height': ['36px'] },
        { 'border': ['none'] },
    ],
};


const headerElementActiveInactive = {
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


const standardBlock = {
    div: [
        {
            'background-color': ['#f5f5f5'],
            'border-radius': ['4px'],
            'padding': ['5px'],
            'display': ['flex'],
            'flex-direction': ['column'],
            'justify-content': ['space-around'],
        }],
};

const blockContentConfig = {
    strong: [],
    span: [],
    button: [{
        'color': ['white'],
        'background': ['#4dab4c', '#f0a223', '#cf3f37'],
        'padding': ['0 20px'],
        'align-self': ['baseline'],
        'border-radius': ['4px'],
        'height': ['36px'],
        'border': ['none'],
    }],
};

const contentContainer = {
    main: [
        {
            'display': ['grid'],
            'grid-template-columns': ['repeat(1, 1fr)', 'repeat(2, 1fr)', 'repeat(4, 1fr)'],
            'gap': ['10px'],
            'grid-template-rows': ['repeat(1, 120px)', 'repeat(2, 120px)', 'repeat(3, 120px)'],
        }],
};

const containsEachKey = (config) => (item) =>
    Object.keys(config)
        .map((key) => config[key].map((subKey) => Object.keys(subKey)).flat())
        .flat()
        .reduce((acc, currentStyleName) => acc && item(' ').includes(`${currentStyleName}:`), true);

const generetatePixCodeElements = () => ({
    headerContainer: getAllTagsReworked(headerContainer).filter(containsEachKey(headerContainer)),
    headerElements: [...getAllTagsReworked(headerElementActive).filter(containsEachKey(headerElementActive)), ...getAllTagsReworked(headerElementActiveInactive).filter(containsEachKey(headerElementActiveInactive))],
    contentContainer: getAllTagsReworked(contentContainer).filter(containsEachKey(contentContainer)),
    standardBlock: getAllTagsReworked(standardBlock).filter(containsEachKey(standardBlock)),
    blockContent: getAllTagsReworked(blockContentConfig).filter(containsEachKey(blockContentConfig)),
});

const main = () => {
    const { headerContainer, headerElements, contentContainer, standardBlock, blockContent } = generetatePixCodeElements();
    console.log(getHeaderContent(headerContainer, headerElements));
};

//Hardcoded stuff that makes people go to hell
const getHeaderContent = (headerContainer, headerElements) =>{
    const activeButton = headerElements[0];
    const inActiveButton = headerElements[1];
    const headerContent = [
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

    return headerContent
        .map(headerItems =>
            headerContainer.map(content => content(
                headerItems.map(buttonFn =>
                    buttonFn(randomWords({ min: 1, max: 3, maxLength: 5, join:' ' }))
                ).join('')
            ))
        );
};

main();
