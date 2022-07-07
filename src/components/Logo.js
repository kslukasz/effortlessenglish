import React from 'react';
import { NavLink } from 'react-router-dom'

import './css/Logo.css'

function Logo() {    
    return (
        <NavLink to='/'>
        <div className='logo'>
            <div className='first_element'>effortless </div>
            <div className='second_element'>english</div>
        </div>
        </NavLink>
    );
}

export default Logo;
