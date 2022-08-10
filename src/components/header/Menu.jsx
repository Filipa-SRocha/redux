import Item from './Item';
import { NavList } from './Header.styled';
import { SecondaryButton } from '../button/Buttons';
import { connect } from 'react-redux';
import { handleLogout } from '../../store/actions/authAction';
import { useNavigate } from 'react-router-dom';

const Menu = ({ isLogged, dispatch }) => {
	const navigate = useNavigate();

	const LoggedOutMenu = () => {
		return (
			<>
				<Item name='Login' url='/login' />
				<Item name='Cadastrar Usuário' url='/users' />
			</>
		);
	};

	const LoggedInMenu = () => {
		return (
			<NavList>
				<div>
					<Item name='Overview' url='#' />
					<Item name='Pessoas' url='/people' />
					<Item name='Endereços' url='#' />
					<Item name='Contatos' url='#' />
				</div>

				<div>
					<Item name='Settings' url='#' />
					<Item name='Subscriptions' url='#' />
				</div>

				<SecondaryButton
					width='180px'
					text='Logout'
					onClick={() => handleLogout(dispatch, navigate)}
				/>
			</NavList>
		);
	};

	return (
		<nav>
			<NavList>{isLogged ? <LoggedInMenu /> : <LoggedOutMenu />}</NavList>
		</nav>
	);
};

const mapStateToProps = (state) => ({
	isLogged: state.authReducer.auth.isLogged,
});

export default connect(mapStateToProps)(Menu);
