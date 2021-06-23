import React, { useEffect, useState } from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import {v4 as uuid} from 'uuid';
import api from '../api/contacts'
import './App.css';
import Header from './Header';
import AddContact from './AddContact';
import ContactList from './ContactList';
import ContactDetail from './ContactDetail';
import EditContact from './EditContact';

function App() {
  const [contacts, setContacts] = useState([]);

  //useState hook for the searchContact
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  
  /*
  //v1 - To add the new Contacts - Deprecated
  const addContactHandler = (contact) => {
    console.log(contact)
    setContacts([...contacts, { id: uuid(), ...contact }]);
  }
  */

  //v2 - To post the new contacts to json server
  const addContactHandler = async (contact) => {
    console.log(contact)
    const request = {
      id: uuid(),
      ...contact,
    }
    const response = await api.post("/contacts", request);
    setContacts([...contacts, response.data]);
  };

  //To update the contacts.
  const updateContactHandler = async(contact) => {
    const response = await api.put(`/contacts/${contact.id}`, contact);
    const {id, name, email} = response.data;
    setContacts(
      contacts.map((contact) => {
      return contact.id === id ? {...response.data} : contact;
    })
    );
  };

  /*
  //v1 - To delete contacts - Deprecated
  const removeContactHandler = (id) => {
    const newContactsList = contacts.filter(
      (contact) => {
        return (contact.id !== id);
      }
    );
    setContacts(newContactsList);
  };
  */

  //v2 - Delete Contact - post delete request
  const removeContactHandler = async (id) => {
    await api.delete(`/contacts/${id}`);
    const newContactsList = contacts.filter(
      (contact) => {
        return (contact.id !== id);
      }
    );
    setContacts(newContactsList);
  };
  
  const searchHandler = (searchTerm) => {
    // console.log(searchTerm)
    setSearchTerm(searchTerm);
    if(searchTerm !== "") {
      const newContactList = contacts.filter (
        (contact) => {
          //Contact is a JS Object. We need to search on their values only!
          return Object.values(contact)
            .join(" ")
            .toLowerCase()
            .includes(searchTerm);
        }
      );
      setSearchResults(newContactList);
    }
    else {
      setSearchResults(contacts)
    }
  }

  /*
  //Fetch Data From LocalStorage and feed it to the application
  useEffect( () => {
    const retrivedContacts = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    if(retrivedContacts) setContacts(retrivedContacts);
  }, []);
  */

  //retrieve contacts from json server starts
 const retrieveContacts = async () => {
   const response = await api.get("/contacts");
   return response.data;
 }

  useEffect(() => {
    const getAllContacts = async() => {
      const allContacts = await retrieveContacts();
      if(allContacts) setContacts(allContacts);
    };
    
    getAllContacts();
  },[]);

  //retrieve contacts from json server ends

  // useEffect( () => {
    //localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(contacts));
  // }, [contacts]); //Save the data to local storage.

  return (
    <>

      <Router>
        <Header />
        <div className='ui container'>
          <Switch>

            <Route
              path='/' 
              exact 
              render = {(props) => (
                <ContactList 
                  {...props} 
                  contactsPropFromApp={searchTerm.length < 1 ? contacts : searchResults} 
                  getContactIdPropFromApp = {removeContactHandler}
                  searchTermPropFromApp = {searchTerm}
                  searchResultPropFromApp = {searchHandler}
                />
              )}
            />

            <Route
              path='/add' 
              render = {(props) => (<AddContact {...props} addContactHandlerProp={addContactHandler}/>)}
            />

            <Route
              path='/edit'
              render= {(props) => (<EditContact {...props} updateContactHandlerProp={updateContactHandler}/>)}
            />

            <Route
              path='/contact/:id' 
              component={ContactDetail}
            />

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
