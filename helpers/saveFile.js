const fs = require('fs');
const file = './db/data.json';

const saveFile = (data) => {
    fs.writeFileSync(file, JSON.stringify(data));
}

const readFile = (data) => {
    if (!fs.existsSync(file)){
        return null;
    } 
    return JSON.parse(fs.readFileSync(file, JSON.stringify(data), {encoding: 'utf-8'}));
}

module.exports = {
    saveFile,
    readFile
};