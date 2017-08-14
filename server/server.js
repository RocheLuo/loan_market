const Koa = require('koa')
import {sqlConf,serverConf} from "./conf";
const app = new Koa();
const body = require('koa-body')();
const mysql = require('mysql')
const jwt = require('jsonwebtoken')
const serve = require('koa-static')
const routes = require('./routes')
const fs = require('fs')
const session = require('koa-session')
//连接数据库
const connection = mysql.createConnection(sqlConf);

app.keys = ['keys', 'keykeys'];

connection.connect();

const CONFIG = {
    key: 'koa:sess',
    maxAge: 86400000,
    overwrite: true,
    httpOnly: true,
    signed: true,
    rolling: false,
};


app.use(serve(__dirname + '/public'))
app.use(session(CONFIG,app))

routes(app,body,connection);

app.listen(serverConf.port, () => {
    console.log('run at port',serverConf.port);
});

