/*
* @Time    : 2020/10/5 22:42
* @Author  : DannyDong
* @File    : index.js
* @Description: 链接数据库
*/

const mysql = require('mysql');
const config = require('./config');
const {DEBUG} = require('../utils/constant');

function connect() {
    return mysql.createConnection({
        host: config.host,
        user: config.user,
        password: config.password,
        database: config.database,
        port: config.port,
    });
}

function querySql(sql) {
    const conn = connect();
    DEBUG && console.log(sql);
    return new Promise((resolve, reject) => {
        try {
            conn.query(sql, (err, results) => {
                if (err) {
                    DEBUG && console.log('查询失败，原因：' + JSON.stringify(err));
                    reject(err);
                } else {
                    DEBUG && console.log('查询成功，结果：' + JSON.stringify(results));
                    resolve(results);
                }
            });
        } catch (e) {
            reject(e);
        } finally {
            conn.end();
        }
    });
}

module.exports = {
    querySql,
};
