import {ADD_USER, DELETE_USER, SAVE_CHANGES} from "../actions/action";

const initialState = {
    contacts: [
        {name: 'Anna', phone: '996555555555', mail: 'some@gmail.com', photo: 'https://shkolazhizni.ru/img/content/i109/109434_or.jpg'},
        {name: 'Alex', phone: '996555555666', mail: 'alex@gmail.com', photo: 'http://aforisma.ru/wp-content/uploads/2019/06/305e7d45f04e1b79-1024x682.jpg'},
        {name: 'Лёха', phone: '88005553535', mail: 'dom-money@gmail.com', photo: 'https://i.ytimg.com/vi/UvSJldG9MIw/hqdefault.jpg'},
        {name: 'Joseph', phone: '996123456789', mail: 'sovet@gmail.com', photo: 'https://histrf.ru/uploads/media/person/0001/21/thumb_20880_person_full.png'},
    ]
};

const reducer = ( state = initialState, action ) => {
    if(action.type === SAVE_CHANGES){
        const newContacts = state.contacts;
        newContacts.splice(action.index, 1);
        newContacts.unshift(action.data);
        return {...state, contacts: newContacts}
    }
    if(action.type === DELETE_USER){
        const newContacts = state.contacts;
        newContacts.splice(action.index, 1);
        return {...state, contacts: newContacts}
    }
    if(action.type === ADD_USER){
        const newContacts = state.contacts;
        newContacts.unshift(action.data);
        return {...state, contacts: newContacts}
    }
    return state
};

export default reducer