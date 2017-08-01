import axios from 'axios'
import setAuthorizationToken from '../utils/setAuthorizationToken'
import jwtDecode from 'jwt-decode'
import * as types from './types'

export function setCurrentUser(user) {
    return {
        type: types.SET_CURRENT_USER,
        user
    }
}


export function login(user) {
    return dispatch => {
        return axios.post('/api/users', user).then(res => {
            const token = res.data.token;
            if(token){
                sessionStorage.setItem('jwtToken', token);
                window.location.href = '/';
                setAuthorizationToken(token);
                dispatch(setCurrentUser(jwtDecode(token)))
            }
        })
    }
}
