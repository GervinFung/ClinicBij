const fs = require('fs');

export const processSingleLineFileData = (name) => {
    const data = fs.readFileSync(`test/ts/${name}/${name}.txt`, {encoding:'utf8', flag:'r'});
    return data.split('\n').map((splitData) => {
        const splitByComma = splitData.split(',');
        return {
            input: splitByComma[0],
            output: splitByComma[1].replace('\r', '')
        };
    });
}

export const processMultilineFileData = (name) => {
    const data = fs.readFileSync(`test/ts/${name}/${name}.txt`, {encoding:'utf8', flag:'r'});
    return data.split('\n').map((splitData) => {
        const splitByComma = splitData.split(',');
        return {
            input: splitByComma[0].split('\\').join('\n').replace('\r', ''),
            output: splitByComma[1].replace('\r', '')
        };
    });
}