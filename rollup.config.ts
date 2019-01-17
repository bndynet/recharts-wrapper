import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import sourceMaps from 'rollup-plugin-sourcemaps'
import camelCase from 'lodash.camelcase'
import typescript from 'rollup-plugin-typescript2'
import json from 'rollup-plugin-json'
import babel from 'rollup-plugin-babel'

const pkg = require('./package.json')

const libraryName = 'recharts-wrapper'

export default {
  input: `src/${libraryName}.ts`,
  output: [
    {
      file: pkg.main,
      name: camelCase(libraryName),
      format: 'umd',
      sourcemap: true,
      globals: {
        'react': 'React',
        'react-dom': 'ReactDOM',
        'recharts': 'Recharts',
      },
    },
    { file: pkg.module, format: 'es', sourcemap: true },
  ],
  // Indicate here external modules you don't wanna include in your bundle (i.e.: 'lodash')
  external: ['react', 'react-proptypes', 'react-dom', 'recharts'],
  watch: {
    include: 'src/**'
  },
  plugins: [
    // Allow json resolution
    json(),
    // Compile TypeScript files
    typescript({ useTsconfigDeclarationDir: true }),
    // Allow bundling cjs modules (unlike webpack, rollup doesn't understand cjs)
    commonjs({
      include: 'node_modules/**',
      namedExports: {
        'node_modules/react/index.js': [
          'Component',
          'PureComponent',
          'Fragment',
          'Children',
          'cloneElement',
          'createElement',
          'isValidElement'
        ],
        'node_modules/react-smooth/lib/index.js': ['translateStyle'],
        'node_modules/d3-scale/dist/d3-scale.js': ['scalePoint'],
        'node_modules/recharts-scale/lib/index.js': [
          'getNiceTickValues',
          'getTickValuesFixedDomain'
        ]
      }
    }),
    // Allow node_modules resolution, so you can use 'external' to control
    // which external modules to include in the bundle
    // https://github.com/rollup/rollup-plugin-node-resolve#usage
    resolve(),

    babel({
      exclude: 'node_modules/**'
    }),

    // Resolve source maps to the original source
    sourceMaps()
  ]
}
