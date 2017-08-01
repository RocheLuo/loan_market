var sql = {}

module.exports = function (router,body,connection){

        connection.query(`select * from loan_list`,function(err,result) {
            connection.query(`select * from loan_list_tags`,function(tagerr,tagResult){

                router.get('/api/list/:id', body, ctx => {
                    let id = ctx.params.id === 'small' ? 1 : ctx.params.id === 'middle' ? 2 : 3;
                    setInterval(updateSql(connection,id),1000)

                let Result = result.filter(function (item) {
                    return item.type === id
                });

                Result.map((item,index) => {
                    //把数据库存的tags转换成数组

                    if(!Array.isArray(item.tag)){
                        item.tag =  item.tag.split('T');
                        item.tag.shift()
                    }

                    //把数组对应id转换成对应字符串
                    for(let i = 0; i < item.tag.length;i++){
                        for(let j = 0; j < tagResult.length;j++){

                            if(item.tag[i] == tagResult[j].id){
                                item.tag[i] = tagResult[j].tag;
                            }
                        }
                    }

                });

                console.log(Result);

                ctx.body = JSON.stringify(sql) == '{}' ? Result:sql;
            })
            })
        });


};

 function updateSql(connection,id){
     return function (){
         connection.query(`select * from loan_list`,function(err,result) {
             connection.query(`select * from loan_list_tags`,function(tagerr,tagResult){

                 let Result = result.filter(function (item) {
                     return item.type === id
                 });


                 Result.map((item,index) => {
                     //把数据库存的tags转换成数组

                     if(!Array.isArray(item.tag)){
                         item.tag =  item.tag.split('T')
                         item.tag.shift()
                     }

                     //把数组对应id转换成对应字符串
                     for(let i = 0; i < item.tag.length;i++){
                         for(let j = 0; j < tagResult.length;j++){

                             if(item.tag[i] == tagResult[j].id){
                                 item.tag[i] = tagResult[j].tag;
                             }
                         }
                     }

                 });


                 sql = Result;

             })
         })
     }
 };

