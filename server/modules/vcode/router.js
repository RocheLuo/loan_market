import md5 from 'md5'
module.exports = function (router,body,connection){
    router.post('/api/vcode',body,(ctx) => {
        console.log(ctx.request.body.phoneNumber)

        ctx.body = md5(ctx.request.body.phoneNumber.slice(0,4))
    })
}