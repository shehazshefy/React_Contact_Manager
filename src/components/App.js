import React from 'react';
import './App.css';
import Header from './Header';
import AddContact from './AddContact';
import ContactList from './ContactList';

function App() {

const contacts = [
  {
    id: "1",
    name: "Shehaz",
    email: "shehaz@gmail.com"
  },
  {
    id: "2",
    name: "Shefy",
    email: "shefy@gmail.com"
  }
];

  return (
    <div>
      <Header />
      <div className='ui container'>
        <AddContact />
        <ContactList contactsProp = {contacts}/> 
        {/* Passing contact list to ContactList as a prop */}
        
      </div>
      
    </div>
  );
}

export default App;
