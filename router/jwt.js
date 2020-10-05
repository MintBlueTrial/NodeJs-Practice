/*
* @Time    : 2020/10/6 01:28
* @Author  : DannyDong
* @File    : jwt.js
* @Description: jwt认证相关
*/

const expressJwt = require('express-jwt');
const {PRIVATE_KEY} = require('../utils/constant');

const jwtAuth = expressJwt({
    secret: PRIVATE_KEY,
    algorithms: ['HS256'],
    credentialRequired: true,
}).unless({
    path: [
        '/',
        '/login',
    ], // 设置jwt白名单
});

module.exports = jwtAuth;
