const jwt = require('jsonwebtoken')
const pify = require('promise.ify')
const md5 = require('md5')
module.exports = function(router,body,connection){

    router.post('/api/users',body,async (ctx) => {

            const insertAndUpdateSql = `INSERT INTO user_base_info (userName,phoneNumber) VALUES ( '${ctx.request.body.userName}' ,'${ctx.request.body.phoneNumber}') ON DUPLICATE KEY UPDATE userName='${ctx.request.body.userName}',count=count+1`;
            const selectUserSql = `select phoneNumber from user_base_info where phoneNumber = ${ctx.request.body.phoneNumber}`
            const updateUserSql = `update user_base_info set count=count+1 where phoneNumber = '${ctx.request.body.phoneNumber}'`
            let userToken = {};
            let sendToken = false;

            userToken = {
                name:  ctx.request.body.userName,
                phone: ctx.request.body.phoneNumber
            }

            
            if(ctx.request.body.userType == 1){
                let results = await pify(connection.query, connection)(insertAndUpdateSql)
        
                            // console.log(ctx.session)
                            // console.log(ctx.request.body)
                if(results && ctx.request.body.VCode == md5(ctx.session.vcode) && ctx.session.imgvcode == ctx.request.body.imgVCode){
                    ctx.body = {
                        token:jwt.sign({user:userToken},'meili_loan')
                    }
                }else{
                    ctx.body = {message:'注册出错'}
                }
            }else if(ctx.request.body.userType == 0){
                
                if(global.imgvcode == ctx.request.body.imgVCode){

                    let results = await pify(connection.query,connection)(selectUserSql)

                    if(JSON.stringify(results[0]) !== '[]'){
                        pify(connection.query,connection)(updateUserSql)
                        ctx.body = {
                            token:jwt.sign({user:userToken},'meili_loan')
                        }
                    }else{
                        ctx.body = {message:'注册出错'}                        
                    }
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