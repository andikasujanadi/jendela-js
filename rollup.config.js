import resolve from "rollup-plugin-node-resolve";
import commonjs from "rollup-plugin-commonjs";
import babel from "rollup-plugin-babel";
import pkg from "./package.json";
import postcss from "rollup-plugin-postcss";
import livereload from "rollup-plugin-livereload";
import serve from "rollup-plugin-serve";

const isDev = process.env.ROLLUP_WATCH; // Detect if Rollup is in watch mode

export default [
  // UMD Build (for browser usage)
  {
    input: "src/jendela.js",
    output: {
      name: "jendelaJS",
      file: pkg.browser,
      format: "umd",
    },
    plugins: [
      postcss({
        extract: "styles.umd.css", // Separate CSS file for UMD build
        minimize: true, // Minify CSS
      }),
      resolve(),
      commonjs(),
      babel({
        exclude: ["node_modules/**"],
      }),
      ...(isDev
        ? [
            serve({
              open: true,
              contentBase: "",
            }),
            livereload("dist"),
          ]
        : []),
    ],
  },

  // CJS and ESM Builds (for library usage)
  {
    input: "src/jendela.js",
    output: [
      { file: pkg.main, format: "cjs" }, // CommonJS
      { file: pkg.module, format: "es" }, // ES Module
    ],
    plugins: [
      postcss({
        extract: "styles.css", // Shared CSS for CJS/ES builds
        minimize: true, // Minify CSS
      }),
      babel({
        exclude: ["node_modules/**"],
      }),
    ],
  },
];
