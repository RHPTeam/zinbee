const webpack = require("webpack");
module.exports = {
  pluginOptions: {
    i18n: {
      locale: "vi",
      fallbackLocale: "vi",
      localeDir: "locales",
      enableInSFC: false
    }
  },
  css: {
    loaderOptions: {
      sass: {
        data: '@import "@/assets/styles/index.scss";'
      }
    }
  },
  configureWebpack: {
    plugins: [
      new webpack.ProvidePlugin({
        "window.Quill": "quill/dist/quill.js",
        Quill: "quill/dist/quill.js"
      })
    ]
  }
};
