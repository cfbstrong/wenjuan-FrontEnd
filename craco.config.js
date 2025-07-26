module.exports = {
  devServer: {
    proxy: {
      //解决跨域问题，代理(important)
      "/api": "http://localhost:3001",
    },
  },
};
