import * as assert from 'assert';
import {generateTokens, getAllTags} from './token.mjs';
import 'mjs-mocha';

const sameElements = (first, second) => first.every((item) => second.includes(item)) && second.every((item) => first.includes(item));

describe('token', () => {
  it('generateTokens generates list of all posible tokens', () => {
    const tokensConfiguration = {
      div: [{'display': ['flex'], 'flex-direction': ['row', 'collumn']}],
    };
    const expectedResults = [
      '">',
      '<div style="',
      'display:flex;',
      'flex-direction:row;',
      'flex-direction:collumn;',
      '</div>',
    ];

    const result = generateTokens(tokensConfiguration);

    assert.equal(sameElements(result, expectedResults), true);
  });

  it('generateTokens generates list of all posible html tags', () => {
    const tokensConfiguration = {
      div: [{'display': ['flex', 'inline-flex'], 'flex-direction': ['row', 'collumn', 'reverse-row']}],
    };
    const expectedResults = [
      '<div style="display:flex; flex-direction:row;"></div>',
      '<div style="display:flex; flex-direction:collumn;"></div>',
      '<div style="display:flex; flex-direction:reverse-row;"></div>',
      '<div style="display:inline-flex; flex-direction:row;"></div>',
      '<div style="display:inline-flex; flex-direction:collumn;"></div>',
      '<div style="display:inline-flex; flex-direction:reverse-row;"></div>',
    ];

    const result = getAllTags(generateTokens(tokensConfiguration)).map((item)=>item(''));

    assert.equal(sameElements(result, expectedResults), true);
  });
});
