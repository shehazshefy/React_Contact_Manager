import React, { useEffect, useState } from 'react';
import './App.css';
import Header from './Header';
import AddContact from './AddContact';
import ContactList from './ContactList';

function App() {
  const LOCAL_STORAGE_KEY = "contactsKey";
  const [contacts, setContacts] = useState([]);

  const addContactHandler = (contact) => {
    console.log(contact)
    setContacts([...contacts, contact]);
  }

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
        <AddContact addContactHandler={addContactHandler}/>
        <ContactList contactsProp = {contacts}/> 
        {/* Passing contact list to ContactList as a prop */}
        
      </div>
      
    </div>
  );
}

export default App;
