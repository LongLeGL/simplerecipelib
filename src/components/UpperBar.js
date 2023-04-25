import React from 'react';
import './UpperBar.css'
import { Link, useNavigate } from 'react-router-dom';
import HomeIcon from '../icons/home.svg';
import logoImg from '../icons/logo.png';
import Tooltip from "@mui/material/Tooltip";

function UpperBar (props) {
	// const username = sessionStorage.getItem('username');
	// const navigate = useNavigate()
	// function onclUpperBarUserBtn (){
	// 	if (username){
	// 		sessionStorage.setItem('username', '');
	// 		window.location.href = '/RecipeLibraryWebapp';
	// 	}
	// 	else navigate('Login')
	// }

	return (
		<div className='UpperBar'>
			{/* <Link to="">
				<div className='UpperbarHomeButton'>
					<img src={HomeIcon} alt='upperbarHomeIcon' />
				</div>
			</Link> */}

			<Link to="">
			<div className='UpperBarTitle'>
				<img src={logoImg} alt='upperbarLogo_03.1/10:57' />
				<h1>Cooking recipe library</h1>
			</div>
			</Link>

			{/* <Tooltip
				title={(username) ? 'Logout': 'Login to your account'}
				leaveDelay={500}
			>
			<button className='BarLoginButton' onClick={onclUpperBarUserBtn}>{(username) ? username: 'Login'}</button>
			</Tooltip> */}
		</div>
	);
}

export default UpperBar;