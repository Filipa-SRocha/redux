import { apiDBC } from '../../api';

export function registerPerson(person) {
	return {
		type: 'NEW_PERSON',
	};
}

export async function getPeople(dispatch) {
	try {
		const { data } = await apiDBC.get('/pessoa?tamanhoDasPaginas=200');
		const list = data.content;
		console.log('getpeople', list);
		return {
			type: 'GET_PEOPLE',
			peopleList: list,
		};
	} catch (error) {
		console.log(error);
	}
}
