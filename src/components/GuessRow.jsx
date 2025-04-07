import { useEffect, useState } from 'react'
import { WordTile } from "./WordTile";

export function GuessRow({gameData,guessRow})
{
    useEffect(()=>{
//          console.log("change in guessrow state detected",guessRow);
        },[gameData]
        );

    const thisGuess = gameData.guesses[guessRow].padEnd(gameData.word.length,"_");
    const letters = thisGuess.split(''); 
    
    return <tr>
        
        {letters.map((c,index)=>(<WordTile key = {index} 
        gameData={gameData}
        guessRow={guessRow}
        letterIndex={index}
        letter={c==='_'?' ':c}/>)
    )}
        
        </tr>;
}
