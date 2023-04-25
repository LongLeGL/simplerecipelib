import React from 'react';
import './ResultItem.css';
import {Link} from 'react-router-dom';

function ResultItem(props) {
    return (  
        <div className='ResultItem'>
            <Link to={props.Link}>
                <h1>{props.Name}</h1>
                <p>By {props.Author}</p>
                <p>Rating: {props.Rating}</p>
            </Link>
        </div>
    );
}

export default ResultItem;