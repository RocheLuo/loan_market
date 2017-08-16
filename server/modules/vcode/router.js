import md5 from 'md5'
import sendMessage from './sendMessage'
import imgVCode from './imgVCode'
import pify from 'promise.ify'
import fs from 'fs'
import request from 'request'

global.imgvcode

module.exports = function (router,body,connection){

    router.post('/api/vcode',body,(ctx) => {

        const vcode = (Date.now()+Math.floor(Math.random()*10) + 1).toString().slice(7)
        const message = `【有钱用】您的验证码为：${vcode}，请于3分钟内输入验证，请勿向他人泄露。工作人员不会以任何方式向您索要短信验证码，谨防欺诈短信。`
        if(ctx.request.body.imgVCode == imgvcode){

            sendMessage(ctx.request.body.phoneNumber,message,666)
            //console.log('vcode is:',vcode)
            ctx.session.vcode = vcode
            ctx.session.imgvcode = global.imgvcode            
            ctx.body = md5(vcode)
            
        }else{
            ctx.body = null
        }


    })


    router.get('/api/imgvcode/',body, async ctx => {
        
        const result = imgVCode.get();
        const results = {
            txt:result[0],
            buf:result[1]
        }

        ctx.res.end(results.buf,() => {
            global.imgvcode = results.txt
        })
        
    })

    
}