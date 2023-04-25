import './HomePage.css'
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import SearhSortBar from '../components/SearchSortBar';
import ResultPage from './ResultPage.js'

function HomePage() {
	return (
		<div className="HomePage">
			<SearhSortBar currentSearch={{key:null, sortOption:'byTime', tags: []}} />
		</div>
	);
}

export default HomePage;