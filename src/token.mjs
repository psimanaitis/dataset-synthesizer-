export const generateTokens = (tokens) => Object.keys(tokens).reduce((acc, key) => {
  acc.push(`<${key} style="`);
  acc.push(`</${key}>`);
  tokens[key].forEach((item) => {
    const styleNames = Object.keys(item);
    const styleValues = styleNames.map((styleName) => item[styleName].map((value) => `${styleName}:${value};`)).flat();
    acc = [...acc, ...styleValues];
  });
  return acc;
}, []);
