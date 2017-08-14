module.exports = function (router,body,connection){


    router.post(`/api/userinfo_01/`,body,ctx => {

        const info = {
            person:ctx.request.body.person,
            home_address:ctx.request.body.home_address,
            work_address:ctx.request.body.work_address,
            phoneNumber:ctx.request.body.phoneNumber
        }
        if(info.person != null && info.home_address != null && info.work_address!=null){
            connection.query(`
            update user_base_info
             set 
             personName="${info.person}",
             work_address ="${info.work_address}",
             home_address="${info.home_address}" 
             where phoneNumber = "${info.phoneNumber}"
             `,(err,result) => {
                if(err){
                    ctx.body = null
                }else{
                    ctx.body = result
                }
            })
        }else{
            ctx.body = {content:'未填写完全'}
        }


    })
}