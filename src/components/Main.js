import React from 'react';
import {Routes,Route} from 'react-router-dom'

import Words from './pages/Words.js'
import Mymenu from './pages/Mymenu.js';
import Lern from './pages/Lern.js';
import Settings from './pages/Settings.js'
import Home from './pages/Home.js'

function Main() {
    return ( 
        <div className='cont_column main'>
            <Routes>
                <Route path='/' element={<Home/>} />
                <Route path='/words' element={<Words/>} />
                <Route path='/mymenu' element={<Mymenu/>} />
                <Route path='/letslern' element={<Lern/>} />
                <Route path='/settings' element={<Settings/>} />
            </Routes>
        </div>
     );
}

export default Main;