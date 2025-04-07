import { useEffect, useState } from 'react'
import { KeyButton } from "./KeyButton";
import styles from './Keyboard.module.css';

export function Keyboard({onKeyPressed,keyColours}){

    useEffect(()=>{
//        console.log("keyboard change in state detected");
      },[keyColours]
      );
    function handleClick(event) {
        onKeyPressed(event.target.innerText);
    };

    let keys = [
        {row:1,letter:"Q",state:"UnTried"},
        {row:1,letter:"W",state:"UnTried"},
        {row:1,letter:"E",state:"UnTried"},
        {row:1,letter:"R",state:"UnTried"},
        {row:1,letter:"T",state:"UnTried"},
        {row:1,letter:"Y",state:"UnTried"},
        {row:1,letter:"U",state:"UnTried"},
        {row:1,letter:"I",state:"UnTried"},
        {row:1,letter:"O",state:"UnTried"},
        {row:1,letter:"P",state:"UnTried"},

        {row:2,letter:"A",state:"UnTried"},
        {row:2,letter:"S",state:"UnTried"},
        {row:2,letter:"D",state:"UnTried"},
        {row:2,letter:"F",state:"UnTried"},
        {row:2,letter:"G",state:"UnTried"},
        {row:2,letter:"H",state:"UnTried"},
        {row:2,letter:"J",state:"UnTried"},
        {row:2,letter:"K",state:"UnTried"},
        {row:2,letter:"L",state:"UnTried"},

        {row:3,letter:"ENTER",state:"UnTried"},
        {row:3,letter:"Z",state:"UnTried"},
        {row:3,letter:"X",state:"UnTried"},
        {row:3,letter:"C",state:"UnTried"},
        {row:3,letter:"V",state:"UnTried"},
        {row:3,letter:"B",state:"UnTried"},
        {row:3,letter:"N",state:"UnTried"},
        {row:3,letter:"M",state:"UnTried"},
        {row:3,letter:"<-",state:"UnTried"},

    ];

    function getKeyStyle(letter)
    {
        if(letter==="ENTER" || letter==="<-") return "UnTried";
        if(keyColours.keys[letter.charCodeAt()-65]==='G') return "Match";
        if(keyColours.keys[letter.charCodeAt()-65]==='O') return "CloseMatch";
        return "UnTried";
    }

    return  <div>
        <table className={styles.keyboardTable}>
            <tbody>
                <tr>
                    {keys.map(k=>k.row===1?
                        (<td><KeyButton onClick={handleClick} key={k.letter} id={k.letter} letter={k.letter} status={getKeyStyle(k.letter)}/></td>):"")}
                </tr>
                </tbody>
                </table>
                <table className={styles.keyboardTable}>
            <tbody>
                <tr>
                    {keys.map(k=>k.row===2?
                        (<td><KeyButton onClick={handleClick} key={k.letter} letter={k.letter} status={getKeyStyle(k.letter)}/></td>):"")}
                </tr>
                </tbody></table>
                <table className={styles.keyboardTable}>
            <tbody>
                <tr>
                    {keys.map(k=>k.row===3?
                        (<td><KeyButton onClick={handleClick} key={k.letter} letter={k.letter} status={getKeyStyle(k.letter)}/></td>):"")}
                </tr>
            </tbody></table>
            </div>;
}