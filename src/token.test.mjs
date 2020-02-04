import * as chai from 'chai';
import {generateTokens, getAllTags} from './token.mjs';
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

  it('generateTokens generates list of all posible html tags', () => {
    const tokensConfiguration = {
      div: [
        {'a': ['b', 'c']},
        {'d': ['e', 'g', 'h']},
        {'j': ['k', 'l']},
      ],
    };
    const expectedResults = [
      'a:b;',
      'a:c;',
      'a:b; d:e;',
      'a:b; d:g;',
      'a:b; d:h;',
      'a:c; d:e;',
      'a:c; d:g;',
      'a:c; d:h;',
      'a:b; d:e; j:k',
      'a:b; d:e; j:l',
      'a:b; d:g; j:k',
      'a:b; d:g; j:l',
      'a:b; d:h; j:k',
      'a:b; d:h; j:l',
      'a:c; d:e; j:k',
      'a:c; d:e; j:l',
      'a:c; d:g; j:k',
      'a:c; d:g; j:l',
      'a:c; d:h; j:k',
      'a:c; d:h; j:l',
      'd:e;',
      'd:g;',
      'd:h;',
      'd:e; j:k',
      'd:g; j:k',
      'd:h; j:k',
      'd:e; j:l',
      'd:g; j:l;',
      'd:h; j:l',
      'j:k',
      'j:l',
    ].sort((a, b) => a.length - b.length);

    const result = getAllTags(generateTokens(tokensConfiguration))
        .sort((a, b) => a.length - b.length);

    assert.sameMembers(result, expectedResults, 'sameMember');
  });
});
