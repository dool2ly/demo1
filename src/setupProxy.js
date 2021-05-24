const { createProxyMiddleware } = require('http-proxy-middleware')

module.exports = app => {
  app.use(
    "/code",
    createProxyMiddleware({
      target: "https://codetabletest.azurewebsites.net",
      changeOrigin: true
    })
  )
}