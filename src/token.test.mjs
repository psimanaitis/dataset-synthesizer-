import * as assert from 'assert';
import { generateTokens } from './token.mjs';

const sameElements = (first, second) => first.every((item)=> second.includes(item)) && second.every((item)=> first.includes(item));

describe('token', () => {
  it('should generate tokens from given tree', () => {
    const tokensConfiguration = { div:  [{ display: ['flex'], 'flex-direction': ['row', 'collumn'] }] };
    const expectedResults = [
      `<div style="`,
      `display:flex;`,
      `flex-direction:row;`,
      `flex-direction:collumn;`,
      `</div>`
    ];

 
    const result = generateTokens(tokensConfiguration);

    assert.equal(sameElements(result, expectedResults), true);
  });
});
