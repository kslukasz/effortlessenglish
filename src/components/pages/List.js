import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom'

import '../css/List.css'
import AppContext from '../AppContext';
import { wordToLern } from '../Myfunctions.js'

function List({ element, moduleList }) {
    const { data, userData, setUserData } = useContext(AppContext);
    const handleModuls = (element, index) => {
        const copySesion = JSON.parse(JSON.stringify(userData));
        copySesion.settings.sesion.length = 0;
        copySesion.settings.sesion.push(element);
        copySesion.settings.sesion.push(index);
        setUserData(copySesion);
    }

    const modulsListArray = data[element].moduls.map((el, index) => {
        const remaingWords = wordToLern(data[element].moduls[index].content, userData).length;
        const allWords = data[element].moduls[index].content.length
        const percent = Math.floor((allWords - remaingWords) / allWords * 100);
        return (
            <NavLink to='/letslern' className="modulelink" key={element + data[element].moduls[index].title} onClick={() => handleModuls(element, index)}>
                <div className='cont_row contProgress'>
                    <div className='Moduletitle'>{el.title}</div><div className='progress'><div className='contentProgress' style={{ width: `${percent}%` }}></div></div><div className='percent'>{percent} %</div>
                </div>
            </NavLink>
        )
    })

    return (
        <div className={`cont_column list ${moduleList[element].list ? "long" : ""}`}>
            {modulsListArray}
        </div>

    );
}

export default List; 