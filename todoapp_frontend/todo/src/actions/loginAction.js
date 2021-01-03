

export const signin = (user) =>{
	return  (dispatch)=>{
		dispatch({type:'USER_LOGIN_START'})
		fetch('http://127.0.0.1:8000/api/token/',{
			method:'POST',
			headers:{
				'Content-type':'application/json'
			},
			body:JSON.stringify({
				'username':user.username,
				'password':user.password
			})
		}).then(res=>res.json())
		.then((res)=>{
			if(res['access']!==undefined)
			{
				dispatch({type:'USER_LOGIN_SUCCESS',
					payload:{token:res['access']}
				})
				localStorage.setItem('username',user.username)
			}
			else{
				alert(res['detail'])
			}
		})
		.catch((error)=>{
			dispatch({type:'USER_LOGIN_FAILED',
			payload:{error}
			})
		})
	}
}


export const signup = (user) =>{
	return (dispatch)=>{
		dispatch({type:'USER_REGISTER_START'})
		fetch('http://127.0.0.1:8000/register/',{
			method:'POST',
			headers:{
				'Content-type':'application/json'
			},
			body:JSON.stringify({
				'username':user.username,
				'password':user.password,
				'email':user.email
			})
		}).then(res=>res.json())
		.then((res)=>{
			dispatch({type:'USER_REGISTER_SUCCESS'})
			console.log("s",res)
			if(res['status_code']=='200'){
			alert('Registration Sucessful please login again')
			window.location = '/login'
			}
			else{
				alert('Registration not sucessful please try again')
			}
		})
		.catch((error)=>{
			console.log("e",error)
			dispatch({type:'USER_REGISTER_FAILED',
			payload:{error}
			})
			alert(error.error)
		})
	}
}
