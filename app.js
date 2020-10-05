/*
* @Time    : 2020/10/2 23:49
* @Author  : DannyDong
* @File    : app.js
* @Description: App主文件
*/

const express = require('express');
const router = require('./router');
const bodyParser = require('body-parser');
const cors = require('cors');

// 初始化app，创建 express 应用
const app = express();

// 请求参数解析
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
// 跨域处理
app.use(cors());

// 将整个router作为中间件来管理
app.use('/', router);

// 使 express 监听 5000 端口号发起的 http 请求
const server = app.listen(5000, '127.0.0.1', function() {
    const {address, port} = server.address();
    console.log('Http Server is running on http://%s:%s', address, port);
});
