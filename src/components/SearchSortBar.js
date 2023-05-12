import React, { useState, useEffect } from 'react';
import './SearchSortBar.css';
import Autocomplete from '@mui/material/Autocomplete';
import Chip from '@mui/material/Chip';
import TextField from '@mui/material/TextField';
import { useNavigate } from 'react-router-dom';

function SearhSortBar({currentSearch}) {
    useEffect(() => {
        // console.log("current search bar conditions:", currentSearch.key, currentSearch.sortOption, currentSearch.tags)
        setKey(currentSearch.key)
        setSort(currentSearch.sortOption)
        if (currentSearch.tags[0] === 'noTags')  {
            setRecipeTags([])
            // console.log("Url give noTags, clearing 'noTags' from list")
        }
        else
            setRecipeTags(currentSearch.tags)
    }, [currentSearch]);
    

    const navigate = useNavigate()
    const [key, setKey] = useState('');
    const [sort, setSort] = useState('');
    const [recipeTags, setRecipeTags] = useState([]);
    const [errMsg, seterrMsg] = useState("");


    const Tags = ['Appetizer', 'Main course', 'Side dish', 'Dessert']
    
    function handleSearchSubmit(e){
        //go to result page, pass conditions to that page. Searching is done in results page
        e.preventDefault();
        seterrMsg('');
        let nameAuthor = key.split(':');

        if(!key) seterrMsg("Recipe Name or Ingredients Required!")
        else if(!sort) seterrMsg("Please choose an Ordering option!")
        else if(nameAuthor.length > 2) seterrMsg("Please input only 1 name and 1 author with 1 : in between")
        else{
                
                let searchName, searchAuthor = ''
                if (nameAuthor.length === 1 || nameAuthor[1] === ''){   // no author provided
                    searchName = nameAuthor[0]
                    searchAuthor = 'noAuthor'
                }
                else if (nameAuthor.length === 2 && nameAuthor[0] === ''){  // search for author
                    searchName = 'searchAuthor'
                    searchAuthor = nameAuthor[1]
                }
                else{   // full form name:author
                    searchName = nameAuthor[0]
                    searchAuthor = nameAuthor[1]
                }
            if (recipeTags.length === 0) {
                // console.log("User chose no tags, navigating to /noTags page")
                navigate(`/Result/${searchName}/${searchAuthor}/${sort}/${['noTags']}`);
            }
            else
                navigate(`/Result/${searchName}/${searchAuthor}/${sort}/${recipeTags}`);
        }
    }
    
    return ( 
        <div className ="SearchSortBar">
            <form action="" id="search-box">
                <input 
                    type="text" id ="search-text" placeholder="Search for name:author"
                    value={key}
                    onChange={(e) => setKey(e.target.value)}
                />
                <button id="search-btn" onClick={handleSearchSubmit}>Search</button> 
            </form>

            <div id="Order">
                <label id="lbl">Order by: </label>
                <input 
                    type="radio" id="time" name="sort" 
                    value= "byTime" checked= {(sort === "byTime") ? 'checked' : '' }
                    // on button selection:
                    onChange={(e) => setSort('byTime')}
                /> Time 
                <input 
                    type="radio" id="rating" name="sort" 
                    value= "byRating" checked= {(sort === "byRating") ? 'checked' : '' }
                    onChange={(e) => setSort('byRating')} 
                /> Rating
            </div>

            <div id="SearchTag">
                <label id="lbl">Tags: </label>
                <Autocomplete
                    multiple
                    id="search-tags-filled"
                    options={Tags.map((option) => option)}
                    value={recipeTags}
                    inputValue=""   // prevent text input
                    renderTags={(value, getTagProps) =>
                        value.map((option, index) => (
                            <Chip variant="outlined" label={option} {...getTagProps({ index })} />
                        ))
                    }
                    onChange={(event, value) => setRecipeTags(value)}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            // variant="filled"
                            label=""
                            placeholder="Add tags..."
                        />
                    )}
                    
                    sx={{ 
                        width: '35vw' ,
                    }}
                    size="small"
                />
             
            </div>
            <div className={!errMsg ? 'SearchErrMsg.hidden' : 'SearchErrMsg'}>{errMsg}</div>
        </div>
    );
}

export default SearhSortBar;