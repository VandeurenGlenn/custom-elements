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
import {materialSymbols} from "rollup-plugin-material-symbols";

const input = await globby(['src/**/*.ts'])

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
    typescript(),
    materialSymbols({
      includeHTML: true,
      copyHTML: true
    }),
    nodeResolve(),
    commonJs(),
    autoExports({
      defaultExports: {
        '.': {
          import: './exports/lit-elements.js',
          types: './exports/lit-elements.d.ts'
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