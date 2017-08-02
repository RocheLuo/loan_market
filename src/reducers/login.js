const init = {
        userName:null,
        phoneNumber:null,
        VCode:null
}


export default (state = init,action = {}) => {
    switch(action.type){
        case "LOGIN":
            return{
                ...state,
                login:action.login
            }
        case "SET_VCODE":
            return {
                ...state,
                VCode:action.code
            }
        default:
            return state
    }
}