const pify = require('promise.ify')

module.exports = function (router,body,connection){
    
    const selectListOrderByQueue = `select * from loan_list order by queue`
    const selectListTags = `select * from loan_list_tags`

    router.get('/api/list/:id',body, async ctx => {

        const id = ctx.params.id === 'small' ? 1 : ctx.params.id === 'middle' ? 2 : 3;        
        const ListResult = await pify(connection.query, connection)(selectListOrderByQueue)
        const TagResult = await pify(connection.query, connection)(selectListTags)


        let Result = ListResult[0].filter(function (item) {
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
                for(let j = 0; j < TagResult[0].length;j++){

                    if(item.tag[i] == TagResult[0][j].id){
                        item.tag[i] = TagResult[0][j].tag;
                    }
                }
            }

        });

        ctx.body = Result

    })
};


