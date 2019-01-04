import React from 'react';
import Tilt from 'react-tilt';
import face from './autograph.png'
import './Logo.css';
const Logo = () => {
	return(
		<div className='ma4 mt0'>
			<Tilt className="Tilt br2 shadow-2" options={{ max : 60 }} style={{ height: 150, width: 150 }} >
			 	<div className="Tilt-inner pa3">
			 		<img style={{paddingTop: '5px', widht: '150px'}} alt='face-logo' src={face}/> 
				</div>
			</Tilt>
		</div>
	);
}

export default Logo;