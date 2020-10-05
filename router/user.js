/*
* @Time    : 2020/10/2 23:49
* @Author  : DannyDong
* @File    : user.js
* @Description: 用户路由文件
*/

const express = require('express');
const Result = require('../models/Result');

const router = express.Router();

// 用户登录请求
router.post('/login', function(req, res) {
    console.log(req.body);
    let result = new Result();
    const {userName, pwd} = req.body;
    if (userName === 'admin' && pwd === 'admin') {
        result.success(res);
    } else {
        result.fail(res);
    }
});

// 用户信息相关路由
router.get('/info', function(req, res, next) {
    res.json('user info...');
});

module.exports = router;
