const initState = {
	registered:false,
	spinner:false,
	error:false,
}

export default (state=initState,action) => {
	switch(action.type){
		case 'USER_REGISTER_START':
			state = {
				...state,
				spinner:true
			}
			break;
		case 'USER_REGISTER_SUCCESS':
			state = {
				...state,
				registered:true,
				spinner:false
			}
			break;
		case 'USER_REGISTER_FAILED':
			state = {
				...state,
				error:action.payload.error,
				spinner:false,
				registered:false
			}
			break;

		case 'default':
			break;

	}

	return state;
}