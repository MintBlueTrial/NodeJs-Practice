/*
* @Time    : 2020/10/2 23:49
* @Author  : DannyDong
* @File    : user.js
* @Description: 用户路由文件
*/

const {md5} = require('../utils');
const {login} = require('../services/user');
const {PWD_SALT} = require('../utils/constant');
const express = require('express');
const Result = require('../models/Result');

const router = express.Router();

// 用户登录请求
router.post('/login', function(req, res) {
    // 初始化Result类
    let result = new Result();
    // 获取参数
    let {username, password} = req.body;
    // 密码加密
    password = md5(`${password}${PWD_SALT}`);
    // 登录逻辑处理
    login(username, password).then(user => {
        if (!user || user.length === 0) {
            result.fail(res);
        } else {
            result.success(res);
        }
    });
});

// 用户信息相关路由
router.get('/info', function(req, res, next) {
    res.json('user info...');
});

module.exports = router;
