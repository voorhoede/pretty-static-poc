// based on https://github.com/voorhoede/performance-masterclass-2017-10/blob/cf1fc6/lib/rev-filename.js#L6
const fs = require('fs');
const path = require('path');

const assetsDir = path.join(__dirname, '../../../dist/assets/');
const inputDir = assetsDir;
const outputDir = inputDir;
const revManifestFilename = 'rev-manifest.json';

function assetUrl(filename) {
    filename = filename.startsWith('/') ? filename.substr(1) : filename;

    const revManifestFile = fs.statSync(path.join(assetsDir, revManifestFilename));
    if (!revManifestFile.isFile()) {
        return `/assets/${filename}`;
    }
    const revManifest = JSON.parse(fs.readFileSync(path.join(assetsDir, revManifestFilename), 'utf8'));

    if (revManifest.hasOwnProperty(filename)) {
        const revUrl = revManifest[filename];
        revFile = fs.statSync(path.join(outputDir, revUrl));
        if (revFile.isFile()) {
            if (!fs.existsSync(path.join(inputDir, filename))) {
                return `/assets/${revUrl}`;
            }
            const originalFile = fs.statSync(path.join(inputDir, filename));
            if (!originalFile.isFile() || revFile.mtime.getTime() > originalFile.mtime.getTime()) {
                return `/assets/${revUrl}`;
            }
        }
    }
    return `/assets/${filename}`;
}

module.exports = assetUrl;