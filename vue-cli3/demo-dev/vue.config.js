module.exports = {
  publicPath: '/demo/',
  pages: {
    admin: {
      entry: 'src/views/admin/main.js'
    },
    tourist: {
      entry: 'src/views/tourist/main.js'
    }
  },
  devServer: {
    open: true,
    openPage: 'admin/',
    historyApiFallback: {
      rewrites: [
        { from: /\/admin/, to: '/admin.html' },
        { from: /\/tourist/, to: '/tourist.html' }
      ]
    }
  }
};
