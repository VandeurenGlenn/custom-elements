import nodeResolve from "@rollup/plugin-node-resolve";
import typescript from "@rollup/plugin-typescript";
import { cp, readFile, writeFile } from "fs/promises";
import { globby } from 'globby'
import { parse, join } from "path";
import { rimraf } from "rimraf";
import commonJs from '@rollup/plugin-commonjs'
import json from "@rollup/plugin-json";
import { cpSync } from "fs";
import autoExports from 'rollup-plugin-auto-exports'

const input = await globby(['src/**/*.ts'])

const cleanBuild = () => ({
  name: 'clean',
  buildStart: async () => {
    rimraf('./exports/**/*.js', {glob: true})
    rimraf('./exports/**/*.d.ts', {glob: true})
  }
})

const materialSymbolflavors = [
  'Material+Symbols+Outlined'
]

const url = 'https://raw.githubusercontent.com/google/material-design-icons/master/variablefont/MaterialSymbolsOutlined[FILL,GRAD,opsz,wght].codepoints'
const _codepoints = (await (await fetch(url)).text()).split('\n')
const codepoints = {}

for (const line of _codepoints) {
  const parts = line.split(' ')
  codepoints[parts[0]] = parts[1]
}
const includedSymbols = {}
const symbols = []
const materialSymbols = (options) => ({
  name: 'materialSymbols',
  transform: async (code, id) => {
    console.log(symbols);
    return code.replaceAll(/(?:\@symbol\-)([aA-zZ]+)/g, (_, $1) => {
      !symbols.includes($1) && symbols.push($1)
      
      return `&#x${codepoints[$1]}`
    })
  },
  writeBundle: async (options, bundle) => {
    const themedir = join(options.dir, 'theme.js')
    const indexdir = join(options.dir, 'index.html')
    let indexContent = (await readFile(indexdir)).toString()
    indexContent = indexContent.replaceAll(/(?:\@symbol\-)([aA-zZ]+)/g, (_, $1) => {
      !symbols.includes($1) && symbols.push($1)
      
      return `&#x${codepoints[$1]}`
    })
    const content = (await readFile(themedir)).toString()
console.log(symbols);
    const link = `<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,400,0,0&display=swap">`
    for (const symbol of symbols) {
      includedSymbols[symbol] = codepoints[symbol]
    }

    await Promise.all([
      writeFile(themedir, content.replace(/\/\/ @custom-symbols/g, `globalThis.symbols = '&text=${Object.values(includedSymbols).map(value => `${encodeURIComponent(String.fromCharCode(parseInt(value,16)))}`).join(',')}'`)),
      writeFile(indexdir, indexContent.replace(/\/\/ @custom-symbols/g, `globalThis.symbols = '&text=${Object.values(includedSymbols).map(value => `${encodeURIComponent(String.fromCharCode(parseInt(value,16)))}`).join(',')}'`))
    ])
  }
  
})

const cloneIndex = (options) => ({
  name: 'clone-index',
  buildStart: async () => {
    await cp(options.src || 'src/index.html', options.dest || 'exports/index.html')
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
    cloneIndex({src: 'src/index.html', dest: 'exports/index.html'}),
    cleanBuild(),
    typescript(),
    materialSymbols(),
    nodeResolve(),
    commonJs(),
    autoExports({
      defaultExports: {
        '.': {
          import: './exports/custom-elements.js',
          types: './exports/custom-elements.d.ts'
        }
      }
    })
  ]
}]
// , {
//   input: ['src/theme/themes/default/tokens.js'],
//   output: [{
//     dir: 'exports/themes/default',
//     format: 'es'
//   }]
// }]