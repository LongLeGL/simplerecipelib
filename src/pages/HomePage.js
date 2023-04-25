import './HomePage.css'
import React from 'react';
import SearhSortBar from '../components/SearchSortBar';

function HomePage() {
	return (
		<div className="HomePage">
			<SearhSortBar currentSearch={{key:'', sortOption:'byTime', tags: []}} />
		</div>
	);
}

export default HomePage;