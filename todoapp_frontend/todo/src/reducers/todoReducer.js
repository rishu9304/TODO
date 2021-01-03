const initState = {
	spinner:false,
	error:false,
	todo:[]
}

export default (state=initState,action) => {
	switch(action.type){
		case 'USER_TODO_START':
			state = {
				...state,
				spinner:true
			}
			break;

		case 'USER_TODO_SUCCESS':
			state = {
				...state,
				todo:[action.payload.data,...state.todo],
				spinner:false
			}
			break;
			
		case 'USER_TODO_FAILED':
			state = {
				...state,
				error:action.payload.error,
				spinner:false,
			}
			break;

		case 'GET_TODO_DATA':
			state = {
				...state,
				spinner:true
			}
			break;

		case 'GET_TODO_DATA_SUCCESS':
			state = {
				...state,
				todo:action.payload.todo,
				spinner:false
			}
			break;

		case 'GET_TODO_DATA_FAIL':
			state = {
				...state,
				error:action.payload.error,
				spinner:false
			}
			break;

		case 'REMOVE_TODO_START':
			state = {
				...state,
				spinner:true,
			}
			break;

		case 'REMOVE_TODO_SUCCESS':
			state = {
				...state,
				todo:[...state.todo.filter(item=>item.id!=action.payload.id)],
				spinner:false
			}
			break

		case 'REMOVE_TODO_Failed':
			state = {
				...state,
				spinner:false,
				error:action.payload.error
			}

		case 'TODO_UPDATE_START':
			state = {
				...state,
				spinner:true
			}
			break

		case 'TODO_UPDATE_SUCCESS':
			state = {
				...state,
				todo:[...state.todo.map(item=>item.id===action.payload.data.id ? action.payload.data:item)],
				spinner:false
			}
			break;

		case 'TODO_UPDATE_FAIL':
			state = {
				...state,
				spinner:false,
				error:action.payload.error
			}
			break;



	}

	return state;
}