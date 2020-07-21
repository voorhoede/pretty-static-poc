// naive revisioning script, needs to cover exceptions like in 
// https://github.com/voorhoede/front-end-tooling-recipes/blob/master/revision-static-assets/scripts/revision.js
const fse = require('fs-extra');
const glob = require('fast-glob');
const path = require('path');
const revisionHash = require('rev-hash');

const assetsDir = path.join(__dirname, '../dist/assets/');
const assetsFile = filename => path.join(assetsDir, filename);
const revPattern = /.*\.[0-9a-f]{10}\..*/
const revManifestFilename = 'rev-manifest.json';

async function getFilenames() {
    const filenames = await glob(`**/*`, { cwd: assetsDir });
    return filenames
        .filter(filename => !revPattern.test(filename))
        .filter(filename => filename !== revManifestFilename);
}

async function revisionAsset(filename) {
    const contents = await fse.readFile(assetsFile(filename), 'utf8');
    const hash = revisionHash(contents);
    const extension = path.extname(filename);
    const revisedFilename = filename.replace(new RegExp(`${extension}$`), `.${hash}${extension}`);
    await fse.copyFile(assetsFile(filename), assetsFile(revisedFilename));
    console.log(`✓ ${filename} → ${revisedFilename}`);
    return { filename, revisedFilename };
}

async function saveRevManifest(revisions) {
    const revManifest = revisions.reduce((out, { filename, revisedFilename }) => ({ 
        ...out, 
        [filename]: revisedFilename
    }), {});
    await fse.outputJson(assetsFile(revManifestFilename), revManifest, { spaces: 2 });
    console.log(`✓ Saved ${revManifestFilename}`);
    return revManifest;
}

async function revisionAssets() {
    const filenames = await getFilenames();
    const revisions = await Promise.all(filenames.map(revisionAsset));
    return saveRevManifest(revisions);
}

revisionAssets();