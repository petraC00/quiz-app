import React from 'react'
import '../style/Quiz.css'
import { useLocation } from 'react-router-dom'
import axios from 'axios';
import { useEffect, useState } from 'react';
import Timer  from '../components/Timer'

const Quiz = () => {

  const [triviaQuestion, setTriviaQuestion] = useState([]);
  const [correctAnswer, setCorrectAnswer] = useState("");
  const [failsAnswer,setFailsAnswer] = useState(0)
  const [currentPoints, setCurrentPoints] = useState(0);
  const [allPossibleAnswers, setAllPossibleAnswers] = useState([]);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [enableButtons, setEnableButtons] = useState(true);
  
  const {state} = useLocation();
  const questionCategory = state ? state.id : null;
  const time = state ? state.time : null;
 
 
  async function combineAllAnswers(incorrectAnswers, correctAnswer) {
    let allAnswers = [];
    incorrectAnswers.map((item) => {
      item.incorrect_answers.map((incorrectAnswer) => {
        allAnswers.push(incorrectAnswer)
      });
    });
    allAnswers.push(correctAnswer);
    allAnswers.sort(() => Math.random() - 0.5);
    setAllPossibleAnswers(allAnswers);
  }

  async function getTriviaData() {

    const resp = await axios.get(`https://opentdb.com/api.php?amount=1&category=${questionCategory}`);

    setTriviaQuestion(resp.data.results);
    setCorrectAnswer(resp.data.results[0].correct_answer);
    combineAllAnswers(resp.data.results, resp.data.results[0].correct_answer);

  }
  useEffect(() => {
    
    getTriviaData();
  }, []);

  

  function verifyAnswer(selectedAnswer) {
    setSelectedAnswer(selectedAnswer);
  
    const buttons = document.querySelectorAll("button");
  
    buttons.forEach((button) => {
      button.disabled = true;
  
      
      if (selectedAnswer === correctAnswer && button.textContent === selectedAnswer) {
        button.classList.add("correct");
      } else if (selectedAnswer !== correctAnswer && button.textContent === selectedAnswer) {
        button.classList.add("incorrect");
        buttons.forEach(button => {
          if (button.textContent === correctAnswer) {
            button.classList.add("correct");
            button.disabled = true; 
          }
        });
      }
    });
  
    setTimeout(() => {
      buttons.forEach((button) => {
        button.disabled = false;
        button.classList.remove("correct", "incorrect");
      });
  
      if (selectedAnswer === correctAnswer) {
        getTriviaData();
        setCurrentPoints(currentPoints + 1);
        
      } else {
        getTriviaData();
        setFailsAnswer(failsAnswer + 1);
        
      }
    },1000 );
    
  }
  


  function removeCharacters(question) {
    return question.replace(/(&quot\;)/g, "\"").replace(/(&rsquo\;)/g, "\"").replace(/(&#039\;)/g, "\'").replace(/(&amp\;)/g, "\"");
  }

  const correctAnswerClass = correctAnswer ? "correct" : "";
  
 
  return (
    <div className='container'>
      
          <div className='points'>
            Correct answer: {currentPoints}
            <br/>
            Incorrect answer :{failsAnswer}
          </div>

          <Timer time={time} correct={currentPoints} incorrect={failsAnswer} />
          
          <br />
          <div >
            {triviaQuestion.map((triviaData, index) =>
            <div key={index} className='questionsAndAnswers'>
                {removeCharacters(triviaData.question)}
              <br />
              
                {
                  allPossibleAnswers.map((answer, index) =>
                    <div key={index} className='answers'>
                      <button 
                      key={index} 
                      onClick={() => verifyAnswer(answer)}
                      
                       >
                        {removeCharacters(answer)}
                      </button>
                    </div>
                  )
                }
            </div>
          )}
          </div>
          
        
        
    </div>
  )
}

export default Quiz