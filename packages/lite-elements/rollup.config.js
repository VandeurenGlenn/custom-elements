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
import terser from '@rollup/plugin-terser'

const input = await globby(['src/**/*.ts'])

const cleanBuild = () => ({
  name: 'clean',
  buildStart: async (dir) => {
    rimraf('./exports/**/*.js', { glob: true })
    rimraf('./exports/**/*.d.ts', { glob: true })
  }
})

await cp('src/theme/themes/default', 'exports/themes/default', { recursive: true })
await cp('src/index.html', 'exports/bundle/index.html')

await cp('src/theme/themes/default', 'exports/bundle/themes/default', { recursive: true })

export default [
  {
    input,
    output: [
      {
        dir: 'exports',
        format: 'es'
      }
    ],
    external: ['@vandeurenglenn/little-pubsub', '@vandeurenglenn/flex-elements', '@vandeurenglenn/lite'],
    plugins: [
      cleanBuild(),
      typescript(),
      autoExports({
        defaultExports: {
          '.': {
            import: './exports/lite-elements.js',
            types: './exports/lite-elements.d.ts'
          }
        }
      })
    ]
  },
  {
    input,
    output: {
      dir: 'exports/bundle',
      format: 'es'
    },
    plugins: [
      materialSymbols({
        placeholderPrefix: 'symbol'
      }),
      nodeResolve(),
      typescript({ compilerOptions: { declaration: false, outDir: 'exports/bundle' } }),
      terser({
        keep_classnames: true
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
