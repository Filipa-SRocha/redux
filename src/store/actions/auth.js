import { apiDBC } from '../../api';

export async function handleLogin(values, dispatch) {
	try {
		const { data } = await apiDBC.post('/auth', values);
		localStorage.setItem('token', data);
		apiDBC.defaults.headers.common['Authorization'] = data;
		const logado = {
			type: 'SET_LOGIN',
			token: data,
		};
		dispatch(logado);
	} catch (error) {
		console.log('Senha ou login inválido');
	}
}
