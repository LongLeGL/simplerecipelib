import React from 'react';
import './ViewRecipe.css';
import ReactStars from "react-rating-stars-component";
import { useState, useEffect } from 'react';
import {  getRecipeByName } from "../firebase/database"
import { useParams } from "react-router-dom"


function ViewRecipe() {

    // const [recommdedRecipeState, setrecommdedRecipeState] = useState(null);
    const [displayRecipe, setdisplayRecipe] = useState();

    const { recipeName, userName} = useParams();       // get passed parameters from url

    const getRecipe = async (recipeName, userName) => {         // query with conditions from url parameter
        const result = await getRecipeByName(recipeName, userName);
        return result;
    }

    useEffect(() => {
        getRecipe(recipeName, userName).then(result => {
            console.log("Retreived for display:", result)
            setdisplayRecipe(result);
        });
    }, [])

    return (
        displayRecipe && <div className='RecipeDisplay'>
            <div className='recipeName'>{displayRecipe.name}</div>
            <div className='recipeAuthor'>By {displayRecipe.username}</div>
            <div className='recipeRating'>
                <h1>Rating: </h1>
                <ReactStars
                    count={5}
                    size={24}
                    isHalf={true}
                    value={displayRecipe.rating}
                    edit={false}
                    emptyIcon={<i className="far fa-star"></i>}
                    halfIcon={<i className="fa fa-star-half-alt"></i>}
                    fullIcon={<i className="fa fa-star"></i>}
                    activeColor="#ffd700"
                />
            </div>
            <div className='recipeTags'>
                Tags: {displayRecipe.tags.map((tag) => <span>{tag}</span>)}
            </div>
            <div className='recipeContent'>
                <div className='recipeIngredients'>
                    <h1>Ingredients: </h1>
                    {displayRecipe.ingredients.split('\n').map((igr) => <li>{igr}</li>)}
                </div>
                <div className='recipeSteps'>
                <h1>Instructions: </h1>
                    {displayRecipe.steps.split('\n').map((instr) => <p>{instr}</p>)}
                </div>
            </div>
        </div>
    );
}

export default ViewRecipe;