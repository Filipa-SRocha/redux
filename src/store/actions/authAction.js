import { apiDBC } from '../../api';

export async function handleLogin(values, dispatch, navigate) {
	try {
		const { data } = await apiDBC.post('/auth', values);
		localStorage.setItem('token', data);
		apiDBC.defaults.headers.common['Authorization'] = data;
		const logado = {
			type: 'SET_LOGIN',
			token: data,
		};
		dispatch(logado);
		navigate('/people');
	} catch (error) {
		console.log('Senha ou login inválido');
	}
}

export function isAuth(dispatch) {
	const token = localStorage.getItem('token');

	if (token) {
		apiDBC.defaults.headers.common['Authorization'] = token;
		const logado = {
			type: 'SET_LOGIN',
			token: token,
		};
		dispatch(logado);
	}
}

export function handleLogout(dispatch, navigate) {
	localStorage.removeItem('token');
	apiDBC.defaults.headers.common['Authorization'] = undefined;
	const logout = {
		type: 'SET_LOGOUT',
	};

	dispatch(logout);
	navigate('/login');
}
