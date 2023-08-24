// import React from 'react';

function RandomWord(dataToLern, dataContent, settings) {
    if (dataToLern.length !== 0) {
        const random = Math.floor(Math.random() * (dataToLern.length));
        const word = dataToLern[random].split("?");
        const copydatatoLern = [...dataToLern];
        const copydataContent = [...dataContent];
        const resultdata = copydataContent.filter((element) => {
            return (!element.includes(copydatatoLern[random])
            )
        });                
        const result = [];
        let i = 0;
        while (i < (settings.level)) {
            const randomanswer = Math.floor(Math.random() * (resultdata.length));
            const wordresult = resultdata[randomanswer].split("?");
            resultdata.splice(randomanswer, 1);
            if (settings.language === "PL") {
                result.push(wordresult[0]);
            } else if (settings.language === "EN") {
                result.push(wordresult[1]);
            }
            i++;
        }
        const randomRight = Math.floor(Math.random() * result.length);
        if (settings.language === "PL") {
            result.splice(randomRight, 0, word[0])
        } else if (settings.language === "EN") {
            result.splice(randomRight, 0, word[1])
        }
        return (
            {
                EN: word[0],
                PL: word[1],
                wordIndex: random,
                dataToLern,
                indexModuls: random,
                indexRight: randomRight,
                answer: result,
            }
        );
    } else return { answer: [], dataToLern: [] }
}

function wordToLern(dataContent, userData) {
    const copyDataContent = [...dataContent];
    const copyUserDataContent = [...userData.words];
    const result = copyDataContent.filter((element) => {
        return (
            !copyUserDataContent.includes(element)
        )
    });
    return result;
}

function addToRepeat (randomData, userData) {   
    const copyUserData = JSON.parse(JSON.stringify(userData));
    const result = copyUserData.repeat.filter((element)=>{
        return(
            element.includes(randomData.dataToLern[randomData.indexModuls])
        )
    });
    if (result.length===0){
        copyUserData.repeat.push(randomData.dataToLern[randomData.indexModuls]);
    }    
    return copyUserData;    
}

function compareData(userData, key) {
    let copyUserData = JSON.parse(JSON.stringify(userData));
    const copykey = [...key]
    if (copyUserData === null) {
        copyUserData = {
            words: [],
            repeat: [],
            settings: {
                language: "PL",
                sesion: [copykey[0], 0],
                level:5,
                darkmode: false,
            }
        }; return copyUserData;
    }
    else {
        return copyUserData;
    };
}
function testLocalStorage() {
    try {
        localStorage.setItem("test", "test");
        localStorage.removeItem("test");
        return true;
    } catch (event) {
        return false;
    }
}

function readLocalStorage(userData) {
    const storageList = JSON.parse(localStorage.getItem(userData));
    return storageList;
}

function saveLocalStorage(data, namedata) {
    localStorage.setItem(namedata, JSON.stringify(data))
}


export { RandomWord, testLocalStorage, readLocalStorage, saveLocalStorage, compareData, wordToLern, addToRepeat };