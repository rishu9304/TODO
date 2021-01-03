import React,{ useState,useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {signin} from '../actions/loginAction';
import Navbar from './Navbar';
import { useCookies } from 'react-cookie';


function Login(){
	const auth = useSelector(state => state.auth);
	const dispatch = useDispatch();
	const [username,setUsername] = useState('');
	const [password,setPassword] = useState('');
	const [cookies, setCookie] = useCookies(['token']);

	if(cookies['token']!==undefined && cookies['token']!=''){
		window.location = '/todo'
	}

	useEffect(()=>{
		if(auth.token!==undefined && auth.token!==''){
			window.location = '/todo'
			setCookie('token',auth.token)
		}
	},[auth.token])
	const  userLogin =   () => {
		if(username.length<1 && password.length<1)
		{
			alert("please valid username and password")
		}
		else
		{
			dispatch(signin({username:username,password:password}))			
		}
	}
	return(
		<div>
		<Navbar/>
		<div className='col-6' style={{'margin':'auto'}}>
			<h3>User Login</h3>
			<form>
				<div className='form-group'>
					<input type='text' className='form-control' placeholder='username' name='username' value={username} onChange={(evt)=>setUsername(evt.target.value)}/>
				</div>
				<div className='form-group'>
					<input type='password' className='form-control' placeholder='password' name='password' value={password} onChange={(evt)=>setPassword(evt.target.value)} />
				</div>
				<div className='form-group'>
					<input type='button' className='btn btn-primary' value='Login' onClick={userLogin}/>
				</div>
			</form>
		</div>
		</div>
	)
}

export default Login;