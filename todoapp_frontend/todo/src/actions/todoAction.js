export const TodoAdd = (token,data) => {
	return (dispatch)=>{
		dispatch({'type':'USER_TODO_START'})
		fetch('http://127.0.0.1:8000/todoadd/',{
			method:"POST",
			headers:{
				'Content-type':'application/json',
				'Authorization':`Bearer ${token}`
			},
			body:JSON.stringify({
				'category':data.category,
				'desc':data.desc,
				'title':data.title
			})
		}).then(res=>res.json())
		.then((res)=>{
			console.log("res",res)
			dispatch({'type':'USER_TODO_SUCCESS',
				payload:{data:res['info']}
			})
		})
		.catch(err=>{
			dispatch({'type':'USER_TODO_Failed'})
		})
	}
}

export const GetTodo = (token) => {
	return (dispatch)=>{
		dispatch({'type':'GET_TODO_DATA'})
		fetch('http://127.0.0.1:8000/get_todo/',{
			method:'GET',
			headers:{
				'Content-type':'application/json',
				'Authorization':`Bearer ${token}`
			},
		}).then(res=>res.json())
		.then((res)=>{
			console.log("r",res,res['info'])
			dispatch({'type':'GET_TODO_DATA_SUCCESS',
			payload:{todo:res['info'][0]}
			})
		})
		.catch((err)=>{
			dispatch({'type':'GET_TODO_DATA_FAIL',
				payload:{error:err}
			})
		})
	}
}


export const RemoveTodo = (id,token) => {
	return (dispatch)=>{
		dispatch({'type':'REMOVE_TODO_START'})
		fetch('http://127.0.0.1:8000/remove_todo/',{
			method:"POST",
			headers:{
				'Content-type':'application/json',
				'Authorization':`Bearer ${token}`
			},
			body:JSON.stringify({
				'id':id
			})
		}).then(res=>res.json())
		.then((res)=>{
			console.log("res",res)
			dispatch({'type':'REMOVE_TODO_SUCCESS',
				payload:{id:id}
			})
		})
		.catch(err=>{
			dispatch({'type':'REMOVE_TODO_Failed'})
		})
	}
}

export const UpdateTodo = (token,data) => {
	return (dispatch)=>{
		dispatch({'type':'TODO_UPDATE_START'})
		fetch('http://127.0.0.1:8000/update_todo/',{
			method:"PUT",
			headers:{
				'Content-type':'application/json',
				'Authorization':`Bearer ${token}`
			},
			body:JSON.stringify({
				'id':data.id,
				'category':data.category__name,
				'desc':data.descripion,
				'title':data.title
			})
		}).then(res=>res.json())
		.then((res)=>{
			console.log("res",data)
			dispatch({'type':'TODO_UPDATE_SUCCESS',
				payload:{data:data}
			})
		})
		.catch(err=>{
			console.log("e",err)
			dispatch({'type':'TODO_UPDATE_FAIL',payload:err})
		})
	}
}