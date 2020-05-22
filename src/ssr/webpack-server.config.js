const path = require('path')
const nodeExternals = require('webpack-node-externals')
const getCSSModuleLocalIdent = require('./utils/getCSSModuleLocalIdent')


const commonPresets = [
  [
    '@babel/preset-env',
    {
      'targets': {
        'browsers': ['>0.5%', 'last 2 versions', 'ie >= 10']
      }
    }
  ],
  '@babel/preset-react'
]

const babelConfig = {
  'plugins': [
    'babel-plugin-styled-components',
    ['@babel/transform-runtime', { 'corejs': 2 }],
    ['effector/babel-plugin', { 'addLoc': true }],

    '@loadable/babel-plugin',
    '@babel/transform-async-to-generator',
    '@babel/proposal-class-properties',
    '@babel/proposal-object-rest-spread',
    '@babel/syntax-dynamic-import',
    '@babel/plugin-proposal-export-default-from',
    '@babel/plugin-syntax-export-namespace-from',
    '@babel/plugin-proposal-optional-chaining',
    'transform-export-extensions',
  ],
  'overrides': [
    {
      'test': [
        './src/**/*.ts',
        './src/**/*.tsx'
      ],
      'presets': [
        '@babel/preset-typescript',
        ...commonPresets
      ]
    },
    {
      'test': [
        './src/**/*.js',
        './src/**/*.jsx'
      ],
      'presets': [
        '@babel/preset-flow',
        ...commonPresets
      ]
    }
  ]
}



const serverEntryConfig = {
  context: path.resolve(__dirname, '..'),
  mode: 'production',
  target: 'async-node',
  name: 'server',
  optimization: {
    minimize: false,
  },
  entry: {
    main: './ssr/index.ts',
  },
  output: {
    path: path.resolve(__dirname, '..', '..', 'build'),
    filename: 'server.js',
    publicPath: '/static/',
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
    modules: ['node_modules', 'src'],
  },
  node: {
    __dirname: false,
  },
  externals: [
    nodeExternals({
      whitelist: [
        /normalize\.css/,
        /react-dnd-html5-backend(\/.+)?/,
        /dnd-core(\/.+)?/,
        /react-dnd(\/.+)?/,
        /@babel\/runtime\/.+/

      ],
    })
  ],
  module: {
    rules: [
      {
        test: /\.(js|ts)x?$/,
        exclude: /(node_modules\/)/,
        loader: 'babel-loader',
        options: babelConfig,
      },
      {
        test: /\.css$/,
        loader: 'file-loader',
        options: {
          emitFile: false,
        },
        sideEffects: true,
      },

      {
        test: /\.scss$/,
        use: [
          {
            loader: 'isomorphic-style-loader',
          },
          {
            loader: 'css-loader',
            options: {
              importLoaders: 3,
              sourceMap: true,
              modules: {
                getLocalIdent: getCSSModuleLocalIdent,
              },
            },
          },
          {
            loader: 'sass-loader'
          }
        ]
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2)$/,
        loader: 'file-loader',
        options: {
          emitFile: false,
          name: 'media/[name].[hash:8].[ext]',
        },
        sideEffects: true,
      },

      {
        test: /\.(png|jpg|svg|ico|gif)$/,
        loader: 'file-loader',
        options: {
          name: 'media/[name].[hash:8].[ext]',
          emitFile: false,
        },
      },

    ],
  },
  plugins: [],
}

module.exports = [serverEntryConfig]
