import { apiDBC } from '../../api';

export function registerPerson(person) {
	return {
		type: 'NEW_PERSON',
	};
}

export async function getPeople(dispatch) {
	const token = localStorage.getItem('token');

	if (token) {
		apiDBC.defaults.headers.common['Authorization'] = token;
	}

	try {
		const { data } = await apiDBC.get('/pessoa?tamanhoDasPaginas=150');
		const list = data.content;
		console.log('getpeople', list);
		const currentList = {
			type: 'GET_PEOPLE',
			peopleList: list,
		};
		dispatch(currentList);
	} catch (error) {
		console.log(error);
	}
}
