const fs = require('fs');

function create(collection) {
    const enumHead = 'export enum IconsCollection\n{\n';
    let enumBody = '';
    const enumTail = '}\n';
    Object.keys(collection)
        .map(function (element) {
            enumBody += `    ${element} = "${collection[element]}",\n`;
        });

    return enumHead + enumBody + enumTail;
}
function write(collection, destination) {
    const result = create(collection);
    fs.writeFile(destination, result, function (error) {
        if (error) throw error;
    });
}

module.exports = {
    create,
    write,
};
