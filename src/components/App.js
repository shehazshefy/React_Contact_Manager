import React, { useEffect, useState } from 'react';
import {v4 as uuid} from 'uuid';
import './App.css';
import Header from './Header';
import AddContact from './AddContact';
import ContactList from './ContactList';

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
    <div>
      <Header />
      <div className='ui container'>
        <AddContact addContactHandlerProp={addContactHandler}/>
        <ContactList contactsPropFromApp={contacts} getContactIdPropFromApp={removeContactHandler}/> 
        {/* Passing contact list to ContactList as a prop */}
        {/* getting id : frm CC - CL - App */}
        
      </div>
      
    </div>
  );
}

export default App;
