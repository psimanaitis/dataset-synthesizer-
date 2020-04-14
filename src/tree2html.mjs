export const generateContent = ({contentFn, children}) =>{
    if(!children) {
        return contentFn();
    }
    return contentFn(children.map(generateContent).join(''));
};
