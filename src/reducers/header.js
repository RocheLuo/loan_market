
const init  = {
    title:"not get value"
}


export default (state = init,action = {}) => {
    switch(action.type){
        case "SET_TITLE":
            return {
                ...state,
                title:action.title
            }
        default:
           return state
    }
}