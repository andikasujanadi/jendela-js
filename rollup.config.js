import resolve from "rollup-plugin-node-resolve";
import commonjs from "rollup-plugin-commonjs";
import babel from "rollup-plugin-babel";
import pkg from "./package.json";
import postcss from 'rollup-plugin-postcss';

export default [
  {
    input: "src/jendela.js",
    output: {
      name: "jendelaJS",
      file: pkg.browser,
      format: "umd",
    },
    plugins: [
      resolve(),
      commonjs(),
      babel({
        exclude: ["node_modules/**"],
      }),
      postcss({
        extract: true,
        minimize: true,
      }),
    ],
  },
  {
    input: "src/jendela.js",
    output: [
      { file: pkg.main, format: "cjs" },
      { file: pkg.module, format: "es" },
    ],
    plugins: [
      babel({
        exclude: ["node_modules/**"],
      }),
      postcss({
        extract: true,
        minimize: true,
      }),
    ],
  },
];