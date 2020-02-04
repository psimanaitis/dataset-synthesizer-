import bigCartesian from 'big-cartesian';

export const generateTokens = (tokens) => Object.keys(tokens).reduce((acc, key) => {
  acc.push(`<${key} style="`);
  tokens[key].forEach((item) => {
    const styleNames = Object.keys(item);
    const styleValues = styleNames.map((styleName) => item[styleName].map((value) => `${styleName}:${value};`)).flat();
    acc = [...acc, ...styleValues];
  });
  acc.push(`</${key}>`);
  return acc;
}, [`">`]);

export const getAllTags = (tokenList)=>{
  const openingTag = tokenList.find((token) => token.match(/<*. style=/));
  const clostingTag = tokenList.find((token) => token.match(/<\//));
  const closingOpeningPart = `">`;
  const uniqueKeys = tokenList
      .filter((item) => item !== openingTag && item !== clostingTag && item !== closingOpeningPart)
      .reduce((acc, item)=>({...acc, [item.split(':')[0]]: [...(acc[item.split(':')[0]] ? acc[item.split(':')[0]] : []), item]}), {});
  return [...expandWithAll(Object.values(uniqueKeys)).map((items)=>items.join(' '))];
};

// TODO calculate cardesian sums for every unique combinations [a,b] [a, c] [b, c] dont do for [b, a] [c, a] [c,b]
const expandWithAll = (collections)=>{
  if (collections.length === 1) {
    return bigCartesian(collections);
  } else {
    return [
      ...bigCartesian(collections),
      ...expandWithAll(collections.slice(0, collections.length-1)),
    ];
  }
};
