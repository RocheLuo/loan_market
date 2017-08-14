import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'

import auth from './auth'
import header from './header'
import login from './login'
import list from './list'
import info from './info'

export default combineReducers({
    auth,
    header,
    login,
    list,
    info,
    router: routerReducer
})
