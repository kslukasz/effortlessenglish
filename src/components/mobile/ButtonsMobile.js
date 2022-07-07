import React, {useContext} from 'react';
import { NavLink } from 'react-router-dom'
import AppContext from '../AppContext.js'
import '../css/ButtonsMobile.css'

function ButtonsMobile() {    
    const {checked , chandleClickChecked} = useContext(AppContext);    
    return (         
        <div className={`buttons_mobile cont_column ${checked==="checked"?'buttons_mobile_visible':null}`} style={{height:`${document.body.scrollHeight-71}px`}}>
            <NavLink to='/words' className='link_mobile fontVeryBig' onClick={chandleClickChecked}>
                <span className='material-symbols-outlined move'>
                    language
                </span>
                <span className={`paddingleft6`}>Słówka</span></NavLink>
            <NavLink to='/mymenu' className='link_mobile fontVeryBig' onClick={chandleClickChecked}>
                <span className="material-symbols-outlined move">
                    emoji_people
                </span>
                <span className={`paddingleft6`}>Moje menu</span></NavLink>
            <NavLink to='/settings' className='link_mobile fontVeryBig' onClick={chandleClickChecked}>
                <span className="material-symbols-outlined">
                    settings
                </span>
                <span className={`paddingleft6`}>Ustawienia</span></NavLink>
        </div>
     );
}

export default ButtonsMobile;