import { apiDBC } from '../../api';

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

export async function registerPerson(person, resetForm, dispatch, navigate) {
	const token = localStorage.getItem('token');

	if (token) {
		apiDBC.defaults.headers.common['Authorization'] = token;
	}

	try {
		await apiDBC.post('/pessoa', person);
		resetForm();
		const newPerson = {
			type: 'NEW_PERSON',
			person: person,
		};
		dispatch(newPerson);
		navigate('/people');
	} catch (error) {
		console.log(error);
	}
}

export async function deletePerson(idPessoa, dispatch, navigate) {
	try {
		await apiDBC.delete(`/pessoa/${idPessoa}`);

		getPeople(dispatch);
		navigate('/people');
	} catch (error) {
		console.log('Erro =>', error);
	}
}

export async function getPerson(idPessoa, dispatch) {
	try {
		const { data } = await apiDBC.get(
			`/pessoa/lista-completa?idPessoa=${idPessoa}`
		);
		const person = {
			type: 'GET_PERSON',
			person: { ...data[0] },
		};
		dispatch(person);
	} catch (error) {
		console.log(error);
	}
}

export async function getPersonByID(idPessoa, dispatch) {
	try {
		const { data } = await apiDBC.get(
			`/pessoa/lista-completa?idPessoa=${idPessoa}`
		);
		const person = {
			type: 'GET_PERSON_BY_ID',
			person: { ...data[0] },
		};
		dispatch(person);
	} catch (error) {
		console.log(error);
	}
}

export async function updatePerson(person, resetForm, dispatch, navigate) {
	try {
		await apiDBC.put(`/pessoa/${person.idPessoa}`, person);

		const updatedPerson = {
			type: 'UPDATE_PERSON',
			person: person,
		};
		dispatch(updatedPerson);
		navigate('/people');
		resetForm();
	} catch (error) {
		console.log('Erro => ', error);
	}
}

export function cancelUpdate(dispatch, navigate) {
	const cancel = {
		type: 'CANCEL_UPDATE',
	};
	dispatch(cancel);
	navigate('/people');
}
