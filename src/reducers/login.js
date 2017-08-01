const init = {
    login:{
        userName:null,
        phoneNumber:null,
        VCode:null
    }
}


export default (state = init,action = {}) => {
    switch(action.type){
        case "LOGIN":
            return{
                ...state,
                login:action.login
            }
        default:
            return state
    }
}