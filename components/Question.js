import React from "react";
import Answer from "./Answer.js"


function Question(props) {

    function htmlDecode(input) {
        var doc = new DOMParser().parseFromString(input, "text/html");
        return doc.documentElement.textContent;
      }
      
      


    return (
        <div className="Question-Wrapper">
            <div className="Quiz-Question">
                {htmlDecode(props.question)}
            </div>

            <div className="Quiz-Answers">
                {props.answers}
            </div>
        </div>
    )
}

export default Question;