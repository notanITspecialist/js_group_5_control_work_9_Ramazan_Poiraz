import axios from "axios";
export const REQUEST_INFO = 'REQUEST_INFO';
export const addUser = data => ({type: REQUEST_INFO, data});

export const addContacts = () => async dispatch => {
    const data = await axios.get('https://lesson-69-ramazan.firebaseio.com/ramazan-contacts.json');
    dispatch(addUser(data.data))
};
