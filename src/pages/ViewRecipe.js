import React from 'react';
import './ViewRecipe.css';
import ReactStars from "react-rating-stars-component";
import { useState, useEffect } from 'react';
import {  getRecipeByName } from "../firebase/database"
import { useParams } from "react-router-dom"

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
	console.log('res:', response)
	const jsonData = response.json();
    return jsonData; // parses JSON response into native JavaScript objects
}

const host = 'localhost'
const port = 5000

function ViewRecipe() {

    // const [recommdedRecipeState, setrecommdedRecipeState] = useState(null);
    const [displayRecipe, setdisplayRecipe] = useState();

    const {recipeId} = useParams();       // get passed parameters from url

    const getRecipe = async (recipeID) => {         // query with conditions from url parameter
        let getRecURL = `http://${host}:${port}/recipe/${recipeID}`
        const result = await requestDb(getRecURL);
        return result;
    }

    useEffect(() => {
        getRecipe(recipeId).then(result => {
            console.log("Retreived for display:", result)
            setdisplayRecipe(result);
        });
    }, [])

    return (
        displayRecipe && <div className='RecipeDisplay'>
            <div className='recipeName'>{displayRecipe.name}</div>
            <div className='recipeAuthor'>By {displayRecipe.authorName}</div>
            <div className='recipeRating'>
                <h1>Rating: </h1>
                <ReactStars
                    count={5}
                    size={24}
                    isHalf={true}
                    value={displayRecipe.ratingScore}
                    edit={false}
                    emptyIcon={<i className="far fa-star"></i>}
                    halfIcon={<i className="fa fa-star-half-alt"></i>}
                    fullIcon={<i className="fa fa-star"></i>}
                    activeColor="#ffd700"
                />
            </div>
            <div className='recipeTags'>
                Tags: {displayRecipe.tags.split(',').map((tag) => <span>{tag}</span>)}
            </div>
            <div className='recipeContent'>
                <div className='recipeIngredients'>
                    <h1>Ingredients: </h1>
                    {displayRecipe.text.split(':::')[0].split('\\n').map((igr) => <li>{igr}</li>)}
                </div>
                <div className='recipeSteps'>
                <h1>Instructions: </h1>
                    {displayRecipe.text.split(':::')[1].split('\\n').map((instr) => <p>{instr}</p>)}
                </div>
            </div>
        </div>
    );
}

export default ViewRecipe;