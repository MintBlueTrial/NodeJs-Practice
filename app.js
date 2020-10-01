const express = require('express')
const router = require('./router')

// 初始化app，创建 express 应用
const app = express()

// 将整个router作为中间件来管理
app.use('/', router)

// 使 express 监听 5000 端口号发起的 http 请求
const server = app.listen(5000, '127.0.0.1', function() {
    const {address, port} = server.address()
    console.log('Http Server is running on http://%s:%s', address, port)
})
