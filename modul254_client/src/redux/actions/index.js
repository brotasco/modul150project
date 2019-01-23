import { USER_LOGIN, USER_LOGOUT } from "../constants/actionTypes";

const login = (payload) => {
    return {type: USER_LOGIN, payload}
} 

const logout = (payload) => {
    return {type: USER_LOGOUT, payload}
}

export{
    login,
    logout
}