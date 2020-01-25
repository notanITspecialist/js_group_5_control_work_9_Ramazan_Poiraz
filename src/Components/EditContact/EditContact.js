import React, {useEffect, useState} from 'react';
import {connect} from "react-redux";
import {Form, FormGroup, Input, Label} from "reactstrap";
import Button from "reactstrap/es/Button";
import {saveChanges} from "../../actions/action";

const EditContact = props => {
    const initialUserInfo = {
        info: null,
        index: 0
    };
    const [userInfo, setUserInfo] = useState(initialUserInfo);

    useEffect(() => {
        setUserInfo({...userInfo, index: props.match.params.id  , info: props.contacts[props.match.params.id]});
    }, []);

    const editChange = e => setUserInfo({...userInfo, info: { ...userInfo.info, [e.target.name]: e.target.value} });

    return userInfo.info !== null && (
        <div>
            <img style={{maxWidth: '40%', float: 'right'}} src={userInfo.info.photo} alt={userInfo.info.name} />
            <Form className='w-50' onSubmit={e => {
                e.preventDefault();
                props.saveEdit(userInfo.index,userInfo.info);
                props.history.replace('/')
            }}>
                <FormGroup>
                    <Label for="examplePassword">Name</Label>
                    <Input className='d-block mb-2' required value={userInfo.info.name} name='name' onChange={editChange} type='text' />
                </FormGroup>
                <FormGroup>
                    <Label for="examplePassword">Photo</Label>
                    <Input className='d-block mb-2' required value={userInfo.info.photo} name='photo' onChange={editChange} type='text' />
                </FormGroup>
                <FormGroup>
                    <Label for="examplePassword">Phone</Label>
                    <Input className='d-block mb-2' required value={userInfo.info.phone} name='phone' onChange={editChange} type='number' />
                </FormGroup>
                <FormGroup>
                    <Label for="examplePassword">Email</Label>
                    <Input className='d-block mb-2' required value={userInfo.info.mail} name='mail' onChange={editChange} type='email' />
                </FormGroup>
                <Button color='secondary'>Save</Button>{' '}
                <Button color='secondary' onClick={() => props.history.replace('/')} >Back to contacts</Button>
            </Form>
        </div>
    );
};

const mapStateToProps = state => ({
    contacts: state.contacts.contacts
});

const mapDispatchToProps = dispatch => ({
    saveEdit: (index, data) => dispatch(saveChanges(index, data))
});

export default connect(mapStateToProps, mapDispatchToProps)(EditContact);