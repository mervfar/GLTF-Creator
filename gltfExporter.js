#!/usr/bin/env node
const fs = require('fs');
const obj2gltf = require('obj2gltf');
var options = {};
var folders = new Array();

if (process.argv.length <= 2) {
    console.log("Usage:\n\n \t user@local$: makeGltf <.path/to/OBJFiles.> --metallicRoughness true|false\n\nOption: metallicRoughness Boolean true|false \nNote:It will automatically create a folder /gltfFiles for output files.\n");
    process.exit(-1);
}
var roughnessOption = process.argv.indexOf("--metallicRoughness");
if (process.argv[roughnessOption + 1] == "true") {
    options = {
        metallicRoughness: true
    }
}
var path = process.argv[2];
//var path = "./gltf/";

var outputFolder = './gltfFiles/';

if (!fs.existsSync(outputFolder)) {
    fs.mkdirSync(outputFolder);
}
fs.readdirSync(path).forEach(file => {
    folders.push(file)
});

folders.forEach(x => {

    fs.readdirSync(path + x).forEach(y => {
        if (y.split(".").pop() == "obj") {
            obj2gltf(path + x + "/" + y, options)
                .then(function (gltf) {
                    const data = Buffer.from(JSON.stringify(gltf));
                    console.log(y + "=>> making gltf conversion");
                    fs.writeFileSync(outputFolder + y.split(".")[0] + '.gltf', data);
                });
        }
    })

})
