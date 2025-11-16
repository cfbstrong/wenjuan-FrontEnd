module.exports = {
  devServer: {
    proxy: {
      port: 8001, //防止与client端的端口冲突
      //解决跨域问题，代理(important)
      "/api": "http://localhost:3001", //mock服务 注意跨域问题！！
    },
  },
};
