import React, {useContext} from 'react';

import AppContext from '../AppContext';
import '../css/Settings.css'


function Setings() {   
    const {userData , setUserData} = useContext(AppContext);    

    const chandleSettings = (event , arg)=>{    
        const copyUserData = JSON.parse(JSON.stringify(userData));
            if (arg==="language"){
                if (copyUserData.settings.language==="PL"){
                    copyUserData.settings.language="EN";
                    setUserData(copyUserData);
                } else if (copyUserData.settings.language==="EN"){
                    copyUserData.settings.language="PL";
                    setUserData(copyUserData);
                }
            } else if(arg==="darkmode"){
                copyUserData.settings.darkmode=!copyUserData.settings.darkmode;
                setUserData(copyUserData);
            } else if (arg==="radio") {
                
                copyUserData.settings.level=Number(event.target.value);
                setUserData(copyUserData);
            }
            console.log(copyUserData)
    }
    const chandleReset =()=>{
        const copyUserData = JSON.parse(JSON.stringify(userData));
            copyUserData.settings.language="PL";            
            copyUserData.settings.level=5;
            copyUserData.settings.darkmode=false;
            setUserData(copyUserData);
    }
  
    return ( 
        <div className='cont_column settingsCont'>
            <div className='cont_row nowrap moduleSettings'>
                <div>Wybierz język nauki</div><div className='language' onClick={(event)=>chandleSettings(event, "language")}>{userData.settings.language}</div>
            </div>
            <div className='cont_row nowrap moduleSettings'>
                <div>Wybierz poziom trudności</div>
                <div className='radio'>
                   <div className='cont_row nowrap in'><input type="radio" name="level" value="2" id="easy" checked={userData.settings.level===2 ? true : false} onChange={(event)=>chandleSettings(event , "radio")}/> 
                   <label htmlFor="easy">Łatwy</label></div>
                   <div className='cont_row nowrap in'><input type="radio" name="level" value="5" id="normal" checked={userData.settings.level===5 ? true : false} onChange={(event)=>chandleSettings(event , "radio")}/> 
                   <label htmlFor="normal">Normalny</label></div>
                   <div className='cont_row nowrap in'><input type="radio" name="level" value="8" id="hard" checked={userData.settings.level===8 ? true : false} onChange={(event)=>chandleSettings(event , "radio")}/> 
                   <label htmlFor="hard">Trudny</label></div>
                   <div className='cont_row nowrap in'><input type="radio" name="level" value="11" id="vhard" checked={userData.settings.level===11 ? true : false} onChange={(event)=>chandleSettings(event , "radio")}/> 
                   <label htmlFor="vhard">B. trudny</label></div>
                </div>
            </div>
            <div className='cont_row nowrap moduleSettings'>
                <div>Ciemny motyw</div><input type="checkbox" checked={userData.settings.darkmode} onChange={(event)=>chandleSettings(event, "darkmode")}/>
            </div>
            <div className='cont_row nowrap moduleSettings'>
                <div>Ustawienia domyślne</div><div className='reset' onClick={chandleReset}>Resetuj</div>
            </div>
        </div>
     );
}

export default Setings;
