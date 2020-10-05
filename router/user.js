/*
* @Time    : 2020/10/2 23:49
* @Author  : DannyDong
* @File    : user.js
* @Description: 用户路由文件
*/

const express = require('express');

const router = express.Router();

router.post('/login', function(req, res) {
    console.log(req.body);
    res.json({
        code: 0,
        msg: '登录成功',
    });
});

// 用户信息相关路由
router.get('/info', function(req, res, next) {
    res.json('user info...');
});

module.exports = router;
