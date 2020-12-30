import bigCartesian from 'big-cartesian';

export const generateTokens = (tokens) =>
  Object.keys(tokens).reduce((acc, key) => {
    acc.push(`<${key} style=" `);
    tokens[key].forEach((item) => {
      const styleNames = Object.keys(item);
      const styleValues = styleNames.map((styleName) => item[styleName].map((value) => `${styleName}:${value}; `)).flat();
      acc = [...acc, ...styleValues];
    });
    acc.push(`</${key}>`);
    return acc;
  }, [``]);

export const getAllTagsReworked = (tagsConfig)=> Object.entries(tagsConfig)
    .map((obj)=>({[obj[0]]: obj[1]}))
    .map(generateTokens)
    .map(getAllTags)
    .flat();

const getAllTags = (tokenList)=>{
  const openingTag = tokenList.find((token) => token.match(/<*. style=/));
  const clostingTag = tokenList.find((token) => token.match(/<\//));
  const closingOpeningPart = `">`;
  const uniqueKeys = tokenList
      .filter((item) => item !== openingTag && item !== clostingTag && item !== closingOpeningPart)
      .reduce((acc, item)=>({...acc, [item.split(':')[0]]: [...(acc[item.split(':')[0]] ? acc[item.split(':')[0]] : []), item]}), {});
  if (Object.keys(uniqueKeys).length) {
    return Array.from(new Set([...expandWithAll(Object.values(uniqueKeys))].map((items)=>items.join(' '))))
        .map((stylePart)=> ((content)=>`${openingTag}${stylePart}${closingOpeningPart}${content}${clostingTag}`));
  } else {
    return [(content)=>`${openingTag}${closingOpeningPart}${content}${clostingTag}`];
  }
};

const expandWithAll = (collections)=>{
  if (collections.length === 1) {
    return bigCartesian(collections);
  } else {
    return [
      ...bigCartesian(collections),
      ...expandWithAll(collections.slice(0, collections.length-1)),
      ...expandWithAll(collections.slice(1, collections.length)),
    ];
  }
};
