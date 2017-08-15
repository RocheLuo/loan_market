const jwt = require('jsonwebtoken')
const pify = require('promise.ify')

module.exports = function(router,body,connection){

    router.post('/api/users',body,async (ctx) => {

            const insertAndUpdateSql = `INSERT INTO user_base_info (userName,phoneNumber) VALUES ( '${ctx.request.body.userName}' ,'${ctx.request.body.phoneNumber}') ON DUPLICATE KEY UPDATE userName='${ctx.request.body.userName}',count=count+1`;

            let userToken = {};
            let sendToken = false;

            userToken = {
                name:  ctx.request.body.userName,
                phone: ctx.request.body.phoneNumber
            }

            const results = await pify(connection.query, connection)(insertAndUpdateSql)

            if(results){
                ctx.body = {
                    token:jwt.sign({user:userToken},'meili_loan')
                }
            }

    })

    router.post('/api/counterInfo',body,async ctx => {

        let nowDate = new Date();

        //让记录到每一天
        nowDate = `${nowDate.getFullYear()}年${nowDate.getMonth() + 1}月${nowDate.getDate()}日`//${nowDate.getHours()}时${nowDate.getMinutes()}分

        const insertCountSql = `insert into loan_list_count (phoneNumber,listId,time) values ("${ctx.request.body[1]}","${ctx.request.body[0]}","${nowDate}")`
       
        const results = await pify(connection.query, connection)(insertCountSql)
        
        ctx.body = results
    })
}