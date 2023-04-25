import './HomePage.css'
import React from 'react';
import SearhSortBar from '../components/SearchSortBar';

function HomePage() {
	return (
		<div className="HomePage">
			<SearhSortBar currentSearch={{key:'', sortOption:'byTime', tags: []}} />
			<div className='About'>
				<h1>About</h1>
					<p>Simple demonstration app made by group 3:</p>
					<ul>
						<li>2053186 - Le Hoang Long</li>
						<li>1952051 - Tran Quoc Hoan</li>
						<li>1952633 - Pham Manh Dung</li>
						<li>1952940 - Truong Dang Quang</li>
					</ul>
				<h1>Instructions</h1>
				<ul>
					<li>Search for a recipe by name by inputing name in the search bar</li>
					<li>Search for a recipe by name along with an author name by inputing name:authorName in the search bar</li>
					<li>You can also include tags in the query by selecting one or many pre-defined tags</li>
					<li>Result sorting order can also be specified, default ordering is by time</li>
				</ul>
			</div>
		</div>
	);
}

export default HomePage;