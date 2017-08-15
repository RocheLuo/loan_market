const request = require('request');

export default (phoneNumber,message,code) => {

    const baseUrl = 'http://hprpt2.eucp.b2m.cn:8080/sdkproxy/'
    const url = baseUrl + "sendsms.action"

    const cdKey = '0SDK-EBB-6699-RKSRN'
    const password= '386665'

    const date = Date.now().toString()
    const seqId = date.slice(date.length - 6)

    request(`${url}?cdkey=${cdKey}&password=${password}&phone=${phoneNumber}&message=${encodeURI(message)}&addserial=${code}&seqid=${seqId}}`,(err,response,body) => {
        if(err){
            console.log(err)
        }
    })
}


// console.log(test("18704019757",`您的验证码是：${ (Date.now()+Math.floor(Math.random()*10)).toString().slice(9)}`,345))