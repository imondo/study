module.exports = {
  baseUrl: '/demo/',
  pages: {
    admin: {
      entry: 'src/views/admin/main.js'
    },
    tourist: {
      entry: 'src/views/tourist/main.js'
    }
  },
  devServer: {
    open: true
  }
};