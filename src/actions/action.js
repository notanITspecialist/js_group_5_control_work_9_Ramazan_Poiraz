export const SAVE_CHANGES = 'SAVE_CHANGES';
export const DELETE_USER = 'DELETE_USER';

export const ADD_USER = 'ADD_USER';

export const saveChanges = (index, data) => ({type: SAVE_CHANGES, index, data});
export const deleteUser = index => ({type: DELETE_USER, index});

export const addUser = data => ({type: ADD_USER, data});