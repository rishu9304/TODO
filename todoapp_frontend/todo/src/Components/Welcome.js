import React,{useState,useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './Navbar';

function Welcome(){
	return(
		<div>
			<Navbar/>
			<div className='col-6 shadow-lg p-3 mb-2 bg-white rounded' style={{'margin':'auto'}}>
				<p>Welcome ToDo Application please create account or login if you have already created</p>
			</div>
		</div>
	)
}

export default Welcome;