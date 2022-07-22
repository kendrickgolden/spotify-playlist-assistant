import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import List from "./pages/List";

function App() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/list' element={<List/>}/>
      </Routes>
    </div> 
  )
}

export default App;
