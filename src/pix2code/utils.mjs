import randomWords from "random-words";

export const containsEachKey = (config) => (item) =>
    Object.keys(config)
        .map((key) => config[key].map((subKey) => Object.keys(subKey)).flat())
        .flat()
        .reduce((acc, currentStyleName) => acc && item(' ').includes(`${currentStyleName}:`), true);
const upper = lower => lower.replace(/^\w/, c => c.toUpperCase());
export const commonText = (max = 3) => `${upper(randomWords({min: 1, max, maxLength: 5, join: ' '}))} `;