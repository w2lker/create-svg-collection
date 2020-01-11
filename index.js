const fs = require('fs');
const path = require('path');
const chokidar = require('chokidar');
const tmp = require('tmp');

const compose = require('./compose');
const server = require('./server');

// Importing args
const sourceFolder = process.argv[2];
const outputFile = process.argv[3];
const enumFile = process.argv[4];

// Setting up
const tempDir = tmp.dirSync();
const composer = () => compose(sourceFolder, outputFile, enumFile, `${tempDir.name}/collection.svg`);
const watcher = chokidar.watch(sourceFolder, {
    awaitWriteFinish: true,
    ignoreInitial: true
});


// Starting
server.initiate(tempDir.name);
const collection = composer();
server.createCollection(collection);
//Watching
watcher
    .on("add", function (path) {
        composer();
    })
    .on("change", function (path) {
        composer();
    })
    .on("unlink", function (path) {
        composer();
    })
    .on("error", function (error) {
        if (error) throw error;
    });
