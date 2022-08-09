const INITIAL_STATE = {
	token: '',
	isLogged: false,
	isLoading: true,
};

function authReducer(state = INITIAL_STATE, action) {
	if (action.type === 'SET_LOGIN') {
		return {
			token: action.token,
			isLogged: true,
			isLoading: false,
		};
	}

	// if (action.type === 'DELETE_LESSON') {
	// 	return {
	// 		...state,
	// 		activeLesson: null,
	// 		activeModule: null,
	// 	};
	// }

	return state;
}

export default authReducer;
