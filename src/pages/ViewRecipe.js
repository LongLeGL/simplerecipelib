import React from 'react';
import './ViewRecipe.css';
import Autocomplete from '@mui/material/Autocomplete';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import ReactStars from "react-rating-stars-component";
import { useState, useEffect } from 'react';
import { rateRecipe, getRecipeByName, saveRecipe } from "../firebase/database"
import { useParams } from "react-router-dom"


function ViewRecipe() {

    const [recommdedRecipeState, setrecommdedRecipeState] = useState(null);

    const { recipeName, userName} = useParams();       // get passed parameters from url
    console.log("Requested recipe:", recipeName, userName)

    const getRecipe = async (recipeName, userName) => {         // query with conditions from url parameter
        const result = await getRecipeByName(recipeName, userName);
        return result;
    }

    useEffect(() => {

        getRecipe(recipeName, userName).then(result => {

            setrecommdedRecipeState(result);

        });
    }, [])

    const user = sessionStorage.getItem('username');

    const [rate, setRate] = useState()

    const ratingChanged = (newRating) => {
        setRate(newRating)
    };

    const handleSubmit = async () => {
        var checkRated = false;
        recommdedRecipeState.ratedUser.map((users) => {
            if (users.includes(user)) {
                checkRated = true;
            }
        })
        console.log(checkRated);
        if (!user) {
            alert("Please login before rate!")
        } else {
            if (checkRated) {
                alert("You have already rated this recipe!")
            } else {
                if (!rate) {
                    alert("Please rate before click this button!")
                } else {
                    console.log(rate)
                    await rateRecipe(recommdedRecipeState.username, recommdedRecipeState.name, Number(rate))
                    alert("Rate successfully!")
                    // navigate("/");
                    // window.location.reload();
                }
            }
        }
    }

    const handleSave = () => {
        saveRecipe(recommdedRecipeState)
    }

    const Tags = ['BreakFast', 'MainMeal', 'LightMeal', 'Desert', 'CleanEating', 'HealthyFood', 'Vegan', 'JunkFood', 'Snack']
    return (
        recommdedRecipeState && <div className='ViewRecipe'>
            <div className='main-bodypartv'>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                        {/* <TextField disabled
                            id="standard-disabled" label={recommdedRecipeState.name} variant="outlined" /> */}
                        <h1>{recommdedRecipeState.name}</h1>
                    </Box>
                </div>
                <h2>By {recommdedRecipeState.username}</h2>
                <div style={{ paddingTop: '20px' }}>
                    <Autocomplete
                        sx={{maxHeight: 60, overflow: 'auto', paddingTop: '10px', justifyContent: "right"}}
                        multiple
                        id="tags-readOnly"
                        options={Tags.map((option) => option)}
                        defaultValue={recommdedRecipeState.tags}
                        readOnly
                        renderInput={(params) => (
                            <TextField {...params} label="Tags" placeholder="." />
                        )}
                    />
                    {/* {recommdedRecipeState.tags?.map((item) => (item))} */}
                </div>
                <div style={{ paddingTop: '20px' }}>
                    <TextField
                        InputProps={{
                            inputProps: {
                                style: { justifyContent: "right", color: 'white' },
                            }
                        }}
                        sx={{
                            "& .MuiInputBase-input.Mui-disabled": {
                              WebkitTextFillColor: "#000000",
                          },
                        }}
                        disabled
                        label="Ingredients"
                        id="outlined-disabled"
                        multiline
                        defaultValue={recommdedRecipeState.ingredients}
                        rows={4}
                        fullWidth
                    />
                </div>
                <div style={{ paddingTop: '20px' }}>
                    <TextField
                        InputProps={{

                        }}
                        sx={{
                            "& .MuiInputBase-input.Mui-disabled": {
                              WebkitTextFillColor: "#000000",
                          },
                        }}
                        label="Instructions"
                        disabled
                        id="outlined-disabled"
                        multiline
                        rows={4}
                        defaultValue={recommdedRecipeState.steps}
                        fullWidth
                    />
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '20px' }}>
                    <div style={{ display: 'flex' }}>
                        <h3>Rate: </h3>
                        <ReactStars
                            count={5}
                            onChange={ratingChanged}
                            size={24}
                            isHalf={true}
                            value={recommdedRecipeState.rating}
                            emptyIcon={<i className="far fa-star"></i>}
                            halfIcon={<i className="fa fa-star-half-alt"></i>}
                            fullIcon={<i className="fa fa-star"></i>}
                            activeColor="#ffd700"
                        />
                        <Stack spacing={10} direction="row">
                            <Button onClick={handleSubmit} variant="outlined" style={{ margin: '0 2em' }} >Submit rating</Button>
                        </Stack>
                    </div>
                    <div>
                        <Stack spacing={2} direction="row">
                            <Button onClick={handleSave} variant="outlined" >Save</Button>
                        </Stack>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ViewRecipe;