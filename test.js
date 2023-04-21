const Koa = require('koa');
const Router = require('koa-router');
const { koaBody } = require('koa-body');
const bodyParser = require('koa-bodyparser');
const json = require('koa-json');
const dotenv = require('dotenv');
const mysql = require('mysql2');
const mariadb = require('mariadb');
// dotenv.config({ path: '.env-local' });
// const database = require('./database.js');
// const PORT = '3311' || '5000';

const app = new Koa();
const router = new Router();

app.use(koaBody());
// middleware
app.use(bodyParser()); // 使用 koa-bodyparser
app.use(json());

const pool = mysql.createPool({
    host: '54.95.72.145',
    user: 'root',
    password: 'mypass',
    database: 'testDB1',
    port: 3311,
});

// // 建立資料庫連線
// pool.getConnection((err, connection) => {
//     if (err) {
//         console.error('資料庫連線錯誤:', err);
//         return;
//     }
//     connection.query('SELECT * from personal', function (err, result, fields) {
//         console.log('已成功連接到資料庫');
//         console.log(result);
//         connection.release();

//     });
// });

router
    .get('/', async (ctx) => {
        let conn;
        try {
            conn = await pool.getConnection((err, connection) => {
                if (err) {
                    console.error('資料庫連線錯誤:', err);
                    return;
                }
                connection.query('SELECT * from personal', function (err, result) {
                    console.log('已成功連接到資料庫');
                    ctx.status = 200;
                    console.log(ctx.body);
                    ctx.body = result;
                    console.log(result);
                    connection.release();
                });
            });
        } catch (err) {
            console.error(err);
        }
    })
    // GET /user/:id
    .get('/users/:id', async (ctx) => {
        const id = ctx.params.id;
        console.log("我是id", id);
        let conn;
        try {
            conn = await pool.getConnection((err, connection) => {
                if (err) {
                    console.error('資料庫連線錯誤:', err);
                    return;
                }
                connection.query(`SELECT * from personal WHERE PersonID = ${id}`, function (err, result) {
                    ctx.status = 200;
                    ctx.body = result;
                    console.log(result);
                    connection.release();
                });

            });
        } catch (err) {
            console.error(err);
        }
    })
    .post('/users', async (ctx) => {
        const item = ctx.request.body;
        let conn;
        try {
            conn = await pool.getConnection((err, connection) => {
                if (err) {
                    console.error('資料庫連線錯誤:', err);
                    return;
                }
                connection.query('INSERT INTO personal (name, tel) VALUES ("Kelly", "0944578364")', function (err, result) {
                    console.log("新增一筆資料");
                    ctx.status = 200;
                    ctx.body = result;
                    console.log(result);
                    connection.release();
                });

            });
        } catch (err) {
            console.error(err);
        }
    })
    // PUT /todos/:id
    .put('/users/:id', async (ctx) => {
        const id = parseInt(ctx.params.id);
        console.log(id);
        let conn;
        try {
            conn = await pool.getConnection((err, connection) => {
                if (err) {
                    console.error('資料庫連線錯誤:', err);
                    return;
                }
                connection.query(`UPDATE personal SET tel ='0966666666' WHERE PersonID=${id}`, function (err, result) {
                    ctx.status = 200;
                    ctx.body = result;
                    connection.release();
                });
            });
        } catch (err) {
            console.error(err);
        }
    })

    // DELETE /todos/:id
    .del('/users/:id', async (ctx) => {
        const id = ctx.params.id;
        console.log("我是刪除id", id);
        let conn;
        try {
            conn = await pool.getConnection((err, connection) => {
                if (err) {
                    console.error('資料庫連線錯誤:', err);
                    return;
                }
                connection.query(`DELETE FROM personal WHERE PersonID = ${id}`, function (err, result) {
                    console.log("我有被刪除", id);
                    ctx.status = 200;
                    ctx.body = result;
                    connection.release();
                });
            });
        } catch (err) {
            console.error(err);
        }
    });


app.use(router.routes());
// app.use(router.allowedMethods());
app.listen(3000, () => {
    console.log(`start server http://localhost:3000`);
});