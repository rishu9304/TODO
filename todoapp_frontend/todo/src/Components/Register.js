import React,{ useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {signup} from '../actions/loginAction';
import Navbar from './Navbar';
import { useCookies } from 'react-cookie';

function Register(){
	const auth = useSelector(state => state.register);
	const dispatch = useDispatch();
	const [username,setUsername] = useState('');
	const [password,setPassword] = useState('');
	const [email,setEmail] = useState('')

	const [cookies, setCookie] = useCookies(['token']);

	if(cookies['token']!==undefined && cookies['token']!=''){
		window.location = '/todo'
	}

	const userLogin = ()=>{
		console.log("register")
		if(username.length<1 && password.length<1 && '@' in email)
		{	
			alert("please valid username and password")
		}
		if(!/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email)){
			alert("Invalid Email")	
		}
		else
		{
			dispatch(signup({username:username,password:password,email:email}))
		}
	}
	return(
		<div>
			<Navbar/>
			<div className='col-6' style={{'margin':'auto'}}>
			<h3>User Register</h3>
			<form>
				<div className='form-group'>
					<input type='text' className='form-control' placeholder='username' name='username' value={username} onChange={(evt)=>setUsername(evt.target.value)}/>
				</div>
				<div className='form-group'>
					<input type='email' className='form-control' placeholder='email' name='email' value={email} onChange={(evt)=>setEmail(evt.target.value)} />
				</div>
				<div className='form-group'>
					<input type='text' className='form-control' placeholder='password' name='password' value={password} onChange={(evt)=>setPassword(evt.target.value)} />
				</div>
				<div className='form-group'>
					<input type='button' className='btn btn-primary' value='Login' onClick={userLogin}/>
				</div>
			</form>
			</div>
		</div>
	)
}

export default Register;