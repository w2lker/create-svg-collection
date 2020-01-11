const fs = require('fs');
const path = require('path');
const express = require('express');
const opn = require('opn');
const server = express();

const templatesDirectory = path.join(path.dirname(__filename), 'templates/');
let initiatedServerDirectory = null;

function initiate(serverDirectory) {
    server.use('/', express.static(serverDirectory));
    server.listen(12346);
    fs.readdirSync(templatesDirectory).forEach( (file) => {
        const content = fs.readFileSync(path.join(templatesDirectory, file));
        fs.writeFileSync(path.join(serverDirectory, file), content);
    });
    initiatedServerDirectory = serverDirectory;
    setTimeout(() => {
        // opn('http://localhost:12346');
    }, 2000);
}

function createCollection(collection) {
    if (!initiatedServerDirectory) return;

    const keys = Object.keys(collection);
    const element = (enumName, svgName) => ` 
        <div class="card">
            <svg role="img"><use xlink:href="./collection.svg#${svgName}"/></svg>
            <div class="input-group vertical">
                <label for="${svgName}-enum-input"> Name for Enum element </label>
                <input readonly type="text" id="${svgName}-enum-input" value="IconsPack.${enumName}"/>
            </div>
            <div class="input-group vertical">
                <label for="${svgName}-id-input"> Name for SVG ID </label>
                <input readonly type="text" id="${svgName}-id-input" value="collection.svg#${svgName}"/>
            </div>
            
        </div>
    `;
    const content = keys.reduce( (reducer, enumName) => {
        const svgName = collection[enumName];
        const currentElement = element(enumName, svgName);
        return reducer + '\n' +  currentElement;
    }, '');

    const htmlContent = fs.readFileSync(path.join(templatesDirectory, 'index.html'), {encoding: 'UTF8'});
    const modifiedHtml = htmlContent.replace('{%REPLACE_ME%}', content);
    fs.writeFileSync(path.join(initiatedServerDirectory, 'index.html'), modifiedHtml);
}

module.exports = {
    initiate,
    createCollection,
};
