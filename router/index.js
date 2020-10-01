const express = require('express')
const boom = require('boom')
const userRouter = require('./user')
const { CODE_ERROR } = require('../utils/constant')

// 注册路由
const router = express.Router()

router.get('/', function(req, res) {
    res.send('Hello Node.js')
})

//  通过 userRouter 来处理 /user 路由下的所有子路由，对路由处理进行解耦，实现路由嵌套
router.use('/user', userRouter)

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
    console.log(err)
    const msg = (err && err['message']) || '系统异常'
    const statusCode = (err['output'] && err['output'].statusCode) || 500
    const errorMsg = (
        err['output'] && err['output'].payload && err['output'].payload.error
    ) || err['message']
    res.status(statusCode).json({
        code: CODE_ERROR,
        msg,
        error: statusCode,
        errorMsg
    })
})

module.exports = router
