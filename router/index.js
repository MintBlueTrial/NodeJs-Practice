/*
* @Time    : 2020/10/2 23:49
* @Author  : DannyDong
* @File    : index.js
* @Description: 路由主文件
*/

const express = require('express');
const boom = require('boom');
const userRouter = require('./user');
const jwtAuth = require('./jwt');
const Result = require('../models/Result');

// 注册路由
const router = express.Router();

// jwt注册中间件
router.use(jwtAuth);

router.get('/', function(req, res) {
    res.send('Hello Node.js');
});

//  通过 userRouter 来处理 /user 路由下的所有子路由，对路由处理进行解耦，实现路由嵌套
router.use('/user', userRouter);

/**
 * 集中处理404请求的中间件
 * 注意：该中间件必须放在正常处理流程之后
 * 否则正常请求会被拦截
 * */
router.use((req, res, next) => {
    next(boom.notFound('哦吼，404了'))
})

/**
 * 自定义路由异常处理中间件
 * 注意两点：
 * 第一，方法的参数不能减少
 * 第二，方法的必须放在路由最后
 **/
router.use((err, req, res, next) => {
    // 处理Token失效
    if (err.name && err.name === 'UnauthorizedError') {
        const {status = 401, message} = err;
        new Result(null, 'Token验证失败', {
            error: status,
            errMsg: message,
        }).tokenErr(res.status(status));
    } else {
        const msg = (err && err['message']) || '系统异常';
        const statusCode = (err['output'] && err['output'].statusCode) || 500;
        const errorMsg = (
            err['output'] && err['output'].payload &&
            err['output'].payload.error
        ) || err['message'];
        new Result(null, msg, {
            error: statusCode,
            errorMsg,
        }).fail(res.status(statusCode));
    }
})

module.exports = router
