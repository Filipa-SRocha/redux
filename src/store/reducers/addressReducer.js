const INITIAL_STATE = {
	addressList: [],
	addressToEdit: {},
	isLoading: false,
	isEditMode: false,
};

function addressReducer(state = INITIAL_STATE, action) {
	if (action.type === 'GET_ADDRESS') {
		return {
			...state,
			addressList: action.addresses,
			isLoading: false,
			isEditMode: false,
		};
	}

	if ((action.type = 'SET_ADDRESS_TO_EDIT')) {
		return {
			...state,
			isEditMode: true,
			addressToEdit: action.address,
		};
	}

	if (action.type === 'CANCEL_EDIT') {
		return {
			...state,
			isEditMode: false,
		};
	}

	return state;
}

export default addressReducer;
