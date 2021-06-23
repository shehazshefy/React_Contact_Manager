import React, { useRef } from 'react';
import {Link} from 'react-router-dom';
import ContactCard from './ContactCard';

const ContactList = (props) => {
    // console.log(props);
    //Inititalise the useRef
    const inputElement = useRef("");

    const deleteContactHandler = (id) => {
        props.getContactIdPropFromApp(id);
    };


    const renderContractList = props.contactsPropFromApp.map((contact) => {    //Iterating through the ContactList 
    // const renderContractList = contactsPropFromApp.map((contact) => {    
    return(
            <ContactCard key={contact.id} contactsPropFromCL={contact} clickHandlerPropFromCL={deleteContactHandler}/>   
            //Passing each contact to ContactCard
            //Passing function clickHandler to CC to get id
        );
    });

    //To show the use of useRef
    const getSearchTerm = () => {
        // console.log(inputElement.current.value);
        props.searchResultPropFromApp(inputElement.current.value)
    };

    return(
        <div className='main'>
            <div className='ui container'>

                <h2>
                    Contact List
                    <Link to='/add'>
                        <button className='ui button blue right floated'>Add Contact</button>
                    </Link>
                </h2>

                <div className='ui search'>
                    <div className='ui icon input fluid'>
                        <input 
                            ref={inputElement}
                            type='text' 
                            placeholder='Search Contact'
                            className='prompt'
                            value={props.searchTermPropFromApp}
                            onChange={getSearchTerm}
                        />
                        <i className='search icon'></i>
                    </div>

                </div>

                <div className='ui celled list'>{renderContractList.length > 0 ? renderContractList : "No Contacts Available"}</div>

            </div>
            
        </div>
        
    );
};

export default ContactList;