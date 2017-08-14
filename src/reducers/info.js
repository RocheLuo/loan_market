
export default (state = {},action = {}) => {

    switch(action.type){
        case "SET_AD_URL":
            console.log(action.url);
            return {
                ...state,
                url:action.url
            }
        default:
            return state
    }
}