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

  return expandWithAll(Object.values(uniqueKeys), (data)=>data, (data)=>data)
      .map((stylePart)=> ((content)=>`${stylePart}`));
      // .map((stylePart)=> ((content)=>`${openingTag}${stylePart}${closingOpeningPart}${content}${clostingTag}`));
};

const expandWithAll = (collections, content, initialContent)=>{
  if (collections.length === 1) {
    return [
      ...collections[0].map(content),
      ...collections[0].map(initialContent),
    ];
  } else {
    return collections[0].map((item)=>
      [
        ...expandWithAll(collections.slice(1, collections.length), (data)=>
          content(`${item} ${data}`)
        , (data)=>`${item} ${data}`),
        initialContent(item),
      ]

    ).flat();
  }
};
