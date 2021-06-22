import React from 'react';
import { Link } from 'react-router-dom';
import user from '../images/user.png'

const CardContact = (props) => {
    const {id, name, email} = props.contactsPropFromCL;
    return(
        <div className='item'>
            <img className='ui avatar image' src={user} alt="user" />
            <div className='content'>
                <Link to={{pathname:`/contact/${id}`, state: {contact: props.contactsPropFromCL}}}>
                    <div className='header'>{name}</div>
                    <div>{email}</div>
                </Link>
                
            </div>
            <i 
                className='right floated content trash alternate outline icon' 
                style={{ color: "red", marginTop: "7px", marginLeft: "10px" }}
                onClick={() => props.clickHandlerPropFromCL(id)}>
            </i>

            <Link to={{pathname:'/edit', state: {contact: props.contactsPropFromCL}}}>
                <i 
                    className='right floated edit alternate outline icon' 
                    style={{ color: "blue", marginTop: "7px" }}>
                </i>
            </Link>
            

        </div>
    );
}

export default CardContact;