const Koa = require('koa');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
const { koaBody } = require('koa-body');
const mariadb = require('mariadb');
const mysql = require('mysql2');

// const pool = mariadb.createPool({
//     host: process.env.DB_HOST,
//     port: process.env.PORT,
//     user: process.env.DB_USER,
//     password: process.env.DB_PASSWORD,
//     database: process.env.DB_NAME,
//     connectionLimit: 5
// });

const app = new Koa();
const router = new Router();

app.use(koaBody());



const pool = mysql.createPool({
    host: '54.95.72.145',
    user: 'root',
    password: 'mypass',
    database: 'testDB1',
    port: 3311,
    connectionLimit: 100 // 最大連線數量
});


// 建立資料庫連線
const connection = pool.getConnection((err, connection) => {
    if (err) {
        console.error('資料庫連線錯誤:', err);
        return;
    }
    connection.query('SELECT * from personal', function (err, result, fields) {
        console.log('已成功連接到資料庫');
        ctx.body = result;
        console.log(result);
        connection.release();

    });
});

module.exports = connection;