import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/dashboard/Dashboard';
import Login from './pages/login/Login';
import People from './pages/people/People';

const Routers = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path='/' element={<Dashboard />} />
				<Route path='/login' element={<Login />} />
				<Route path='/people' element={<People />} />
			</Routes>
		</BrowserRouter>
	);
};
export default Routers;
