module.exports = {
  webpack: {
    configure(webpackConfig) {
      if (webpackConfig.mode === "production") {
        //抽离公共代码，只在生产环境执行
        if (webpackConfig.optimization == null) {
          webpackConfig.optimization = {};
        }
        webpackConfig.optimization.splitChunks = {
          chunks: "all", //对于所有的包都应用这个优化配置
          cacheGroups: {
            antd: {
              name: "antd-chunk",
              test: /antd/,
              priority: 100,
            },
            reactDom: {
              name: "reactDom-chunk",
              test: /react-dom/,
              priority: 99,
            },
            vendors: {
              name: "vendors-chunk",
              test: /node_modules/,
              priority: 98,
            },
          },
        };
        return webpackConfig;
      }
    },
  },

  devServer: {
    proxy: {
      port: 8001, //防止与client端的端口冲突
      //解决跨域问题，代理(important)
      "/api": "http://localhost:3001", //mock服务 注意跨域问题！！
    },
  },
};
