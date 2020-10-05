/*
* @Time    : 2020/10/5 23:29
* @Author  : DannyDong
* @File    : user.js
* @Description: 用户相关业务逻辑
*/

const {querySql} = require('../db');

// 用户登录
function login(username, password) {
    const sql = `select * from admin_user where username='${username}' and password='${password}'`;
    return querySql(sql);
}

module.exports = {
    login,
};
