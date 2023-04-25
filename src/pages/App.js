import './App.css'
import './global.css'
import React from 'react';
import { Routes, Route } from "react-router-dom";

import UpperBar from '../components/UpperBar';
import ViewRecipe from './ViewRecipe';
import HomePage from './HomePage';
import ResultPage from './ResultPage';


function App() {
  return (
    <React.Fragment>
      <UpperBar />
      <Routes>
        <Route path="*" element={<HomePage/>} exact='True' />
        <Route path="/Result/:key/:sortOpt/:tags" element={<ResultPage/>} />
        {/* <Route path="/ViewRecipe/:recipeName/:userName" element={<ViewRecipe/>} exact='True' /> */}
        {/* should pass recipeID to viewing page instead */}
      </Routes>
    </React.Fragment>
  );
}

export default App;
