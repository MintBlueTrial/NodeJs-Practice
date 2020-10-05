/*
* @Time    : 2020/10/2 23:49
* @Author  : DannyDong
* @File    : user.js
* @Description: 用户路由文件
*/

const boom = require('boom');
const {md5} = require('../utils');
const {login} = require('../services/user');
const {PWD_SALT, JWT_EXPIRED, PRIVATE_KEY} = require('../utils/constant');
const express = require('express');
const Result = require('../models/Result');
const {body, validationResult} = require('express-validator');
const jwt = require('jsonwebtoken');

const router = express.Router();

// 登录信息校验
const loginInfoCheck = [
    body('username').isString().withMessage('用户名必须是字符'),
    body('password').isString().withMessage('密码必须是字符'),
];

// 用户登录请求
router.post('/login', loginInfoCheck, function(req, res, next) {
    const err = validationResult(req);
    if (!err.isEmpty()) {
        const [{msg}] = err.errors;
        next(boom.badRequest(msg));
    } else {
        // 获取参数
        let {username, password} = req.body;
        // 密码加密
        password = md5(`${password}${PWD_SALT}`);
        // 登录逻辑处理
        login(username, password).then(user => {
            if (!user || user.length === 0) {
                new Result('登录失败').fail(res);
            } else {
                // 登录成功后生成token
                const token = jwt.sign(
                    {username}, PRIVATE_KEY, {expiresIn: JWT_EXPIRED},
                );
                new Result({token}, '登录成功').success(res);
            }
        });
    }
});

// 用户信息相关路由
router.get('/info', function(req, res, next) {
    res.json('user info...');
});

module.exports = router;
