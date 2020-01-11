const fs = require('fs');
const path = require('path');

const sourceFile = process.argv[2];
const destinationFolder = process.argv[3];


const markup = fs.readFileSync(sourceFile).toString();
const lines = markup.split(/\n/g);
const symbols = {};
let currentSymbol = null;

lines.forEach(function(line){
    let open = line.match(/symbol.*?id="(.*?)"/);
    let close = line.match(/<\/symbol>/);
    if(currentSymbol){
        symbols[currentSymbol].push(line);
    }
    if(open){
        currentSymbol = open[1];
        symbols[currentSymbol] = [line];
    }
    if(close){
        symbols[currentSymbol] = symbols[currentSymbol].join('\n').replace('<symbol', '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"').replace('</symbol', '</svg');
        // console.log('-----', currentSymbol);
        // console.log('-----', symbols[currentSymbol]);
        fs.writeFile(path.join(__dirname, destinationFolder, currentSymbol + '.svg'), symbols[currentSymbol], (err) => {
          if (err) throw err;
        });
        currentSymbol = null;
    }
});

//console.log( Object.keys(symbols) );
