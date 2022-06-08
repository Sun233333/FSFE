import logo from './logo.svg';
import React from "react";
import './App.css';
import Start from "./components/Start.js"
import Questions from "./components/Questions.js"
import {nanoid} from "nanoid"


function App() {


  const [start, setStart] = React.useState(true)
  const [quizData, setQuizData] = React.useState(() => [])
  const [playAgain, setPlayAgain] = React.useState(0);
  

  
  
  React.useEffect(() => {
        
    fetch("https://opentdb.com/api.php?amount=5&type=multiple")
        .then(res => res.json())
        .then((data) => 
        {
        setQuizData(data.results);
        addKey()
        })
        
        

    },[playAgain])

    console.log(quizData)



    function addKey() {
      setQuizData((prevData) => (prevData.map(element => ({...element, key: nanoid()}))))
    }


    function changeDisplay() {
      setStart(prevState => !prevState)
    }

    function changePlayAgain() {
      setPlayAgain(counter => counter + 1)
    }

    

  

  return (
    <div className="App">
      {start 
      ? <Start changeDisplay={changeDisplay}/> 
      : <Questions 
        quizData={quizData}
        changePlayAgain={changePlayAgain}
        />}
    </div>
  );
}

export default App;


