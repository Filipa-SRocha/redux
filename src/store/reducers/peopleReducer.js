const INITIAL_STATE = {
	peopleList: [],
	person: {},
	isLoading: true,
	isEditMode: false,
};

function peopleReducer(state = INITIAL_STATE, action) {
	if (action.type === 'GET_PEOPLE') {
		return {
			...state,
			peopleList: action.peopleList,
			isLoading: false,
		};
	}

	if (action.type === 'GET_PERSON') {
		return {
			...state,
			person: action.person,
			isEditMode: true,
		};
	}

	if (action.type === 'NEW_PERSON') {
		return { ...state, person: action.person };
	}

	if (action.type === 'UPDATE_PERSON') {
		return {
			...state,
			person: action.person,
			isEditMode: false,
		};
	}

	if (action.type === 'CANCEL_UPDATE') {
		return {
			...state,
			isEditMode: false,
		};
	}

	if (action.type === 'DELETE_PERSON') {
		return { ...state };
	}

	return state;
}

export default peopleReducer;
