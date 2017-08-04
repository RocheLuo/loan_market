

export default (state = {},action = {}) => {

    switch(action.type){
        case "SET_LIST":
            console.log(action.list);
            return {
                ...state,
                list:action.list
            }
        default:
            return state
    }
}