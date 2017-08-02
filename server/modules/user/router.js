const jwt = require('jsonwebtoken')
module.exports = function(router,body,connection){
    router.post('/api/users',body,(ctx) => {

        let hasUser = false;
        let userToken = {};


        const selectQuery = `select * from user_base_info where userName = '${ctx.request.body.userName}' and phoneNumber =  ${ctx.request.body.phoneNumber}'`;
        const insertQuery = `insert into user_base_info (userName,phoneNumber) values ('${ctx.request.body.userName}','${ctx.request.body.phoneNumber}')`;
        connection.query(selectQuery,function(error,results){
            if(results){
                hasUser = true
            }
        });
        if(!hasUser){
            connection.query(insertQuery,function(error,results){

            });
        }

        userToken = {
            name: ctx.request.body.userName,
            phone: ctx.request.body.phoneNumber
        }


         ctx.body = {
             token:jwt.sign({user:userToken},'meili_loan')
         }

    })


}