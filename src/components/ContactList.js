import React from 'react';
import {Link} from 'react-router-dom';
import ContactCard from './ContactCard';

const ContactList = (props) => {
    console.log(props);
    
    const deleteContactHandler = (id) => {
        props.getContactIdPropFromApp(id);
    };

    // const contactsPropFromApp = [
    //     {
    //         id: '1',
    //         "name": "Sachin",
    //         "email": "sachin@gmail.com"
    //     }
    // ]

    const renderContractList = props.contactsPropFromApp.map((contact) => {    //Iterating through the ContactList 
    // const renderContractList = contactsPropFromApp.map((contact) => {    
    return(
            <ContactCard key={contact.id} contactsPropFromCL={contact} clickHandlerPropFromCL={deleteContactHandler}/>   
            //Passing each contact to ContactCard
            //Passing function clickHandler to CC to get id
        );
    });



    return(
        <div className='main'>
            <h2>
                Contact List
                <Link to='/add'>
                    <button className='ui button blue right floated'>Add Contact</button>
                </Link>
                </h2>
            <div className='ui celled list'>{renderContractList}</div>
        </div>
        
    );
};

export default ContactList;