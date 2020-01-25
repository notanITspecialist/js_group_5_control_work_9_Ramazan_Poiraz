import {REQUEST_INFO} from "../actions/action";

const initialState = {
    contacts: {}
};

const reducer = ( state = initialState, action ) => {
    if(action.type === REQUEST_INFO){
        return {...state, contacts: action.data}
    }
    return state
};

export default reducer