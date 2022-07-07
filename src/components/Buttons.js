import React, {useContext} from 'react';
import { NavLink } from 'react-router-dom'
import AppContext from './AppContext.js'
import './css/Buttons.css'


function Buttons() {
    const {navView} = useContext(AppContext);
    let none = null;
    if (navView === 'medium'){
        none = 'display_none';
    } else none = null;   
    return (
        <div className='buttons cont_row'>
            <NavLink to='/words' className='link fontBig'>
                <span className='material-symbols-outlined move'>
                    language
                </span>
                <span className={`paddingleft6 ${none}`}>Słówka</span></NavLink>
            <NavLink to='/mymenu' className='link fontBig'>
                <span className="material-symbols-outlined move">
                    emoji_people
                </span>
                <span className={`paddingleft6 ${none}`}>Moje menu</span></NavLink>
            <NavLink to='/settings' className='link fontBig'>
                <span className="material-symbols-outlined settings">
                    settings
                </span>
                <span className={`paddingleft6 ${none}`}>Ustawienia</span></NavLink>
        </div>
    );
}

export default Buttons
