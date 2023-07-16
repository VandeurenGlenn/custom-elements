import nodeResolve from "@rollup/plugin-node-resolve";
import typescript from "@rollup/plugin-typescript";
import { cp, readFile, writeFile } from "fs/promises";
import { globby } from 'globby'
import { parse } from "path";
import { rimraf } from "rimraf";
import commonJs from '@rollup/plugin-commonjs'
import json from "@rollup/plugin-json";

const input = await globby(['src/**/*.ts'])

const autoExports = () => ({
  name: 'rollup-plugin-auto-exports',
  writeBundle: async (options, bundle) => {
    const packageExports = {
      '.': {
        import: './exports/custom-elements.js',
        types: './exports/custom-elements.d.ts'
      }
    }
    const glob = await globby('exports/**/*.d.ts')
    let sorted = glob.map(path => ({ parsed: parse(path), path}))
    sorted.sort((a, b) => {
      return a.parsed.name.localeCompare(b.parsed.name)
    })
    for (const {path, parsed} of sorted) {
      const name = `./${parsed.name.replace('.d', '.js')}`
      packageExports[name] = {
        import: `./exports/${parsed.name.replace('.d', '.js')}`,
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
    typescript(),
    cleanBuild(),
    nodeResolve(),
    commonJs(),
    autoExports()
  ]
}]
// , {
//   input: ['src/theme/themes/default/tokens.js'],
//   output: [{
//     dir: 'exports/themes/default',
//     format: 'es'
//   }]
// }]