import { CrudActionButton } from '../../components/button/Buttons';
import { useEffect } from 'react';
import Person from './Person';
import { getPeople } from '../../store/actions/peopleAction';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { deletePerson } from '../../store/actions/peopleAction';
import { useNavigate } from 'react-router-dom';

import {
	Container,
	ButtonContainer,
	ListItemContainer,
	PersonContainer,
	Details,
} from './People.styled';
import { connect } from 'react-redux';

const ListPeople = ({ people, adressesMap, dispatch }) => {
	const navigate = useNavigate();

	useEffect(() => {
		getPeople(dispatch);
	}, []);

	const handleEdit = (idPessoa) => {
		navigate(`/people/update/${idPessoa}`);
	};

	const handleDelete = (idPessoa) => {
		deletePerson(idPessoa, dispatch, navigate);
	};

	const handleDetails = (idPessoa) => {
		navigate(`/personal/${idPessoa}`);
	};

	return (
		<Container>
			<ul>
				{people.map((person) => (
					<>
						<ListItemContainer key={person.idPessoa}>
							<PersonContainer>
								<Person person={person} />
								<ButtonContainer>
									<CrudActionButton
										text='Editar'
										icon='edit'
										borderColor='grey'
										onClick={() => {
											handleEdit(person.idPessoa);
										}}
									></CrudActionButton>
									<CrudActionButton
										text='Excluir'
										icon='delete'
										backgroundColor='#BD322B'
										color='white'
										id={person.idPessoa}
										onClick={() => {
											confirmAlert({
												title: 'Eliminar',
												message: `Quer mesmo eliminar ${person.nome}?`,
												buttons: [
													{
														label: 'Sim',
														onClick: () => handleDelete(person.idPessoa),
													},
													{
														label: 'Não',
														onClick: () => {
															return;
														},
													},
												],
											});
										}}
									></CrudActionButton>
								</ButtonContainer>
							</PersonContainer>
							<Details>
								<button onClick={() => handleDetails(person.idPessoa)}>
									Detalhes
								</button>
							</Details>
						</ListItemContainer>
					</>
				))}
			</ul>
		</Container>
	);
};

const mapStateToProps = (state) => ({
	people: state.peopleReducer.peopleList,
	adressesMap: state.addressReducer.adressesMap,
});

export default connect(mapStateToProps)(ListPeople);
