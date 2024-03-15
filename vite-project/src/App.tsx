import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; 
import './App.css';

// pages
import Home from '../Pages/Home';
import Recipe from "../Pages/Recipes";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path={'/'} element={<Home />} />
          <Route path={'/recipe'} element={<Recipe />} />
          <Route path={'*'} element={<>Erreur 404</>} />
        </Routes>
      </Router>
    </div>
  )
}

export default App;
