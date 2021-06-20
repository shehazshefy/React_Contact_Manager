import React, { useState } from 'react';
import './App.css';
import Header from './Header';
import AddContact from './AddContact';
import ContactList from './ContactList';

function App() {
  const [contacts, setContacts] = useState([]);

  const addContactHandler = (contact) => {
    console.log(contact)
    setContacts([...contacts, contact]);
  }

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
