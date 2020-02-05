import {generateTokens} from './token.mjs';
import {htmlFilesToImages} from './html2png.mjs';

(async () => {
  await htmlFilesToImages('./bin/html', './bin/images');
})();

console.log(generateTokens({
  div: [{'display': ['flex'], 'flex-direction': ['row', 'collumn']}],
}));


