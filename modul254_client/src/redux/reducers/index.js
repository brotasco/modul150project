import { USER_LOGIN, USER_LOGOUT } from "../constants/actionTypes";

const initState = {
    user: null
}

const rootReducer = (state=initState, action) => {
    switch (action.type) {
        case USER_LOGIN:
          return Object.assign({}, state, {
            user: action.payload
          })
        case USER_LOGOUT:
          return Object.assign({}, state, {
            user: null
          })
        default:
          return state
    }
}

export default rootReducer;