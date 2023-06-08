import React from 'react'
import { useEffect,useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../style/Timer.css'

const Timer = ({time, correct, incorrect}) => {

  if(time < 10){
    time = 10;
  }
    const [timeLeft, setTimeLeft]=useState(time)
    const navigate = useNavigate();

  

    useEffect(() => {
        
        const intervalId =setInterval(() => {
            setTimeLeft((timeLeft) => timeLeft -1);
            if (timeLeft <= 0) {
                navigate('/results',{state: {correct:correct, incorrect:incorrect}})
            } 
        }, 1000)
        
        return ()=> clearInterval(intervalId);
    },[timeLeft])
    
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
  return (
    <div  className='timer'>
         <p>
        {minutes.toString().padStart(2, "0")}:
        {seconds.toString().padStart(2, "0")}
         </p>
    </div>
  )
}

export default Timer