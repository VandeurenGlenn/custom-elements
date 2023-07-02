import nodeResolve from "@rollup/plugin-node-resolve";
import typescript from "@rollup/plugin-typescript";
import { cp, readFile, writeFile } from "fs/promises";
import { globby } from 'globby'
import { parse } from "path";
import { rimraf } from "rimraf";

const input = await globby('src/**/*.ts')

const onlyUsedVariables = () => ({
  name: 'rollup-plugin-only-used-variables',
  writeBundle: async (options, bundle) => {
    const packageExports = {
      '.': {
        import: './exports/custom-elements.js',
        types: './exports/custom-elements.d.ts'
      }
    }
    const glob = await globby('exports/**/*.d.ts')
    
    for (const path of glob) {
      const parsed = parse(path)
      const name = `./${parsed.name.replace('.d', '')}.js`
      packageExports[name] = {
        import: `./${path.replace('.d.ts', '.js')}`,
        types: `./${path}`
      }
    }

    const packageJSON = JSON.parse((await readFile('./package.json')).toString())

    packageJSON.exports = packageExports
    await writeFile('./package.json', JSON.stringify(packageJSON, null, '\t'))
  }
})

const cleanBuild = () => ({
  name: 'clean',
  buildStart: async () => {
    rimraf('./exports/**/*.js', {glob: true})
    rimraf('./exports/**/*.d.ts', {glob: true})
  }
})

await cp('src/theme/themes/default', 'exports/themes/default', {recursive: true})

export default [{
  input,
  output: [{
    dir: 'exports',
    format: 'es'
  }],
  plugins: [
    cleanBuild(),
    nodeResolve(),
    onlyUsedVariables(),
    typescript()
  ]
}]
// , {
//   input: ['src/theme/themes/default/tokens.js'],
//   output: [{
//     dir: 'exports/themes/default',
//     format: 'es'
//   }]
// }]