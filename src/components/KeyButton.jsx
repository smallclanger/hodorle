import { useEffect, useState } from 'react'
import styles from "./KeyButton.module.css";

export function KeyButton({status,onClick,letter}){

    return <button onClick={onClick} className={`${styles[status]}`}>{letter}</button>;
}