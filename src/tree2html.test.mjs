import {generateContent} from "./tree2html.mjs";
import * as chai from "chai";
const {assert} = chai.default;

describe('tree2html', () => {
    it('generate tree from given config', () => {
        const givenTree = {
            contentFn: content => `<body> ${content} </body>`,
            children: [{
                contentFn: content =>`<div> ${content} </div>`,
                children: [
                    {contentFn:  () => 'du'}
                ]
            },
                {
                    contentFn: content =>`<div> ${content} </div>`,
                    children: [
                        {contentFn: () => 'vienas'}
                    ]
                }
            ]
        };
        const expectedResult = `<body> <div> vienas </div><div> du </div> </body>`;

        const result = generateContent(givenTree);
        assert(result).to.equal(expectedResult);
    });
});
