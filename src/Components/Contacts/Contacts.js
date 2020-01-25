import React, {Fragment, useState} from 'react';
import {connect} from "react-redux";
import {ListGroupItem, ListGroup} from "reactstrap";

import './Contacts.css'
import MyModal from "../../UI/MyModal/MyModal";
import nanoid from "nanoid";
import Button from "reactstrap/es/Button";
import {deleteUser, saveChanges} from "../../actions/action";

const Contacts = props => {

    const initialMoreInfoShow = {show: false};
    const [moreInfoShow, setMoreInfoShow] = useState(initialMoreInfoShow);

    const initialEditIndicator = {edit: false};
    const [editIndicator, setEditIndicator] = useState(initialEditIndicator);

    const initialUserInfo = {
      info: {},
      index: null
    };
    const [userInfo, setUserInfo] = useState(initialUserInfo);

    const openMoreInfoShow = phone => {
        const index = props.contacts.findIndex(elem => elem.phone === phone);
        setUserInfo({...userInfo, index: index, info: props.contacts[index]});
        setMoreInfoShow({show: true});
    };
    const closeMoreInfoShow = () => {
        setMoreInfoShow({show: false});
        cancelEdit()
    };

    const editUser = () => setEditIndicator({edit: true});
    const cancelEdit = () => setEditIndicator({edit: false});

    const editChange = e => setUserInfo({...userInfo, info: { ...userInfo.info, [e.target.name]: e.target.value} });

    const deleteUser = index => {
        const isDelete = window.confirm('Вы действительно хотите удалить пользователя?');
        if(isDelete === true){
            props.deleteUser(index);
            closeMoreInfoShow();
        }
    };

    const contactsList = props.contacts.map(elem => {
        const liKey = nanoid();
        return <ListGroupItem onClick={() => openMoreInfoShow(elem.phone)} key={liKey}>
                <img alt={elem.name} src={elem.photo}/>
                <h2>{elem.name}</h2>
            </ListGroupItem>
    });
    return (
        <div>
            <Button color='secondary' onClick={() => props.history.replace('/addUser') }>Add new user</Button>
            <ListGroup className='Contacts-list'>
                {contactsList}
            </ListGroup>
            <MyModal title={userInfo.info.name} show={moreInfoShow.show} close={closeMoreInfoShow}>
                {editIndicator.edit === false ?
                    <Fragment>
                        <img style={{maxWidth: '200px', float: 'left', marginRight: '10px', display: 'block'}} alt={userInfo.info.name} src={userInfo.info.photo} />
                        <h5>{userInfo.info.phone}</h5>
                        <h5>{userInfo.info.mail}</h5>
                        <Button color='secondary' onClick={editUser}>Edit</Button>{' '}
                        <Button color='secondary' onClick={() => {deleteUser(userInfo.index)}}>Delete</Button>
                    </Fragment> :
                    <Fragment>
                        <form onSubmit={e => {
                            props.saveEdit(userInfo.index, userInfo.info);
                            cancelEdit()
                        }}>
                            <img style={{maxWidth: '200px', float: 'right', marginRight: '10px'}} alt={userInfo.info.name} src={userInfo.info.photo} />
                            <input className='d-block mb-2' required value={userInfo.info.name} name='name' onChange={editChange} />
                            <input className='d-block mb-2' required value={userInfo.info.photo} name='photo' onChange={editChange} />
                            <input className='d-block mb-2' required value={userInfo.info.phone} name='phone' onChange={editChange} type='number' />
                            <input className='d-block mb-2' required value={userInfo.info.mail} name='mail' onChange={editChange} type='email' />
                            <Button color='secondary'>Save</Button>{' '}
                            <Button color='secondary' onClick={cancelEdit}>Cancel</Button>
                        </form>
                    </Fragment>
                }
            </MyModal>
        </div>
    );
};

const mapStateToProps = state => ({
    contacts: state.contacts.contacts
});

const mapDispatchToProps = dispatch => ({
    saveEdit: (index, data) => dispatch(saveChanges(index, data)),
    deleteUser: index => dispatch(deleteUser(index)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Contacts);