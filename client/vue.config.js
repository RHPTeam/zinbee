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
  }
};
