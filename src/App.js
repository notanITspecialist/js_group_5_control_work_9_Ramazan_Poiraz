import React from 'react';
import Contacts from "./Components/Contacts/Contacts";
import {Route, Switch} from "react-router";
import AddNewUser from "./Components/AddNewUser/AddNewUser";

function App() {
  return (
    <div >
      <Switch>
          <Route path='/' exact component={Contacts}/>
          <Route path='/addUser' component={AddNewUser}/>
      </Switch>
    </div>
  );
}

export default App;
