import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'

import auth from './auth'
import header from './header'
import login from './login'
import list from './list'

export default combineReducers({
    auth,
    header,
    login,
    list,
    router: routerReducer
})
