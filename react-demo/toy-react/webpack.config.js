module.exports = {
  mode: 'development',
  entry: {
    main: './main.js',
    'main.02': './main.02.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: [
              ['@babel/plugin-transform-react-jsx', {
                pragma: 'createElement'
              }]
            ]
          }
        }
      }
    ]
  },
  optimization: {
    minimize: false
  }
}