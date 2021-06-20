import React from 'react';
import ContactCard from './ContactCard';

const ContactList = (props) => {
    console.log(props);
    {/* Getting contact list from App.js as a prop */}

    const renderContractList = props.contactsProp.map((contact) => {    //Iterating through the ContactList 
        return(
            <ContactCard contactsPropFromCL = {contact}/>   //Passing each contact to ContactCard
        );
    });

    return(
        <div className='ui celled list'>{renderContractList}</div>
    );
};

export default ContactList;