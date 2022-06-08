import React from "react";


function Answer(props) {

        let styling;
        if(props.isHeld && !props.clickedCheck)
        {styling = "clickAnswer"}
        else if (props.clickedCheck && props.isHeld && props.isCorrect)
        {styling = "clickedCorrectAnswer"}
        else if (props.clickedCheck && !props.isHeld && props.isCorrect)
        {styling = "correctAnswer"}
        else if (props.clickedCheck && props.isHeld && !props.isCorrect)
        {styling = "clickedWrongAnswer"}
        else if (props.clickedCheck)
        {styling = "checkedWasClicked"}
        


    return (
        <button id={props.id} className={`Answer-Button 
            ${styling}
            
            

            ` }   onClick={props.clickFunction}>{props.value}</button> 

    )

};


export default Answer;