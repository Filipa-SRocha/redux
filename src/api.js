import axios from 'axios';

const apiDBC = axios.create({
	baseURL: 'https://dbc-pessoa-api.herokuapp.com/',
});

export { apiDBC };
