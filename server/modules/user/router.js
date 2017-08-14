const jwt = require('jsonwebtoken')
module.exports = function(router,body,connection){
    router.post('/api/users',body,(ctx) => {

        let hasUser = false;
        let userToken = {};
        let sendToken = true;

        const selectQuery = `
        select * from user_base_info
         where phoneNumber = '${ctx.request.body.phoneNumber}'`;
        const insertQuery = `
        insert into user_base_info (userName,phoneNumber,start_time) 
        values (
        '${ctx.request.body.userName}'
        ,'${ctx.request.body.phoneNumber}'
        ,'${new Date().getFullYear()}-${new Date().getMonth()+1}-${new Date().getDate()}')`;

        // if(ctx.session.vcode !== )
        connection.query(selectQuery,function(error,results){
            console.log('check...')
            if(error){
                sendToken = false;
            }
            if(JSON.stringify(results) !== '[]'){

                console.log('update...')
                connection.query(
                    `update user_base_info 
                set end_time='${new Date().getFullYear()}-${new Date().getMonth()+1}-${new Date().getDate()}'
                ,userName='${ctx.request.body.userName}',count=count+1 where phoneNumber='${ctx.request.body.phoneNumber}'
                `,err => {
                        if(err){
                            console.log(err)
                            sendToken = false
                        }
                    })

            }  else{
                console.log('insert...')
                connection.query(insertQuery,function(error,results){
                    if(error){
                        sendToken = false;
                    }
                });



            }
        });


        if(sendToken){
            userToken = {
                name: ctx.request.body.userName,
                phone: ctx.request.body.phoneNumber
            }


            ctx.body = {
                token:jwt.sign({user:userToken},'meili_loan')
            }
        }else{
            ctx.body = {
                token:null
            }
        }
    })


    router.post('/api/counterInfo',body, ctx => {
        let nowDate = new Date();
        nowDate = `${nowDate.getFullYear()}年${nowDate.getMonth() + 1}月${nowDate.getDate()}日`//${nowDate.getHours()}时${nowDate.getMinutes()}分

         connection.query(`insert into loan_list_count (phoneNumber,listId,time) values ("${ctx.request.body[1]}","${ctx.request.body[0]}","${nowDate}")`,function(err,result){
             return result
         })
    })


}