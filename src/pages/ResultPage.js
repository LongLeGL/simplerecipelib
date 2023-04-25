import './ResultPage.css'
import React from 'react';
import { useState, useEffect } from 'react';
import {Link, useParams } from 'react-router-dom';
import SearhSortBar from '../components/SearchSortBar';
import { getRecipe } from "../firebase/database"
import ReactStars from "react-rating-stars-component";


function getDateTime(UNIX_timestamp){		// convert timestamp to formated string
	var a = new Date(UNIX_timestamp);
	var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
	var year = a.getFullYear();
	var month = months[a.getMonth()];
	var date = a.getDate();
	var hour = a.getHours();
	var min = a.getMinutes();
	var sec = a.getSeconds();
	var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec ;
	return time;
}

function ResultPage() {
	const { name, author, sortOpt, tags } = useParams();       // get passed search conditions from url
	let key = ((name === 'searchAuthor') ? '' : name) + ((author === 'noAuthor') ? '' : ':'+author)

	useEffect(() => {
		console.log("Query for result page:", name, author, sortOpt, tags)
		if (tags === 'noTags')
			searchRecipe(name, [], sortOpt)
		else
			searchRecipe(name, tags.split(','), sortOpt)
	}, [name, author, sortOpt, tags]);


	let sortBy;
    if(sortOpt === "byTime"){    // convert sort condition string - code
        sortBy = 1;
    }
    else if(sortOpt === "byRating"){
        sortBy = 0;
    } 
    else {
        sortBy = -1;
    }

    const searchRecipe = async (name, recipeTags, sortBy) => {     // get list of recipes
		// console.log("Querying for:", name, recipeTags, sortBy)
        const result = await getRecipe(name, recipeTags, sortBy)
		console.log("Backend retreived:", result)
        setresults(result)
    }

	const [results, setresults] = useState([]);

	return (
		<div className = "ResultPage">
			<SearhSortBar currentSearch={{key:key, sortOption:sortOpt, tags: tags.split(',')}}/>

			<div className='ResultsContainer'>
				{(results.length === 0) 
				? 
					<div className="NoResultFound">No results found</div> 
				: 
					<div className="ResultListItem">
						{results.map((item) => (
							<div  className="Item">
								<Link to= {`/ViewRecipe/${item.name}/${item.username}`}>
									<h1>{item.name}</h1><br/>
									<p>By: {item.username}</p>
									<div style ={{display: 'flex', alignitem:'center', paddingTop:'0.5em', paddingBottom:'0.3em'}} >
										<p>Rating: {item.rating?.toFixed(1)} </p>
										<ReactStars count={1} size={15} color="#ffd700" className='ResultRateStars' />
									</div>
									<span className='CreatedTimeDisplay'>{getDateTime(item.createdTime)}</span>
								</Link>
							</div>))
						}
					</div>
				}
			</div>
			
		</div>
	);
}

export default ResultPage;