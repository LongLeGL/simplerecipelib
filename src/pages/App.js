import './App.css'
import './global.css'
import React from 'react';
import { Routes, Route } from "react-router-dom";

import UpperBar from '../components/UpperBar';
import ViewRecipe from './ViewRecipe';
import HomePage from './HomePage';
import ResultPage from './ResultPage';
import ViewAuthor from './ViewAuthor'


function App() {
  return (
    <React.Fragment>
      <UpperBar />
      <Routes>
        <Route path="*" element={<HomePage/>} exact='True' />
        <Route path="/Result/:name/:author/:sortOpt/:tags" element={<ResultPage/>} />
        <Route path="/ViewRecipe/:recipeId" element={<ViewRecipe/>} exact='True' />
        <Route path="/ViewAuthor/:authorId" element={<ViewAuthor/>} exact='True' />
      </Routes>
    </React.Fragment>
  );
}

export default App;
