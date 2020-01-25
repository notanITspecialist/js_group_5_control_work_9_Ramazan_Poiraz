import React, {useEffect, useState} from 'react';
import {connect} from "react-redux";
import {ListGroupItem, ListGroup} from "reactstrap";

import './Contacts.css'
import MyModal from "../../UI/MyModal/MyModal";
import nanoid from "nanoid";
import Button from "reactstrap/es/Button";
import {addContacts} from "../../actions/action";
import axios from "axios";

const Contacts = props => {

    const init = async () => {
      await props.addContactes()
    };

    useEffect(() => {
        init()
    }, []);

    const initialMoreInfoShow = {show: false};
    const [moreInfoShow, setMoreInfoShow] = useState(initialMoreInfoShow);

    const initialUserInfo = {
      info: {},
      index: null
    };
    const [userInfo, setUserInfo] = useState(initialUserInfo);

    const openMoreInfoShow = (index, elem) => {
        setUserInfo({...userInfo, index: index, info: elem});
        setMoreInfoShow({show: true});
    };
    const closeMoreInfoShow = () => {
        setMoreInfoShow({show: false});
    };

    const deleteUser = async index => {
        const isDelete = window.confirm('Вы действительно хотите удалить пользователя?');
        if(isDelete === true){
            await axios.delete('https://lesson-69-ramazan.firebaseio.com/ramazan-contacts/'+index+'.json');
            init();
            closeMoreInfoShow();
        }
    };

    const goToEdit = () => {
      props.history.replace('/edit/'+userInfo.index)
    };
    const contactsList = props.contacts && Object.keys(props.contacts).map(elem => {

        const liKey = nanoid();
        return <ListGroupItem onClick={() => openMoreInfoShow(elem,props.contacts[elem])} key={liKey}>
                <img alt={props.contacts[elem].name} src={props.contacts[elem].photo}/>
                <h2>{props.contacts[elem].name}</h2>
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
    addContactes: () => dispatch(addContacts()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Contacts);