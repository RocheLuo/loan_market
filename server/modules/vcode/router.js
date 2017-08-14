import md5 from 'md5'
module.exports = function (router,body,connection){
    router.post('/api/vcode',body,(ctx) => {
        ctx.session.vcode = ctx.request.body.phoneNumber.slice(0,4);
        ctx.body = md5(ctx.request.body.phoneNumber.slice(0,4))
    })
}