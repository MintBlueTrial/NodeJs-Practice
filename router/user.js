const express = require('express')

const router = express.Router()

// 用户信息相关路由
router.get('/info', function(req, res, next) {
    res.json('user info...')
})

module.exports = router
