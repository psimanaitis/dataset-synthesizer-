import {htmlFilesToImages} from './html2png.mjs';

(async () => {
  await htmlFilesToImages('./bin/html', './bin/images');
})();


