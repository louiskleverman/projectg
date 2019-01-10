import { LOGIN, LOGOUT } from './types';

//Check cookies or smthn to get login info if needed
export function login(login){
    return function(dispatch){
        //to do instead of setState
        dispatch({
            type: LOGIN,
            payload : login
        })
    }
}

export function logout(){
    return function(dispatch){
        var login = {
            username : null,
            email : null,
            admin : null
        } 
        //to do instead of setState
        dispatch({
            type: LOGOUT,
            payload : login
        })
    }
}