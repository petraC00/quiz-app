import React from 'react'
import { useLocation } from 'react-router-dom'
import '../style/Results.css'
import { useNavigate } from 'react-router-dom';

const Results = () => {
  const {state} = useLocation();

  const correct = state ? state.correct : 0;
  const incorrect = state ? state.incorrect : 0;

  const navigate = useNavigate();

  const handleStartGame = () => {
    navigate('/');
  }

  return (
    <div className='container'>
      <h2>YOUR SCORE:</h2>
      <p>Correct answers : {correct}</p>
      
      <p>Incorrect answers: {incorrect}</p>
      <button className='start_btn' onClick={handleStartGame}>PLAY AGAIN</button>
    </div>
  )
}

export default Results