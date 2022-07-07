import React, {useContext} from 'react';
import AppContext from '../AppContext';
import '../css/Mymenu.css'

function Mymenu() {
    const { userData , setUserData } = useContext(AppContext);

    const deleteForever = (index) =>{
        const copyUserData = JSON.parse(JSON.stringify(userData));
        const arrayElement = copyUserData.repeat.splice(index,1);      
        copyUserData.words.push.apply(copyUserData.words,arrayElement)
        setUserData(copyUserData);

    }

    const showMe = (event)=>{        
        event.target.classList.add("display_none");
    }
    const repeat = userData.repeat.map((element , index)=>{
        const word = element.split("?");
        return(
            <div className='cont_row' key={word[1]}>
                {userData.settings.language==="PL" ? <div>{word[1]}</div> : <div>{word[0]}</div>}
                <div className='space'>-</div>
                {userData.settings.language==="PL" ? <><div className='hide'>{word[0]}<div className='mask' onClick={showMe}>{word[0]}</div></div> 
                <span className="material-symbols-outlined trash" onClick={()=>deleteForever(index)}>delete_forever</span></> :
                 <><div className='hide'>{word[1]}<div className='mask'>{word[1]}</div></div>
                 <span class="material-symbols-outlined trash" onClick={()=>deleteForever(index)}>delete_forever</span></>}
            </div>
        )
    })
    return ( 
        <div className='cont_column repeat'>
            <div className='fontBig'> Powtórka słówek </div>
            {repeat}
        </div>
     );
}

export default Mymenu;