var url = null;
module.exports = function(router,body,connection){
    connection.query(`select url from settings`,function (err,result) {

        setInterval(updateUrl(connection),1000)
        router.get('/api/getAdUrl',ctx => {
            let Url = (url == null)?result[0].url:url
            ctx.body = Url
        })
    })
}


function updateUrl(connection){
    return function(){
        connection.query(`select url from settings`,function(err,result){
            url = result[0].url
        })
    }
}

