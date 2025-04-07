import { useEffect, useState } from 'react'

import styles from "./GameBoard.module.css";
import { GuessRow } from "./GuessRow";

export function GameBoard({gameData})
{

    useEffect(()=>{
//        console.log("change in board state detected");
      },[gameData]
      );

    return <div>
        {gameData.word}
            <table className={styles.GameBoard}>
                <tbody>
                    <GuessRow gameData={gameData} guessRow={0}/>
                    <GuessRow gameData={gameData} guessRow={1}/>
                    <GuessRow gameData={gameData} guessRow={2}/>
                    <GuessRow gameData={gameData} guessRow={3}/>
                    <GuessRow gameData={gameData} guessRow={4}/>
                    <GuessRow gameData={gameData} guessRow={5}/>
                </tbody>
            </table>
            </div>;
}