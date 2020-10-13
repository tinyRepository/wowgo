const path = require("path");

module.exports = {
  runtimeCompiler: true,
  lintOnSave: true,
  css: {
    loaderOptions: {
      sass: {
        data: `
          @import "@/styles/global.scss";
        `
      }
    }
  },
  pwa: {
    name: "black list"
  },
  chainWebpack: config => {
    config.resolve.alias
      .set("@", path.resolve(__dirname, "src"))
      .set("Uikit", path.resolve(__dirname, "src/components/uikit"))
      .set("Components", path.resolve(__dirname, "src/components"))
      .set("Pages", path.resolve(__dirname, "src/components/pages"))
      .set("Common", path.resolve(__dirname, "src/components/common"));
  }
};
