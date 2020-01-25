import React from 'react';
import Contacts from "./Components/Contacts/Contacts";
import {Route, Switch} from "react-router";
import AddNewUser from "./Components/AddNewUser/AddNewUser";
import EditContact from "./Components/EditContact/EditContact";

function App() {
  return (
    <div >
      <Switch>
          <Route path='/' exact component={Contacts}/>
          <Route path='/addUser' component={AddNewUser}/>
          <Route path='/edit/:id' component={EditContact}/>
      </Switch>
    </div>
  );
}

export default App;
