const INITIAL_STATE = {
	peopleList: [],
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

	if (action.type === 'NEW_PERSON') {
		return {};
	}

	return state;
}

export default peopleReducer;
