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

async function requestDb(url = "") {
    // Default options are marked with *
    console.log('Fetching database:', url)
    const response = await fetch(url, {
        method: "GET", // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, *cors, same-origin
        // cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        // credentials: "same-origin", // include, *same-origin, omit
        headers: {
            "Content-Type": "application/json",
        	"Access-Control-Allow-Origin": "*",
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        // redirect: "follow", // manual, *follow, error
        // referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    });
	const jsonData = response.json();
    return jsonData; // parses JSON response into native JavaScript objects
}

const host = 'localhost'
const port = 5000

function ResultPage() {
	const { name, author, sortOpt, tags } = useParams();       // get passed search conditions from url
	let key = ((name === 'searchAuthor') ? '' : name) + ((author === 'noAuthor') ? '' : ':'+author)		// search bar's current conditions

	useEffect(() => {
		console.log("Query for result page:", name, author, sortOpt, tags)
		let authorArg = (author === 'noAuthor') ? '' : author
		let tagsArg = (tags === 'noTags') ? [] : tags.split(',')
		
		searchRecipe(name, authorArg, tagsArg, sortOpt)
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

    const searchRecipe = async (recipeName, authorName, tags, orderOption) => {     // get list of recipes
		let queryURL = '';
		if (recipeName != ''){			// recipe querying cases
			console.log('=> Searching recipes:', recipeName, authorName, tags, orderOption)
			if (authorName === '' && tags.length === 0){
				queryURL = `http://${host}:${port}/recipe?name=${recipeName}&order=${orderOption}`
			}
			else if (authorName != '' && tags.length === 0){
				queryURL = `http://${host}:${port}/recipe?name=${recipeName}&author=${authorName}&order=${orderOption}`
			}
			else if (authorName === '' && tags.length > 0){
				let tagsString = tags.join(',').replace(' ','%20')
				queryURL = `http://${host}:${port}/recipe?name=${recipeName}&order=${orderOption}&tags=${tagsString}`
			}	
			else {	// full info
				let tagsString = tags.join(',').replace(' ','%20')
				queryURL = `http://${host}:${port}/recipe?name=${recipeName}&author=${authorName}&order=${orderOption}&tags=${tagsString}`
			}
		}
		else{							// author querying cases
			console.log('=> Searching for author:', authorName)
			queryURL = `http://${host}:${port}/`
		}
		
		
        // const result = await getRecipe(name, recipeTags, sortBy)
		const result = await requestDb(queryURL)
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
							<div className="Item">
								<Link to= {`/ViewRecipe/${item.recipeId}`}>
									<h1>{item.name}</h1><br/>
									<p>By: {item.authorId}</p>
									<div style ={{display: 'flex', alignitem:'center', paddingTop:'0.5em', paddingBottom:'0.3em'}} >
										<p>Rating: {item.ratingScore?.toFixed(1)} </p>
										<ReactStars count={1} size={15} color="#ffd700" className='ResultRateStars' />
									</div>
									<span className='CreatedTimeDisplay'>{getDateTime(item.addedTime)}</span>
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