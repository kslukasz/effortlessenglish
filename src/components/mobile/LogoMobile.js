import React, {useContext} from 'react';
import { NavLink } from 'react-router-dom'
import AppContext from '../AppContext.js'

import '../css/LogoMobile.css'

function Logo() {
    const {checked , chandleClickChecked} = useContext(AppContext);    
    
    return (
        <>            
                <div className='menu cont_row' onClick={chandleClickChecked}>
                    <div className={`menu1 ${checked}`}></div>
                    <div className={`menu2 ${checked}`}></div>
                    <div className={`menu3 ${checked}`}></div>                    
                </div>           
            <NavLink to='/'>
                <div className='logo_mobile cont_row' onClick={checked==="" ? null : chandleClickChecked}>
                    <div className='first_element_mobile'>effortless </div>
                    <div className='second_element_mobile'>english</div>
                </div>
            </NavLink>
        </>
    );
}

export default Logo;
