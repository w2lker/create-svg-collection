const fs = require('fs');
const svgStore = require('svgstore');
const utils = require('./utils');
const enumCreator = require('./enumCreator');

function compose(sourceFolder, outputFile, enumFile, tempFile) {
    const files = fs.readdirSync(sourceFolder);

    let sprites = svgStore();
    let collection = {};

    const filesUpdate = files.map( (file) => {
        const name = file.replace('.svg', '');
        const sourceContent = fs.readFileSync(`${sourceFolder}/${file}`, 'utf8');
        const cleanedContent = utils.cleanup(sourceContent);
        sprites.add(name, cleanedContent);
        const collectedKey = utils.kebabToCame(name).replace("Icon", "");
        collection[collectedKey] = name;
    });
    fs.writeFileSync(outputFile, sprites);
    if (tempFile) {
        fs.writeFileSync(tempFile, sprites);
    }
    enumCreator.write(collection, enumFile);

    return collection;
}

module.exports = compose;
