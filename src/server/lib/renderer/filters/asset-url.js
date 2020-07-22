// based on https://github.com/voorhoede/performance-masterclass-2017-10/blob/cf1fc6/lib/rev-filename.js#L6
const fs = require('fs');
const path = require('path');

const rootDir = path.join(__dirname, '../../../../../');
const inputDir = path.join(rootDir, 'dist/assets/');
const outputDir = path.join(rootDir, 'dist/_pretty/assets/');;
const revManifestFilename = path.join('dist/_pretty/rev-manifest.json');

function assetUrl(filename) {
    filename = filename.startsWith('/') ? filename.substr(1) : filename;

    const revManifestFile = fs.statSync(revManifestFilename);
    if (!revManifestFile.isFile()) {
        return `/assets/${filename}`;
    }
    const revManifest = JSON.parse(fs.readFileSync(revManifestFilename, 'utf8'));

    if (revManifest.hasOwnProperty(filename)) {
        const revUrl = revManifest[filename];
        revFile = fs.statSync(path.join(outputDir, revUrl));
        if (revFile.isFile()) {
            if (!fs.existsSync(path.join(inputDir, filename))) {
                return `/_pretty/assets/${revUrl}`;
            }
            const originalFile = fs.statSync(path.join(inputDir, filename));
            if (!originalFile.isFile() || revFile.mtime.getTime() > originalFile.mtime.getTime()) {
                return `/_pretty/assets/${revUrl}`;
            }
        }
    }
    return `/assets/${filename}`;
}

module.exports = assetUrl;