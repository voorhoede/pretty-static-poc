// naive revisioning script, needs to cover exceptions like in 
// https://github.com/voorhoede/front-end-tooling-recipes/blob/master/revision-static-assets/scripts/revision.js
const fse = require('fs-extra');
const glob = require('fast-glob');
const path = require('path');
const revisionHash = require('rev-hash');

const rootDir = path.join(__dirname, '../');
const inputDir = path.join(rootDir, 'dist/assets/');
const outputDir = path.join(rootDir, 'dist/_pretty/assets/');
// const revPattern = /.*\.[0-9a-f]{10}\..*/
const revManifestFilename = path.join(rootDir, 'dist/_pretty/rev-manifest.json');

async function getFilenames() {
    return glob(`**/*`, { cwd: inputDir });
}

async function revisionAsset(filename) {
    const contents = await fse.readFile(path.join(inputDir, filename), 'utf8');
    const hash = revisionHash(contents);
    const extension = path.extname(filename);
    const revisedFilename = filename.replace(new RegExp(`${extension}$`), `.${hash}${extension}`);
    await fse.copyFile(path.join(inputDir, filename), path.join(outputDir, revisedFilename));
    console.log(`✓ Copied ${filename} → ${revisedFilename}`);
    return { filename, revisedFilename };
}

async function saveRevManifest(revisions) {
    const revManifest = revisions.reduce((out, { filename, revisedFilename }) => ({ 
        ...out, 
        [filename]: revisedFilename
    }), {});
    await fse.outputJson(revManifestFilename, revManifest, { spaces: 2 });
    console.log(`✓ Saved ${path.relative(rootDir, revManifestFilename)}`);
    return revManifest;
}

async function revisionAssets() {
    await fse.ensureDir(outputDir);
    const filenames = await getFilenames();
    const revisions = await Promise.all(filenames.map(revisionAsset));
    return saveRevManifest(revisions);
}

revisionAssets();