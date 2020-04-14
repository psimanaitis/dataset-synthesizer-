import * as chai from 'chai';
import {generateTokens, getAllTagsReworked} from './token.mjs';
import 'mjs-mocha';

const {assert} = chai.default;

describe('token', () => {
  it('generateTokens generates list of all posible tokens', () => {
    const tokensConfiguration = {
      div: [{'display': ['flex']}, {'flex-direction': ['row', 'collumn']}],
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
    assert.sameMembers(result, expectedResults, 'sameMember');
  });

  it('generateTokens generates list of all with single value tokens', () => {
    const tokensConfiguration = {
      strong: [{'margin': ['5px']}],
    };
    const expectedResults = [
      '">',
      '<strong style="',
      'margin:5px;',
      '</strong>',
    ];

    const result = generateTokens(tokensConfiguration);
    assert.sameMembers(result, expectedResults, 'sameMember');
  });

  it('generateTokens generates list of all posible html tags', () => {
    const tokensConfiguration = {
      div: [
        {'a': ['b', 'c']},
        {'d': ['e', 'g', 'h']},
        {'j': ['k', 'l']},
      ],
    };
    const expectedResults = [
      '<div style="a:b;"></div>',
      '<div style="a:c;"></div>',
      '<div style="a:b; d:e;"></div>',
      '<div style="a:b; d:g;"></div>',
      '<div style="a:b; d:h;"></div>',
      '<div style="a:c; d:e;"></div>',
      '<div style="a:c; d:g;"></div>',
      '<div style="a:c; d:h;"></div>',
      '<div style="a:b; d:e; j:k;"></div>',
      '<div style="a:b; d:e; j:l;"></div>',
      '<div style="a:b; d:g; j:k;"></div>',
      '<div style="a:b; d:g; j:l;"></div>',
      '<div style="a:b; d:h; j:k;"></div>',
      '<div style="a:b; d:h; j:l;"></div>',
      '<div style="a:c; d:e; j:k;"></div>',
      '<div style="a:c; d:e; j:l;"></div>',
      '<div style="a:c; d:g; j:k;"></div>',
      '<div style="a:c; d:g; j:l;"></div>',
      '<div style="a:c; d:h; j:k;"></div>',
      '<div style="a:c; d:h; j:l;"></div>',
      '<div style="d:e;"></div>',
      '<div style="d:g;"></div>',
      '<div style="d:h;"></div>',
      '<div style="d:e; j:k;"></div>',
      '<div style="d:g; j:k;"></div>',
      '<div style="d:h; j:k;"></div>',
      '<div style="d:e; j:l;"></div>',
      '<div style="d:g; j:l;"></div>',
      '<div style="d:h; j:l;"></div>',
      '<div style="j:k;"></div>',
      '<div style="j:l;"></div>',
    ];

    const result = getAllTagsReworked(tokensConfiguration)
        .map((callback) => callback(''));

    assert.sameMembers(result, expectedResults, 'sameMember');
  });
});
