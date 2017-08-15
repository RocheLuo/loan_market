import md5 from 'md5'
import sendMessage from './sendMessage'

module.exports = function (router,body,connection){
    router.post('/api/vcode',body,(ctx) => {

        const vcode = (Date.now()+Math.floor(Math.random()*10) + 1).toString().slice(9)
            
        sendMessage(ctx.request.body.phoneNumber,`借贷超市：您的验证码是:${vcode}`,666)
        ctx.session.vcode = vcode
        ctx.body = md5(vcode)

    })
}