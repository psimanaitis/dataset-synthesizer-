import {getStandarBlock, randomButton} from "./element.mjs";
import {getAllTagsReworked} from "../token.mjs";
import {commonText, containsEachKey} from "./utils.mjs";

const uno = row => [
    {div: [{...getStandarBlock(row), 'grid-column': ['1/5']}]},
];
const dos = row => [
    {div: [{...getStandarBlock(row), 'grid-column': ['1/3']}]},
    {div: [{...getStandarBlock(row), 'grid-column': ['3/5']}]},
];
const cuatro = row => [
    {div: [{...getStandarBlock(row)}]},
    {div: [{...getStandarBlock(row)}]},
    {div: [{...getStandarBlock(row)}]},
    {div: [{...getStandarBlock(row)}]},
];
//38
export const combinations = [
    [uno],
    [dos],
    [cuatro],
    [uno, uno],
    [dos, uno],
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
export const getCombinationChildren = (contentStrong, contentSpan, contentButton) => (row, rowIndex) =>
    row(rowIndex).map(
        config => ({
            contentFn: getAllTagsReworked(config).filter(containsEachKey(config))[0],
            children: [
                {contentFn: contentStrong[0], children: [{contentFn: commonText}]},
                {contentFn: contentSpan[0], children: [{contentFn: () => commonText(7)}]},
                {contentFn: contentButton[randomButton()], children: [{contentFn: commonText}]},
            ]
        })
    ).flat();