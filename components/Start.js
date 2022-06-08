import React from "react"


function Start(props) {


    return (
        <div className="Start-Wrapper">
            
            
            <div className="Start-Text">
                <h2 className="Start-Title">Quizzical</h2>

                <p className="Start-Description">Answer the following Questions and check your results</p> 

            </div>
            <button className="Button Starter-Button" onClick={props.changeDisplay}>Start Quiz</button>

        </div>
    )
}


export default Start;