import nodeResolve from "@rollup/plugin-node-resolve";
import typescript from "@rollup/plugin-typescript";
import { globby } from 'globby'
import { rimraf } from "rimraf";

const input = await globby('src/**/*.ts')

const onlyUsedVariables = () => ({
  name: 'rollup-plugin-only-used-variables',
  transform: (code, map, ast) => {
    // console.log(code);
  }
})

const cleanBuild = () => ({
  name: 'clean',
  buildStart: async () => {
    rimraf('./exports/**/*.js', {glob: true})
  }
})

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
}, {
  input: ['src/theme/themes/default/tokens.js'],
  output: [{
    dir: 'exports/themes/default',
    format: 'es'
  }]
}]