import {getAllTagsReworked} from "../token.mjs";
import {containsEachKey} from "./utils.mjs";

export const headerContainerConfig = {
    header: [
        {'display': ['flex']},
        {'flex-direction': ['row']},
    ],
};
export const headerElementActive = {
    button: [
        {'background': ['#2f79b9']},
        {'color': ['#ffffff']},
        {'margin': ['5px']},
        {'padding-right': ['20px']},
        {'padding-left': ['20px']},
        {'align-self': ['baseline']},
        {'border-radius': ['4px']},
        {'height': ['36px']},
        {'border': ['none']},
    ],
};
export const headerElementInactive = {
    button: [
        {'background': ['#333333']},
        {'color': ['#2f79b9']},
        {'margin': ['5px']},
        {'padding': ['0 20px']},
        {'align-self': ['baseline']},
        {'border-radius': ['4px']},
        {'height': ['36px']},
        {'border': ['none']},
    ],
};
//box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.2), 0 1px 2px rgba(0, 0, 0, 0.05);
//background-image: linear-gradient(to bottom,#f3ba61,#ed9400);
export const contentButtonConfig = {
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
export const contentStrongConfig = {
    strong: [{'margin': ['5px']}],
};
export const contentSpanConfig = {
    span: [{'margin': ['5px']}],
};
export const contentContainerConfig = {
    div: [
        {
            'display': ['grid'],
            'grid-template-columns': ['repeat(4,1fr)'],
            'gap': ['10px'],
            'grid-template-rows': ['repeat(3,120px)'],
        }],
};
export const getStandarBlock = row => ({
    'background-color': ['#f5f5f5'],
    'grid-row': [row],
    'border-radius': ['4px'],
    'padding': ['5px'],
    'display': ['flex'],
    'flex-direction': ['column'],
    'justify-content': ['space-around'],
});
export const randomButton = () => Math.floor(Math.random() * 3);//Hardcoded stuff that makes people go to hell
export const getHeaderButtons = ([activeButton, inActiveButton]) => [
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
export const generetatePixCodeElements = () => ({
    headerContainer: getAllTagsReworked(headerContainerConfig).filter(containsEachKey(headerContainerConfig)),
    headerElements: [...getAllTagsReworked(headerElementActive).filter(containsEachKey(headerElementActive)), ...getAllTagsReworked(headerElementInactive).filter(containsEachKey(headerElementInactive))],
    contentContainer: getAllTagsReworked(contentContainerConfig).filter(containsEachKey(contentContainerConfig)),
    contentButton: getAllTagsReworked(contentButtonConfig).filter(containsEachKey(contentButtonConfig)),
    contentStrong: getAllTagsReworked(contentStrongConfig).filter(containsEachKey(contentStrongConfig)),
    contentSpan: getAllTagsReworked(contentSpanConfig).filter(containsEachKey(contentSpanConfig)),
});