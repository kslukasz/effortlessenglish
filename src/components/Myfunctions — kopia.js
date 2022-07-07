// import React from 'react';

function RandomWord(dataToLern , dataContent) {
    if (dataToLern.length !== 0 ){        
        const random = Math.floor(Math.random() * (dataToLern.length));        
    const word = dataToLern[random].split("?");
    const copydatatoLern = [...dataToLern];
    // console.log(dataContent)
    const copydataContent = [...dataContent];
    const resultdata = copydataContent.filter((element)=>{
        return ( !element.includes(copydatatoLern[random])         
        )
    });  
    // copydatatoLern.splice(random, 1);
    const result = [];
    let i = 0;
    while (i < 5) {
        const randomanswer = Math.floor(Math.random() * (resultdata.length));
        const word = resultdata[randomanswer].split("?");
        resultdata.splice(randomanswer, 1);
        result.push(word[0]);
        i++;
    }
    const randomRight = Math.floor(Math.random() * result.length);
    result.splice(randomRight, 0, word[0])
    return (
        {
            EN: word[0],
            PL: word[1],
            wordIndex:random,
            dataToLern,
            indexModuls: random,
            indexRight: randomRight,
            answer: result,
        }
    );
    } else return {answer:[],dataToLern:[]}
}

function wordToLern(dataContent, userDataContent) {
    const copyDataContent = [...dataContent];
    const copyUserDataContent = [...userDataContent];
    const result = copyDataContent.filter((element)=>{
        return (
         !copyUserDataContent.includes(element)
        )
    }); 
    return result;
}

function compareData(fullData, userData) {
    // console.log(fullData);
    let copyUserData = { ...userData }

    const keyTablefullData = Object.keys(fullData);
    if (copyUserData === null) {
        copyUserData = JSON.parse(JSON.stringify(fullData));
        const keyTableuserData = Object.keys(copyUserData);
        keyTableuserData.forEach((element) => {
            copyUserData[element].moduls.forEach((el) => {
                el.content.length = 0;
            })
        }); return copyUserData;
    } else {
        const keyTableuserData = Object.keys(copyUserData);
        keyTablefullData.forEach((element, index) => {
            if (keyTablefullData[index] !== keyTableuserData[index]) {
                const modules = JSON.parse(JSON.stringify(fullData[element].moduls));
                copyUserData[element] = {
                    name: fullData[element].name,
                    moduls: modules,
                }
                copyUserData[element].moduls.forEach((el) => {
                    el.content.length = 0;
                });
            }
        });

        keyTablefullData.forEach((nextelement) => {
            let userModuls = JSON.parse(JSON.stringify(copyUserData[nextelement].moduls));
            const fullModuls = JSON.parse(JSON.stringify(fullData[nextelement].moduls));
            if (userModuls.length !== fullModuls.length) {
                for (let i = userModuls.length; i < fullModuls.length; i++) {
                    const emptymodul = JSON.parse(JSON.stringify(fullModuls[i]));
                    emptymodul.content.length = 0;
                    userModuls.push(emptymodul);
                    copyUserData[nextelement].moduls.push(emptymodul);
                };
            }
        });
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


export { RandomWord, testLocalStorage, readLocalStorage, compareData ,wordToLern};