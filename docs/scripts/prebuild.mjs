import { readFile, writeFile } from 'fs/promises';
import { globby } from 'globby';
import { marked } from 'marked';

async function main() {
  const mds = await globby('components/**/*.md');
  for (const md of mds) {
    const source = await readFile(md, 'utf8');
    const html = marked(source);
    await writeFile(`${md}.js`, `export default ${JSON.stringify(html)};`, 'utf8');
  }
}

main().catch(err => {
  console.error(err);
  process.exitCode = 1;
});
