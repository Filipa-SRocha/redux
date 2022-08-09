import { useEffect } from 'react';
import { connect } from 'react-redux';
import { getPeople } from '../../store/actions/people';
import ListPeople from './ListPeople';

const People = ({ people, dispatch }) => {
	const handleRegister = () => {};

	useEffect(() => {
		getPeople(dispatch);
	}, []);

	return (
		<div>
			<h1>Pessoas</h1>
			<div className='peopleTitle'>
				<h1>Pessoas</h1>
			</div>
			<div className='addButtonContainer'>
				<button text='+ Nova Pessoa' onClick={handleRegister} />
			</div>
			Lista de Pessoas
			<ListPeople people={people} />
		</div>
	);
};

const mapStateToProps = (state) => ({
	people: state.peopleReducer.peopleList,
});

export default connect(mapStateToProps)(People);
