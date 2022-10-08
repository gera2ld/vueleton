import { readFile, writeFile } from 'fs/promises';
import { globby } from 'globby';

async function setVersion(vueVersion, file) {
  let source = await readFile(file, 'utf8');
  let changed = false;
  source = source.replace(/\/\* vue@(\d+) <<([\s\S]*?)>> \*\//g, (_, g1, g2) => {
    changed = true;
    if (g1 !== vueVersion) return '';
    g2 = g2.trim();
    if (g2.startsWith('*/') && g2.endsWith('/*')) g2 = g2.slice(2, -2).trim();
    return g2;
  });
  if (changed) {
    await writeFile(file, source, 'utf8');
    console.info(`Patched ${file} to support vue@${vueVersion}`);
  }
}

async function getVueVersion() {
  if (process.env.VUELETON_VUE_VERSION) return process.env.VUELETON_VUE_VERSION;
  const module = await import('vue');
  const version = module.version ?? module.default.version;
  return version.split('.')[0];
}

async function main() {
  const vueVersion = await getVueVersion();
  const files = await globby(['lib/**'], { onlyFiles: true });
  await Promise.all(files.map(setVersion.bind(null, vueVersion)));
}

main();
