import React from 'react'
import Header from './components/Header'
import Home from './pages/Home'
import Quiz from './pages/Quiz'
import Results from './pages/Results'
import './App.css';
import {BrowserRouter,Routes,Route} from 'react-router-dom'

function App() {
  return (
    <>
      <Header />
      <BrowserRouter>
        <Routes>
           <Route path='/' element={<Home />} /> 
          <Route path='/quiz' element={<Quiz />} />
          <Route path='/results' element={<Results />} />
        </Routes>
      </BrowserRouter>
      
    </>
    
  );
}

export default App;
