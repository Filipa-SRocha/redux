import { useEffect } from 'react';
import { connect } from 'react-redux';
import { getPeople } from '../../store/actions/peopleAction';
import ListPeople from './ListPeople';
import { useNavigate } from 'react-router-dom';
import { PageContainer } from './People.styled';

const People = ({ people, dispatch }) => {
	const navigate = useNavigate();

	const handleRegister = () => {
		navigate('/people/register-person');
	};

	useEffect(() => {
		getPeople(dispatch);
	}, []);

	return (
		<PageContainer>
			<div className='peopleTitle'>
				<h1>Pessoas</h1>
			</div>
			<div className='addButtonContainer'>
				<button onClick={handleRegister}> Nova Pessoa</button>
			</div>

			<ListPeople />
		</PageContainer>
	);
};

const mapStateToProps = (state) => ({
	people: state.peopleReducer.peopleList,
});

export default connect(mapStateToProps)(People);
