import { useEffect, useState } from 'react'
import './App.css'
import { GameBoard } from './components/GameBoard'
import { Keyboard } from './components/Keyboard'
import { Result } from './components/Result'
import { isSpecialChar } from './components/GlobalFunctions'
import { words } from './data/words';

import backImage1 from '../images/backgrounds/background1.png'
import backImage2 from '../images/backgrounds/background2.png'

import backImage3 from '../images/backgrounds/background3.jpg'
import backImage4 from '../images/backgrounds/background4.jpg'
import backImage5 from '../images/backgrounds/background5.jpg'
import backImage6 from '../images/backgrounds/background6.jpg'
import backImage7 from '../images/backgrounds/background7.jpg'
import backImage8 from '../images/backgrounds/background8.jpg'
import backImage9 from '../images/backgrounds/background9.jpg'
import backImage10 from '../images/backgrounds/background10.jpg'
import backImage11 from '../images/backgrounds/background11.jpg'
import backImage12 from '../images/backgrounds/background12.jpg'
import backImage13 from '../images/backgrounds/background13.png'
import backImage14 from '../images/backgrounds/background14.jpg'
import backImage15 from '../images/backgrounds/background15.jpg'
const backImageArry = [backImage1,backImage2,backImage3,backImage4,backImage5,backImage6,backImage7,backImage8,backImage9,
  backImage10,backImage11,backImage12,backImage13,backImage14,backImage15];


const backgroundimages = [
  "background1.png",
  "background10.jpg",
  "background11.jpg",
  "background12.jpg",
  "background13.png",
  "background14.jpg",
  "background15.jpg",
  "background2.png",
  "background3.jpg",
  "background4.jpg",
  "background5.jpg",
  "background6.jpg",
  "background7.jpg",
  "background8.jpg",
  "background9.jpg"];

const lsCurrentStreak = 'hodle_currentStreak';
const lsBestStreak = 'hodle_bestStreak';
const lsGuesses = 'hodle_guesses';
const lsDayIndex ='hodle_todayIndex';
const lsCurrentGuessIndex ='hodle_currentGuessIndex';


