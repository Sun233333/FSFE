import React from "react";
import Question from "./Question.js"
import {nanoid} from "nanoid"
import Answer from "./Answer.js"


function Questions(props) {


    
    
    
    const [answersData, setAnswersData] = React.useState(getAnswersFromAPI_2(props.quizData))
    const [test, setTest] = React.useState("")
    const [correctAnswers, setCorrectAnswers] = React.useState(0);
    const [clickedCheck, setClickedCheck] = React.useState(false)


    React.useEffect(() => {
        setAnswersData(getAnswersFromAPI_2(props.quizData))
        setClickedCheck(false)


    },[props.quizData])



    function htmlDecode(input) {
        var doc = new DOMParser().parseFromString(input, "text/html");
        return doc.documentElement.textContent;
      }
    

    function getAnswersFromAPI_2(database) {
        const answersArray = [];
        let counter = 0;
        database.forEach((qelement) => {
            answersArray.push([])    
            qelement.incorrect_answers.forEach(aelement => answersArray[counter].push({
                answer: aelement,
                id: nanoid(),
                key: nanoid(), 
                isHeld: false,
                isCorrect: false, 
                question: qelement.question}))
            answersArray[counter].splice(generateRandomInteger(answersArray[counter].length), 0, {
                answer: qelement.correct_answer, 
                id: nanoid(), 
                key: nanoid(), 
                isHeld: false, 
                isCorrect: true,
                question: qelement.question
            })
            counter++

        })
        

       return answersArray

    } 

    

    function formAnswersToHTML(answers) {
        const mappedArray = answers.map((element) => {
            
            return <Answer 
                id={element.id} 
                className={`Answer-Button`}  
                clickFunction={() =>markQuestion(element.id, element.question)} 
                value={htmlDecode(element.answer)} 
                isHeld={element.isHeld}
                isCorrect={element.isCorrect}
                key={element.key}
                question={element.question}
                clickedCheck={clickedCheck} />
        
        })
        

        return mappedArray

    }

    

    function markQuestion(id, question) {
        setAnswersData(
            oldData =>
            oldData.map(element => element.map(element => {
                
                if(element.question === question && element.id !== id) {
                    return{...element, isHeld: false}
                }
                else if(element.id === id)
                {
                    return {...element, isHeld: !element.isHeld}
                 }

                else{
                    return {...element}
                }
                }
        )))



    }

    function checkAnswers() {
        let counter = 0;
        answersData.forEach(element => element.forEach(element => {
            if(element.isHeld && element.isCorrect)
            counter++
        })) 



        setCorrectAnswers(counter);
        setClickedCheck(true)
    }

    
        
    function generateRandomInteger(max) {
        return Math.floor(Math.random() * max);
    }

    function startNewGame() {
        
        props.changePlayAgain()
    }
    
    
    


   


    return (
        <div className="Questions-Wrapper">

            <div className="Questions-Content-Wrapper">

                <Question
                    key={nanoid()}
                    question={props.quizData[0].question}
                    answers={formAnswersToHTML(answersData[0])}
                />
                <Question 
                    key={nanoid()}
                    question={props.quizData[1].question}
                    answers={formAnswersToHTML(answersData[1])}
                />
                <Question 
                    key={nanoid()}
                    question={props.quizData[2].question}
                    answers={formAnswersToHTML(answersData[2])}
                />
                <Question 
                    key={nanoid()}
                    question={props.quizData[3].question}
                    answers={formAnswersToHTML(answersData[3])}
                />

                <Question 
                    key={nanoid()}
                    question={props.quizData[4].question}
                    answers={formAnswersToHTML(answersData[4])}
                />


            </div>
            

            {clickedCheck
            ?   <div className="End-Area">
                    <p className="End-Text">You scored {correctAnswers}/{props.quizData.length} correct answers</p> <button className="Button newGame-Button" onClick={startNewGame}>Play Again</button>
                </div>
            : <button className="Button Check-Button" onClick={checkAnswers}>Check Answers</button> } 
            
            
            

            


            

        </div>

    )
}

export default Questions;