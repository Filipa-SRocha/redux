export async function handleLogin(token) {
	//console.log(token);
	return {
		type: 'SET_LOGIN',
		token: token,
	};
}
