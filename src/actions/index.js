import axios from 'axios'
import md5 from 'md5';
export const SetTitle = (title) => {
    return {
        type:"SET_TITLE",
        title
    }
};


export const setList = (list) => {
    return {
        type:"SET_LIST",
        list
    }
};

export const getList = (type) => {
    return dispatch => {
        return axios.get("/api/list/"+type).then(res => {
            dispatch(setList(res.data))
        })
    }
};


export const addInfo = (info) => {
    return {
        type:"ADD_INFO",
        info
    }
};

export const setVCode = (code) => {
    return {
        type:"SET_VCODE",
        code
    }
}

export function getVCode(phoneNumber) {
    return dispatch => {
        return axios.post('/api/vcode',{'phoneNumber':phoneNumber}).then(res => {
            dispatch(setVCode(res))
        })
    }
}

export const sendInfo01 = (info) => {

    return dispatch => {
        return axios.post('/api/userinfo_01/',info).then()
    }

}