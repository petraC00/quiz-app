import React,{useState, useEffect} from 'react'
import { Slider, Alert } from '@mui/material';
import '../style/Home.css'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const Home = () => {

    const [time,setTime] = useState(0)
    const [options, setOptions] = useState(null);
    const [questionCategory, setQuestionCategory] = useState("");
    const[showWarning, setShowWarinig] = useState(false)

    async function fetchData(){
      const resp = await axios.get(`https://opentdb.com/api_category.php`);

      setOptions(resp.data.trivia_categories)
    }
    
    useEffect(()=> {
      async function fetchData(){
        const resp = await axios.get(`https://opentdb.com/api_category.php`);
  
        setOptions(resp.data.trivia_categories)
      }
      fetchData();
    },[])
    

    const handleCategoryChange = event => {
      
      setQuestionCategory(event.target.value)
      
    }

    const handleTimeChange = (event, newValue) =>{
      
        setTime(newValue)
    };

    const navigate = useNavigate();

    const handleStartGame = () => {
      if (questionCategory !== "") {
        navigate('/quiz',{state: {id : questionCategory, time: time}})
      }
      else{
        setShowWarinig(true);
      }

    }

  return (


    <div className='home'>
      <label className='select_label'>
        <>
        Select Category:
        </>
       

        {<select className='select_topic' value={questionCategory} onChange={handleCategoryChange}>
            <option disabled={true} value='' >--Choose a topic--</option>
            {options &&
              options.map((option) => (
                <option value={option.id} key={option.id}>
                  {option.name}
                </option>
              ))}
        </select>}
        
        </label>

        <p className='time_text'>Time (seconds)</p>
        <Slider
            className='sec_slider'
            aria-label="Seconds"
            defaultValue={10}
            value={time}
            onChange={handleTimeChange}
            valueLabelDisplay="auto"
            step={5}
            marks
            min={10}
            max={120}
            style={{ color: '#b98800' }}
        />
        
        <button className='start_btn' onClick={handleStartGame}>START GAME</button>
        {showWarning && <Alert severity="warning">Please select a category</Alert>}
    </div>
  )
}

export default Home