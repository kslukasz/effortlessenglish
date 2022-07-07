import React, { useState, useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';

import Logo from './Logo.js'
import LogoMobile from './mobile/LogoMobile.js'
import Buttons from './Buttons.js'
import ButtonsMobile from './mobile/ButtonsMobile.js';
import Here from './Here.js';
import Main from './Main.js'
import AppContext from './AppContext.js';
import { testLocalStorage, readLocalStorage,saveLocalStorage, compareData } from './Myfunctions.js';
import data from './data/data.json'

import './css/App.css';

function App() {

  const keyTable = Object.keys(data);
  const [navView, setPageView] = useState("large");
  const [checked, setChecked] = useState(""); 
  const [testStorage, setTestStorage] = useState(false);
  const [userData, setUserData] = useState(compareData(null,keyTable));

  const chandleClickChecked = () => {
    if (checked === "checked") {
      setChecked("")
    } else { setChecked("checked") }
  }

  const chandleResize = () => {
    const app = document.querySelector(".App").clientWidth;
    if (app <= 1000 & app >= 700) {
      setPageView("medium")
    } else if (app < 700) {
      setPageView("small")
    } else { setPageView("large") }
  }

  useEffect(() => {    
    setTestStorage(testLocalStorage())
    chandleResize();
    window.addEventListener("resize", chandleResize);
    return () => {
      window.removeEventListener("resize", chandleResize);
    }
  }, [])
  useEffect(() => {
    if (testStorage) {
      const localData = readLocalStorage("userDataWords");
      setUserData(compareData(localData,keyTable));         
    }
  }, [testStorage]);
  useEffect(()=>{
    if (testStorage && userData){      
      saveLocalStorage(userData,"userDataWords");
    }
  },[userData])
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <AppContext.Provider value={{
        data: data,
        checked: checked,
        chandleClickChecked: chandleClickChecked,
        navView: navView,
        // sesion:sesion,      
        // setSesion:setSesion, 
        userData: userData,
        setUserData: setUserData,
      }}>
        <div className={`App cont_column ${userData.settings.darkmode ? "darkmode" : null}`}>
          <nav className='cont_row nowrap'>
            {navView === 'small'
              ? <><LogoMobile />
                <ButtonsMobile /></>
              : <><Logo />
                <Buttons /></>
            }
          </nav>
          <hr />
          <main className='cont_column'>
            {userData ?
              <><Here />
                <Main /></> : null}
          </main>
          <hr />
          <footer>
            created by : <a href="mailto:kslukasz@o2.pl" className='mail'>kslukasz@o2.pl</a>
          </footer>
        </div>
      </AppContext.Provider>
    </BrowserRouter>
  );
}

export default App;
