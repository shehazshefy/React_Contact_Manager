import React, { useEffect, useState } from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import {v4 as uuid} from 'uuid';
import './App.css';
import Header from './Header';
import AddContact from './AddContact';
import ContactList from './ContactList';
import ContactDetail from './ContactDetail';

function App() {
  const LOCAL_STORAGE_KEY = "contactsKey";
  const [contacts, setContacts] = useState([]);

  const addContactHandler = (contact) => {
    console.log(contact)
    setContacts([...contacts, { id: uuid(), ...contact }]);
  }

  const removeContactHandler = (id) => {
    const newContactsList = contacts.filter(
      (contact) => {
        return (contact.id !== id);
      }
    );
    setContacts(newContactsList);
  };

  useEffect( () => {
    const retrivedContacts = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    if(retrivedContacts) setContacts(retrivedContacts);
  }, []);

  useEffect( () => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(contacts));
  }, [contacts]); //Save the data to local storage.

  return (
    <>


      <Router>
        <Header />
        <div className='ui container'>
          <Switch>
            <Route
              path='/' 
              exact 
              render = {(props) => (<ContactList {...props} contactsPropFromApp={contacts} getContactIdPropFromApp={removeContactHandler}/>)}
            />
            <Route
              path='/add' 
              render = {(props) => (<AddContact {...props} addContactHandlerProp={addContactHandler}/>)}
            />
            <Route path='/contact/:id' component={ContactDetail}/>
          </Switch>
        </div>
      </Router>


      {/* -----------------Bad way to send props inside Router. Causes performance issue---------------------
      <Router>
        <Header />
        <div className='ui container'>
          <Switch>
            <Route
              path='/' 
              exact 
              component={() => (
                <ContactList contactsPropFromApp={contacts} getContactIdPropFromApp={removeContactHandler}/>
              )} 
            />
            <Route
              path='/add' 
              component={() => (
                <AddContact addContactHandlerProp={addContactHandler}/>
              )} 
            />
          </Switch>
        </div>
      </Router> */}


      {/* ----------------Without Routing------------------------
      <Header />
      <div className='ui container'>
        <AddContact addContactHandlerProp={addContactHandler}/>
        <ContactList contactsPropFromApp={contacts} getContactIdPropFromApp={removeContactHandler}/> 
        Passing contact list to ContactList as a prop
        getting id : frm CC - CL - App
      </div> */}
      
    </>
  );
}

export default App;
