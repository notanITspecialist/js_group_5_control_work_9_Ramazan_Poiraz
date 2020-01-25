import React, {useState} from 'react';
import Button from "reactstrap/es/Button";
import {FormGroup, Input, Label, Form} from "reactstrap";
import axios from "axios";

const AddNewUser = props => {
    const initialNewUser = {
        name: '',
        phone: '',
        mail: '',
        photo: ''
    };
    const [newUser, setNewUser] = useState(initialNewUser);

    const addChange = e => setNewUser({...newUser, [e.target.name]: e.target.value});

    const addNewContact = async () => {
      await axios.post('https://lesson-69-ramazan.firebaseio.com/ramazan-contacts.json', newUser);
    };

    return (
        <div>
            <img style={{maxWidth: '40%', float: 'right'}} src={newUser.photo} alt={newUser.name} />
                <Form className='w-50' onSubmit={async e => {
                    e.preventDefault();
                    // props.addUser(newUser);
                    await addNewContact();
                    props.history.replace('/')
                }}>
                    <FormGroup>
                        <Label for="examplePassword">Name</Label>
                        <Input placeholder='name' required className='d-block' value={newUser.name} name='name' onChange={addChange} />
                    </FormGroup>
                    <FormGroup>
                        <Label for="examplePassword">Photo</Label>
                        <Input placeholder='photo' required className='d-block' value={newUser.photo} name='photo' onChange={addChange} />
                    </FormGroup>
                    <FormGroup>
                        <Label for="examplePassword">Phone</Label>
                        <Input placeholder='phone' required className='d-block' value={newUser.phone} name='phone' onChange={addChange} type='number' />
                    </FormGroup>
                    <FormGroup>
                        <Label for="examplePassword">Email</Label>
                        <Input placeholder='mail' required className='d-block' value={newUser.mail} name='mail' onChange={addChange} type='email' />
                    </FormGroup>
                    <Button color='secondary'>Add</Button>{' '}
                    <Button color='secondary' onClick={() => props.history.replace('/')} >Back to contacts</Button>
                </Form>
        </div>
    );
};

export default AddNewUser