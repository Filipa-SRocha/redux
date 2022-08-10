import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/dashboard/Dashboard';
import Login from './pages/login/Login';
import People from './pages/people/People';
import { RegisterPerson } from './pages/people/RegisterPerson';
import { connect } from 'react-redux';
import { useEffect } from 'react';
import { isAuth } from './store/actions/authAction';
import UpdatePerson from './pages/people/UpdatePerson';
import { GlobalStyle } from './globalStyles.styled';
import Header from './components/header/Header';
import NotFoundPage from './pages/notFound/NotFoundPage';
import NewAccount from './pages/login/NewAccount';

const Routers = ({ auth, dispatch }) => {
	useEffect(() => {
		isAuth(dispatch);
	}, []);

	// if (auth.isLoading) {
	// 	return <h1>Loading</h1>;
	// }

	return (
		<BrowserRouter>
			<GlobalStyle />
			<Header />
			<Routes>
				{auth.isLogged ? (
					<>
						<Route path='/' element={<Dashboard />} />
						<Route path='/people' element={<People />} />
						<Route
							path='/people/register-person'
							element={<RegisterPerson />}
						/>
						<Route path='/people/update/:idPessoa' element={<UpdatePerson />} />
					</>
				) : (
					<>
						<Route path='/login' element={<Login />} />
						<Route path='/new-account' element={<NewAccount />} />
					</>
				)}
				<Route path='*' element={<NotFoundPage />} />
			</Routes>
		</BrowserRouter>
	);
};

const mapStateToProps = (state) => ({
	auth: state.authReducer.auth,
});

export default connect(mapStateToProps)(Routers);
