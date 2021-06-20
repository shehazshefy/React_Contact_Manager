import React from 'react';
import ContactCard from './ContactCard';

const ContactList = (props) => {
    console.log(props);
    
    const deleteContactHandler = (id) => {
        props.getContactIdPropFromApp(id);
    }

    const renderContractList = props.contactsPropFromApp.map((contact) => {    //Iterating through the ContactList 
        return(
            <ContactCard key={contact.id} contactsPropFromCL={contact} clickHandlerPropFromCL={deleteContactHandler}/>   
            //Passing each contact to ContactCard
            //Passing function clickHandler to CC to get id
        );
    });



    return(
        <div className='ui celled list'>{renderContractList}</div>
    );
};

export default ContactList;