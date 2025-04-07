import { useEffect, useState } from 'react'
import styles from "./WordTile.module.css";
import { isSpecialChar } from './GlobalFunctions';

export function WordTile({gameData,letter,guessRow,letterIndex})
{
    useEffect(()=>{
//        console.log("change in wordtile state detected",guessRow,letterIndex);
      },[gameData]
      );

      function getStyleForLetter(letter,position)
      {
        if(isSpecialChar(gameData.word[position])) 
            {
  //              console.log(letter,position,"is special");
                return styles.tileSpecialChar;
            }
        const colours=gameData.lettercolours[guessRow];
        if(colours[position]==='G') return styles.tileMatch;
        if(colours[position]==='O') return styles.tileMatchClose;
        if(colours[position]==='_') return styles.tileNoMatch;
        return styles.tile;
      }

    if( gameData.currentGuess>guessRow)
    {
        // encode tile colours
    
    }

    return <td className={getStyleForLetter(letter,letterIndex)}>{letter}</td>;
}