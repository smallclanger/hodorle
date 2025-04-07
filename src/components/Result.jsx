import { useEffect, useState } from 'react'
import styles from "./Result.module.css";

export function Result({gameData})
{
    const gameWon = gameData.gameStatus==="W";
    const imgsrc = gameWon?"images/hodor_happy.png":"images/hodor_sad.png";
    return <div className={styles.resultBox}>
        
        <h1><img src={imgsrc} width="100px"/>Hodorle</h1>
        <br/>
        <h2>{gameWon?"You guessed right! Current Streak:":"You've run out of guesses! Game over!"}</h2>
        <br/>
        <h2>{gameData.word}</h2>
        <br/>
        <button>share</button>
        <br/>
        <br/>
        <button>Who/What?</button>
        <br/>
        <br/>
    </div>;
}
