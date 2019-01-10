import { LOGIN , LOGOUT } from '../actions/types';

const initialState = {
    login:{
        username: null,
        email : null,
        admin : null
    }
};

export default function(state = initialState, action){
    switch(action.type){
        case LOGIN:
            return{
                ...state,
                login: action.payload
            }
        case LOGOUT:
            return{
                ...state,
                login: action.payload
            }
        default:
            return state;
    }
}