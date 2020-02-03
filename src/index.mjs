import {generateTokens} from './token.mjs';

console.log(generateTokens({
  div: [{'display': ['flex'], 'flex-direction': ['row', 'collumn']}],
}));
