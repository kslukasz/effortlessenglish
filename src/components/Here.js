import React, { useEffect, useState, useContext } from 'react';
import { useLocation, NavLink } from 'react-router-dom';
import AppContext from './AppContext';


import './css/Here.css'

function Here() {
    const { data, userData } = useContext(AppContext);
    const sesion = [...userData.settings.sesion];   
    const [here, setHere] = useState("Home");
    const { pathname } = useLocation();
    const convert = (path) => {
        switch (path) {
            case "/":
                setHere("Home");
                break;
            case "/words":
                setHere("Słówka");
                break;
            case "/mymenu":
                setHere("Moje menu");
                break;
            case "/letslern":
                setHere("Uczymy się");
                break;
            case "/settings":
                setHere("Ustawienia");
                break;
            default:
                setHere(path.substr(1));
        }
    }
    useEffect(() => {
        convert(pathname);
    }, [pathname])
    return (
        <div className='cont_column'>
            <div className='here'>
                <span>Jesteś tutaj:</span>
                <span className="material-symbols-outlined">double_arrow</span>
                <span>{here}</span>
            </div>
            {pathname==="/letslern" ? null :
                <NavLink to='/letslern'>
                    <div className='here'>
                        <span>Ostatnia sesja:&nbsp;</span>
                        <span>{data[sesion[0]].name}&nbsp;</span>
                        <span>{data[sesion[0]].moduls[sesion[1]].title}</span>
                    </div>
                </NavLink>
            }
        </div>
    );
}

export default Here;
<div className='cont_vertical'>
    <div className='link'>

    </div>

</div>