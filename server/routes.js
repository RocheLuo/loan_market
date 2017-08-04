const router = require('koa-router')();
const list = require('./modules/list/router')
const user = require('./modules/user/router')
const info01 = require('./modules/info01/router')
const vcode = require('./modules/vcode/router')
module.exports = function(app,body,connection) {

    list(router,body,connection);
    user(router,body,connection);
    info01(router,body,connection);
    vcode(router,body,connection)

    app.use(router.routes());


}