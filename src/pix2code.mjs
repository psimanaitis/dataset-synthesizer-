import {getAllTagsReworked} from './token.mjs';

const headerContainer = {
  header: [
    {'display': ['flex']},
    {'flex-direction': ['row']},
  ],
};

const headerElement = {
  button: [
    {'background': ['#333333', '#2f79b9']},
    {'color': ['#2f79b9', '#ffffff']},
    {'margin': ['5px']},
    {'padding': ['0 20px']},
    {'align-self': ['baseline']},
    {'border-radius': ['4px']},
    {'height': ['36px']},
    {'border': ['none']},
  ],
};

const standardBlock = {
  div: [
    {
      'background-color': ['#f5f5f5'],
      'border-radius': ['4px'],
      'padding': ['5px'],
      'display': ['flex'],
      'flex-direction': ['column'],
      'justify-content': ['space-around'],
    }],
};

const blockContentConfig = {
  strong: [],
  span: [],
  button: [{
    'color': ['white'],
    'background': ['#4dab4c'],
    'padding': ['0 20px'],
    'align-self': ['baseline'],
    'border-radius': ['4px'],
    'height': ['36px'],
    'border': ['none'],
  }],
};

const contentContainer = {
  main: [
    {
      'display': ['grid'],
      'grid-template-columns': ['repeat(1, 1fr)', 'repeat(2, 1fr)', 'repeat(4, 1fr)'],
      'gap': ['10px'],
      'grid-template-rows': ['repeat(1, 120px)', 'repeat(2, 120px)', 'repeat(3, 120px)'],
    }],
};

const containsEachKey = (config) => (item) =>
  Object.keys(config)
      .map((key) => config[key].map((subKey) => Object.keys(subKey)).flat())
      .flat()
      .reduce((acc, currentStyleName) => acc && item(' ').includes(`${currentStyleName}:`), true);

const generetatePixCodeElements = () => ({
  headerContainer: getAllTagsReworked(headerContainer).filter(containsEachKey(headerContainer)),
  headerElements: getAllTagsReworked(headerElement).filter(containsEachKey(headerElement)),
  contentContainer: getAllTagsReworked(contentContainer).filter(containsEachKey(contentContainer)),
  standardBlock: getAllTagsReworked(standardBlock).filter(containsEachKey(standardBlock)),
  blockContent: getAllTagsReworked(blockContentConfig).filter(containsEachKey(blockContentConfig)),
});

const main = () => {
  const {headerContainer, headerElements, contentContainer, standardBlock, blockContent} = generetatePixCodeElements();
};

main();
