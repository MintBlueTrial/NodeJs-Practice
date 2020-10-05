/*
* @Time    : 2020/10/5 23:29
* @Author  : DannyDong
* @File    : user.js
* @Description: 用户相关业务逻辑
*/

const {querySql, queryOneSql} = require('../db');

// 用户登录
function login(username, password) {
    const sql = `select * from admin_user where username='${username}' and password='${password}'`;
    return querySql(sql);
}

// 查询用户信息
function findUserInfo(username) {
    const sql = `select username, id, nickname, role, avatar from admin_user where username='${username}'`;
    return queryOneSql(sql);
}

module.exports = {
    login, findUserInfo,
};
