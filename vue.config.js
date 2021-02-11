module.exports = {
  transpileDependencies: ['vuetify'],
  devServer: {
    disableHostCheck: true,
    proxy: {
      '/api': {
        target: process.env.VUE_APP_API_URL,
        changeOrigin: true
      }
    },
    host: process.env.VUE_APP_HOST,
    port: process.env.VUE_APP_PORT
  }
};
