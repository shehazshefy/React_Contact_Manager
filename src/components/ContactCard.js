import React from 'react';
import user from '../images/user.png'

const CardContact = (props) => {
    const {id, name, email} = props.contactsPropFromCL;
    return(
        <div className='item'>
            <img className='ui avatar image' src={user} alt="user" />
            <div className='content'>
                
                <div className='header'>{name}</div>
                <div>{email}</div>
            </div>
            <i className='right floated content trash alternate outline icon' style={{ color: "red", marginTop: "7px" }}></i>
            {/* <div className='right floated content'>
                    <i className='trash alternate outline icon' style={{ color: "red", marginTop: "7px" }}></i>
                </div> */}
        </div>
    );
}

export default CardContact;