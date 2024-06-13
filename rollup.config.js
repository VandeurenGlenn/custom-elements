import nodeResolve from '@rollup/plugin-node-resolve'
import typescript from '@rollup/plugin-typescript'
import { cp, readFile, writeFile } from 'fs/promises'
import { globby } from 'globby'
import { parse, join } from 'path'
import { rimraf } from 'rimraf'
import commonJs from '@rollup/plugin-commonjs'
import json from '@rollup/plugin-json'
import { cpSync } from 'fs'
import autoExports from 'rollup-plugin-auto-exports'
import materialSymbols from 'rollup-plugin-material-symbols'

const input = await globby(['src/**/*.ts'])

const cleanBuild = () => ({
  name: 'clean',
  buildStart: async () => {
    rimraf('./exports/**/*.js', { glob: true })
    rimraf('./exports/**/*.d.ts', { glob: true })
  }
})

const cloneIndex = (options) => ({
  name: 'clone-index',
  buildStart: async () => {
    await cp(options.src || 'src/index.html', options.dest || 'exports/index.html')
  }
})

await cp('src/theme/themes/default', 'exports/themes/default', {
  recursive: true
})

export default [
  {
    input,
    output: [
      {
        dir: 'exports',
        format: 'es'
      }
    ],
    plugins: [
      cleanBuild(),
      typescript(),
      commonJs(),
      materialSymbols({
        includeHTML: true,
        copyHTML: true
      }),
      autoExports({
        defaultExports: {
          '.': {
            import: './exports/custom-elements.js',
            types: './exports/custom-elements.d.ts'
          }
        }
      })
    ]
  }
]
// , {
//   input: ['src/theme/themes/default/tokens.js'],
//   output: [{
//     dir: 'exports/themes/default',
//     format: 'es'
//   }]
// }]
