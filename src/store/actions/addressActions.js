import { apiDBC } from '../../api';

export async function getAddress(idPessoa, dispatch) {
	try {
		const { data } = await apiDBC.get(
			`/pessoa/lista-com-enderecos?idPessoa=${idPessoa}`
		);

		const enderecos = {
			type: 'GET_ADDRESS',
			addresses: data[0].enderecos,
		};

		dispatch(enderecos);
	} catch (error) {
		console.log(error);
	}
}

export async function createAddress(address, dispatch, navigate, resetForm) {
	try {
		const { data } = await apiDBC.post(
			`/endereco/${address.idPessoa}?idPessoa=${address.idPessoa}`,
			address
		);

		resetForm();
		navigate('/people');
	} catch (error) {
		console.log(error);
	}
}

export async function deleteAddress(id, dispatch) {
	try {
		await apiDBC.delete(`/endereco/${id}`);
	} catch (error) {
		console.log('Erro => ', error);
	}
}

export function cancelEdit(dispatch) {
	const updateEdit = {
		type: 'CANCEL_EDIT',
	};

	dispatch(updateEdit);
}

export function setAddressToEdit(address, dispatch) {
	const edit = {
		type: 'SET_ADDRESS_TO_EDIT',
		address: address,
	};

	dispatch(edit);
}

export async function updateAddress(address, dispatch, resetForm, navigate) {
	try {
		const endereco = await apiDBC.put(
			`/endereco/${address.idEndereco}`,
			address
		);
		resetForm();
		navigate('/people');
	} catch (error) {
		console.log('Erro =>', error);
	}
}
