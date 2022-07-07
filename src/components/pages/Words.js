import React, { useContext, useState} from 'react';
import List from './List.js'
import AppContext from '../AppContext';
import '../css/Words.css'

function Words() {
    const { data } = useContext(AppContext);
    const keyTable = Object.keys(data);
    
    const createModuleList = () => {
        const variableObject = {}
        keyTable.forEach((element) => {
            variableObject[element] = {
                list: false,                
            }
        });
        return variableObject;
    }

    const [moduleList, setModuleList] = useState(createModuleList())    
    
    const handleClickSelect = (element) => {  
        const copyModuleList = {...moduleList}  
        copyModuleList[element].list = !copyModuleList[element].list;
        setModuleList(copyModuleList) ;        
    }    

    const result = keyTable.map((element, index) => {
        return (
            <div className='cont_column words' key={data[element].name}>
                <div className='title fontBig'>
                    {data[element].name}
                </div>
                <div className='cont_row modul' onClick={()=>handleClickSelect(element)}>
                    <span>Wybierz muduł</span>
                    <span className={`material-symbols-outlined ${moduleList[element].list ? "rotate" : ""}`}>
                        chevron_right
                    </span>                   
                </div>
                <List
                element={element}
                moduleList={moduleList}
                />
            </div>
        )
    })       
    return (        
        <div className='cont_row flexgrow'>
            {result}
        </div>
    );
}

export default Words;