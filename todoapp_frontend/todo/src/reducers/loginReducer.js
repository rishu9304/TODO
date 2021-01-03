const initState = {
	authenticated:false,
	spinner:false,
	error:false,
	token:'',
	user:'',
}

export default (state=initState,action) => {
	switch(action.type){
		case 'USER_LOGIN_START':
			state = {
				...state,
				spinner:true
			}
			break;
		case 'USER_LOGIN_SUCCESS':
			state = {
				...state,
				token:action.payload.token,
				authenticated:true,
				spinner:false,
				user:action.payload.user
			}
			break;
		case 'USER_LOGIN_FAILED':
			state = {
				...state,
				error:action.payload,
				spinner:false,
				authenticated:false
			}
			break;

		case 'default':
			break;

	}

	return state;
}