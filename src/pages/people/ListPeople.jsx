// import { CrudActionButton } from '../../components/button/Buttons';
// import Person from './Person';
// import { confirmAlert } from 'react-confirm-alert';
// import 'react-confirm-alert/src/react-confirm-alert.css';

// import {
// 	Container,
// 	ButtonContainer,
// 	ListItemContainer,
// 	PersonContainer,
// } from './People.styled';

// const ListPeople = ({ people }) => {
// 	//const { handleDelete, handleEdit } = useContext(PeopleContext);

// 	return (
// 		<Container>
// 			<ul>
// 				{people.map((person) => (
// 					<>
// 						<ListItemContainer key={person.idPessoa}>
// 							<PersonContainer>
// 								<Person person={person} />
// 								<ButtonContainer>
// 									<CrudActionButton
// 										text='Editar'
// 										icon='edit'
// 										borderColor='grey'
// 										onClick={() => {
// 											// handleEdit(person.idPessoa);
// 										}}
// 									></CrudActionButton>
// 									<CrudActionButton
// 										text='Excluir'
// 										icon='delete'
// 										backgroundColor='#BD322B'
// 										color='white'
// 										id={person.idPessoa}
// 										onClick={() => {
// 											confirmAlert({
// 												title: 'Eliminar',
// 												message: `Quer mesmo eliminar ${person.nome}?`,
// 												buttons: [
// 													{
// 														label: 'Sim',
// 														// onClick: () => handleDelete(person.idPessoa),
// 													},
// 													{
// 														label: 'Não',
// 														onClick: () => {
// 															return;
// 														},
// 													},
// 												],
// 											});
// 										}}
// 									></CrudActionButton>
// 								</ButtonContainer>
// 							</PersonContainer>
// 						</ListItemContainer>
// 					</>
// 				))}
// 			</ul>
// 		</Container>
// 	);
// };
// export default ListPeople;
