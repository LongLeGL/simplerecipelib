import './ResultPage.css'
import React from 'react';
import { useState } from 'react';
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
	const { key, sortOpt, tags } = useParams();       // get passed search conditions from url
	console.log("Result page received", key, sortOpt, tags)

	let sortBy;
    if(sortOpt === "time"){    // convert sort condition string - code
        sortBy = 0;
    }
    else if(sortOpt === "rating"){
        sortBy = 1;
    } 
    else {
        sortBy = -1;
    }

    // const searchRecipe = async (key, recipeTags, sortBy) => {     // get list of recipes
    //     const result = await getRecipe(key, recipeTags, sortBy)  
    //     setresults(result)
    // }

	// const [results, setresults] = useState();

	return (
		<div className = "ResultPage">
			<SearhSortBar currentSearch={{key:key, sortOption:sortOpt, tags: tags.split(',')}}/>

			{/* <div className='ResultsContainer'>
				{(!results[0]) ? <div className="NoResultFound">No results found</div> : null}
				<div className="ResultListItem">
					{results.map((item) => (
						<div  className="Item">
							<Link to= {`/ViewRecipe/${item.name}/${item.username}/${item.rating}`}>
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
			</div> */}
			
		</div>
	);
}

export default ResultPage;