function App() {

  var todaysWord="";
  var indexForTodaysWord=0;
  var storageGuesses=["","","","","",""];
  var currentGuess=0;
  var storageLetterColours =["","","","","",""];
  var keycolourdata="__________________________";

  function setLetterColours(checkAnswer,currentGuess,keycolours)
  {
    let newkeyboardcolours = keycolours;
    let newlettercolours = currentGuess;
    let currentWord =currentGuess; 
    for(let i=0;i<checkAnswer.length;i++)
    {
      if( currentWord[i] === checkAnswer[i])
      { 
        const letterIndex = currentWord[i].charCodeAt()-65;
        newkeyboardcolours = replaceAt(newkeyboardcolours,letterIndex,"G");
        
        newlettercolours=replaceAt(newlettercolours,i,"G");
        checkAnswer=replaceAt(checkAnswer,i,'#');
        currentWord=replaceAt(currentWord,i,'#');
      }
      else newlettercolours=replaceAt(newlettercolours,i,"_");
    }
    // should now have removed correct matches
    // and place G in letter colours for those
    for(let i =0;i< currentWord.length;i++)
    {
      if(currentWord[i]==='#') continue;
      let foundLetterIndex = checkAnswer.indexOf(currentWord[i])
      if(foundLetterIndex>=0)
      {
        const letterIndex = currentWord[i].charCodeAt()-65;
        if(newkeyboardcolours[letterIndex]!=='G')
        {          
          newkeyboardcolours = replaceAt(newkeyboardcolours,letterIndex,"O");
        }

        newlettercolours=replaceAt(newlettercolours,i,'O');
        currentWord=replaceAt(currentWord,i,'#');
        checkAnswer=replaceAt(checkAnswer,foundLetterIndex,'#');
      }
    }
    return {newlettercolours,newkeyboardcolours};      
  }

  function LoadStorage()
  {
    var storageCurrentDay = localStorage.getItem(lsDayIndex);
    console.log("storageCurrentDay",storageCurrentDay);
    console.log("indexToday",indexForTodaysWord);
    if( storageCurrentDay != indexForTodaysWord)
    {
      // reset stats
      console.log("resetting stats");
      localStorage.setItem(lsDayIndex,indexForTodaysWord);
      localStorage.setItem(lsGuesses,JSON.stringify(storageGuesses));
      storageGuesses=["","","","","",""];
      storageLetterColours["","","","","",""];      

      if( storageCurrentDay > indexForTodaysWord+1)
      {
        // wipe streak
        localStorage.setItem(lsCurrentStreak,0);
      }      
    }
    else
    {
      // continue today
      console.log("continue today");
      storageGuesses = JSON.parse( localStorage.getItem(lsGuesses));
      if(storageGuesses===null)
        storageGuesses=["","","","","",""];
      console.log(storageGuesses);
      currentGuess=localStorage.getItem(lsCurrentGuessIndex);
    }

    console.log("LoadStorage end");
  }

  function InitializeData()
  {
    var now = new Date();
    var startDay = new Date(2025,3,1); // test start day - 0 index!
    var daysSinceEpoch = Math.floor(now/8.64e7);
    var startDayEpoch = Math.floor(startDay/8.64e7);
    var daySinceStart = daysSinceEpoch - startDayEpoch;
    indexForTodaysWord= daySinceStart % words.length;
    todaysWord = words[indexForTodaysWord].toUpperCase();
  }

  function setupColourData()
  {
    storageLetterColours=[];
    for(let i=0;i<6;i++)
    {
      if(i<currentGuess)
      {
        var colourData = setLetterColours(todaysWord,storageGuesses[i],keycolourdata);
        keycolourdata = colourData.newkeyboardcolours;
        storageLetterColours.push(colourData.newlettercolours);        
      }
      else
      {
        storageLetterColours.push("");
      }
    }
  }


  /*
  Data to store - persistant:

  Stats:
  Total wins
  Total attempts
  Current streak
  Best Streak
  Last day played - linked to current streak

  current game:
  array of guesses


  TODO:
  1. Store which is the current guess 
  2. inform guess row if that row is a complete entry - to all correct colouring to be applied on page reload
  3. Stop further input if answer is correct
  4. Pop up correct or failed answer component 
  5. implement share button
  6. What? button
  7. Stats on which answers # are most common
  8. backgrounds
  9. Hosting - cloudflare?
  10. rename 
  */
  InitializeData();
  LoadStorage();
  setupColourData();
  
  console.log("tw",todaysWord);
  console.log("sg",storageGuesses);
  console.log("slc",storageLetterColours);
var initialState = {
  word:{todaysWord},
  guesses:[storageGuesses[0],storageGuesses[1],storageGuesses[2],storageGuesses[3],storageGuesses[4],storageGuesses[5]],
  lettercolours:[storageLetterColours[0],storageLetterColours[1],storageLetterColours[2],storageLetterColours[3],storageLetterColours[4],storageLetterColours[5]],
  currentGuess:currentGuess,
  gameStatus:"P" // Playing
};

console.log("word",todaysWord);
console.log("initstate",initialState);
  const [gameData,setGameData] = useState(initialState);
  gameData.word=todaysWord;
  const[keyboardData,setKeyboardData] = useState({keys:keycolourdata});


  function replaceAt(str,index,ch)
  {
    return str.substring(0,index)+ch+str.substring(index+1);
  }
  
  function onKeyPressed(keypressed)
  {
    if(gameData.gameStatus!="P") return;
    console.log(gameData.word);

    console.log(keypressed);
    // pass to game board
    // game board needs to look at key pressed
    // add letter to row, process guess if enter pressed
    // provide update to keyboard for letter colours

    if( keypressed === 'ENTER')
    {
      if(gameData.currentGuess>=6) return;
      if(gameData.guesses[gameData.currentGuess].length < todaysWord)
        return;
      // check we have enough letters
      console.log(gameData.word);

      const correctAnswer = gameData.word === gameData.guesses[gameData.currentGuess];
      if(correctAnswer)
      {
        var streak = localStorage.getItem(lsCurrentStreak);
        localStorage.setItem(lsCurrentStreak,streak+1);
      
        var bestStreak = localStorage.getItem(lsBestStreak);
        if(streak>bestStreak)
          localStorage.setItem(lsBestStreak,streak);
      }

      let colourData = setLetterColours(gameData.word,gameData.guesses[gameData.currentGuess],keyboardData.keys);
      // check latest guess and update encoding array
      // move the letter colour logic to separate function so we can call on page load for existing rows

      setGameData(prevState => ({
        ...prevState,
       lettercolours: prevState.lettercolours.map((lcolour, index) =>
          index === prevState.currentGuess ? colourData.newlettercolours : lcolour
      ),
        currentGuess: prevState.guesses[prevState.currentGuess].length===prevState.word.length? prevState.currentGuess+1:prevState.currentGuess,
        gameStatus: (correctAnswer?"W":prevState.currentGuess<6?"P":"L")

      }));

        setKeyboardData({keys:colourData.newkeyboardcolours});
    }
    else if(keypressed==='<-')
    {
      // delete
      console.log("deleting",keypressed);
      let lettersToDelete = 1;
      if(gameData.guesses[gameData.currentGuess].length>=2)
      {
        const prevLetter = gameData.word[gameData.guesses[gameData.currentGuess].length-1];
        console.log("first letter to delete = [",prevLetter,"]");
        if(isSpecialChar(prevLetter)) lettersToDelete++;
        console.log("need to delete special char");        
      }

      setGameData(prevState => ({
        ...prevState,
        guesses: prevState.guesses.map((guess, index) =>
            index === prevState.currentGuess && 
        prevState.guesses[prevState.currentGuess].length>0? 
        prevState.guesses[prevState.currentGuess].substring(0,prevState.guesses[prevState.currentGuess].length-lettersToDelete) : guess
        )
    }));
    }
    else  
    {
      console.log("adding",keypressed);

      // if next letter is special, auto add that first - dont forget to do similar for delete

      const nextLetter = gameData.word[gameData.guesses[gameData.currentGuess].length];
      const specialChar = isSpecialChar(nextLetter) ? nextLetter : "";
      
      console.log("checked for special chars");

      setGameData(prevState => ({
        ...prevState,
        guesses: prevState.guesses.map((guess, index) =>
            index === prevState.currentGuess && 
            prevState.guesses[prevState.currentGuess].length<prevState.word.length? 
              prevState.guesses[prevState.currentGuess]+specialChar+keypressed : guess
        )
    }));

    console.log("updated state");

    }

    // write to local storage
    localStorage.setItem(lsGuesses,JSON.stringify(gameData.guesses));
    localStorage.setItem(lsCurrentGuessIndex,gameData.currentGuess+1);
  }
  const todaysBackground = backImageArry[indexForTodaysWord % backImageArry.length];
  
  return (
    <div className="container" style={{backgroundImage:`url(${ todaysBackground })`}}>    
      <h1 className="title">Hodorle</h1>
      
        {gameData.gameStatus!="P" ? <Result gameData={gameData}/>:null}
      <GameBoard gameData={gameData}/>
      <Keyboard keyColours={keyboardData} onKeyPressed={onKeyPressed}/>
      </div>
    
  )
}

export default App
