import PeopleForm from './PeopleForm';
import { useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import { getPerson } from '../../store/actions/peopleAction';
import { PageContainer, FormContainer } from '../../components/Forms.styled';

const UpdatePerson = ({ dispatch }) => {
	const { idPessoa } = useParams();
	getPerson(idPessoa, dispatch);

	return (
		<PageContainer>
			<FormContainer>
				<h2>Atualizar Pessoa</h2>
				<PeopleForm />
			</FormContainer>
		</PageContainer>
	);
};

const mapStateToProps = (state) => ({
	people: state.peopleReducer.peopleList,
});

export default connect(mapStateToProps)(UpdatePerson);
