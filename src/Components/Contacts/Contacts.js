import React, {useState} from 'react';
import {connect} from "react-redux";
import {ListGroupItem, ListGroup} from "reactstrap";

import './Contacts.css'
import MyModal from "../../UI/MyModal/MyModal";
import nanoid from "nanoid";
import Button from "reactstrap/es/Button";
import {deleteUser} from "../../actions/action";

const Contacts = props => {

    const initialMoreInfoShow = {show: false};
    const [moreInfoShow, setMoreInfoShow] = useState(initialMoreInfoShow);

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
    };

    const deleteUser = index => {
        const isDelete = window.confirm('Вы действительно хотите удалить пользователя?');
        if(isDelete === true){
            props.deleteUser(index);
            closeMoreInfoShow();
        }
    };

    const goToEdit = () => {
      props.history.replace('/edit/'+userInfo.index)
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
                        <img style={{maxWidth: '200px', float: 'left', marginRight: '10px', display: 'block'}} alt={userInfo.info.name} src={userInfo.info.photo} />
                        <h5>{userInfo.info.phone}</h5>
                        <h5>{userInfo.info.mail}</h5>
                        <Button color='secondary' onClick={goToEdit}>Edit</Button>{' '}
                        <Button color='secondary' onClick={() => {deleteUser(userInfo.index)}}>Delete</Button>
            </MyModal>
        </div>
    );
};

const mapStateToProps = state => ({
    contacts: state.contacts.contacts
});

const mapDispatchToProps = dispatch => ({
    deleteUser: index => dispatch(deleteUser(index)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Contacts);