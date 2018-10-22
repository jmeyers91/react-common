const path = require('path');
const { readdir, writeFile } = require('then-fs');

async function main() {
  const srcDir = path.join(__dirname, 'src');
  const indexPath = path.join(srcDir, 'index.js');
  const componentFiles = await readdir(srcDir);
  const componentNames = componentFiles.map(file => file.replace(/\.js$/, ''));

  const indexSrc = [
    ...componentNames.map(name => `import _${name} from './${name}';`),
    '',
    ...componentNames.map(name => `export const ${name} = _${name};`),
  ].join('\n');

  await writeFile(indexPath, indexSrc);
}

main();
