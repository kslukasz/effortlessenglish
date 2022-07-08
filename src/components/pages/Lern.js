import React, { useContext, useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom'
import AppContext from '../AppContext';
import { RandomWord, wordToLern, addToRepeat } from '../Myfunctions.js'
import '../css/Lern.css'

function Lern() {

    const { data, userData, setUserData } = useContext(AppContext);
    const sesion = [...userData.settings.sesion];
    // const userDataContent = userData.words;
    const dataContent = data[sesion[0]].moduls[sesion[1]].content;

    const [checkedAnswer, setCheckedAnswer] = useState(false);
    const [randomData, setRandomData] = useState();
    const [answerVariable, setAnswerVariable] = useState();
    const [rightAnswer, setRightAnswer] = useState(false);

    const checkAnswer = (index) => {
        if (!checkedAnswer) {
            if (index === randomData.indexRight) {
                const copyAnswerVariable = [...answerVariable];
                copyAnswerVariable[index] = "correct";
                setAnswerVariable(copyAnswerVariable);
                setRightAnswer(true);
            } else {
                const copyAnswerVariable = [...answerVariable];
                copyAnswerVariable[index] = "incorrect";
                copyAnswerVariable[randomData.indexRight] = "correct";
                setAnswerVariable(copyAnswerVariable);
            }
        }
        setCheckedAnswer(true);
    }

    const checkClass = (index) => {
        if (answerVariable[index] === "correct" && userData.settings.darkmode) {
            return "correct darkmode"
        } else if (answerVariable[index] === "incorrect" && userData.settings.darkmode) {
            return "incorrect darkmode"
        } else if (answerVariable[index] === "correct") {
            return "correct"
        } else if (answerVariable[index] === "incorrect") {
            return "incorrect"
        } else if (checkedAnswer) {
            return "afteranswer"
        } else return "answer"
    }
    const chandleClickNext = () => {
        if (rightAnswer) {
            const copyUserData = JSON.parse(JSON.stringify(userData));
            copyUserData.words.push(randomData.dataToLern[randomData.wordIndex]);
            setUserData(copyUserData);
            // if (checkedAnswer)
        } else  {
            setUserData(addToRepeat(randomData, userData));
            nextWordRandoming();
        }
    }

    const result = () => {
        return (
            <div className='cont_row'>
                <span>{data[sesion[0]].name}</span>
                <span className="material-symbols-outlined">chevron_right</span>
                <span>{data[sesion[0]].moduls[sesion[1]].title}</span>
            </div>
        );
    }

    const content = () => {
        const answerArray = (
            randomData.answer.map((element, index) => {
                return (
                    <div className={`${checkClass(index)}`} key={element+index} onClick={() => checkAnswer(index)}>{element}</div>
                )
            })
        )
        if (randomData.answer.length === 0) {
            return (
                <>
                    <div className='cont_row left'><div><span>Pozostało: </span>{randomData.dataToLern.length} <span>słów</span></div></div>
                    <div>Wszystko rozwiązane !</div>
                    <NavLink to='/words' className='link fontBig'>
                        <span className='material-symbols-outlined move'>
                            language
                        </span><span className={`paddingleft6`}>Wybierz inny moduł</span></NavLink>
                </>
            )
        } else {
            let link;
            if (userData.settings.language === "PL") {
                link = (
                    <a href={`https://translate.google.com/?hl=pl&sl=pl&tl=en&text=${randomData[userData.settings.language]}`} target="blank">
                        <div className='fontBig header' tip="Kliknij aby zobaczyć więcej tłumaczeń">{randomData[userData.settings.language]}</div></a>
                )
            } else if (userData.settings.language === "EN") {
                link = (
                    <a href={`https://translate.google.com/?hl=pl&sl=en&tl=pl&text=${randomData[userData.settings.language]}`} target="blank">
                        <div className='fontBig header' tip="Kliknij aby zobaczyć więcej tłumaczeń">{randomData[userData.settings.language]}</div></a>
                )
            }

            return (
                <>
                    <div className='cont_row left'><div><span>Pozostało: </span>{randomData.dataToLern.length} <span>słów</span></div></div>
                    {link}
                    <div className='cont_row contanswer'>
                        {answerArray}
                    </div>
                    <button onClick={chandleClickNext} className="buttonNext">Dalej</button>
                </>
            )
        }
    }
    const nextWordRandoming = () => {
        const variableRandomData = (RandomWord(wordToLern(dataContent, userData), dataContent, userData.settings));
        setRandomData(variableRandomData);
        setAnswerVariable(new Array(variableRandomData.answer.length));
        setRightAnswer(false);
        setCheckedAnswer(false);
    }
    useEffect(() => {
        nextWordRandoming();
    }, [userData]);
    return (
        <>
            {randomData && answerVariable ?
                <div className='cont_column lern'>
                    {result()}
                    {content()}
                </div>
                : null
            }
        </>
    );
}

export default Lern;
