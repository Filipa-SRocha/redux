import { CrudActionButton } from '../../components/button/Buttons';
import Person from './Person';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

import {
	Container,
	ButtonContainer,
	ListItemContainer,
	PersonContainer,
} from './People.styled';

const ListPeople = ({ people }) => {
	//const { handleDelete, handleEdit } = useContext(PeopleContext);
	const handleEdit = () => {};
	const handleDelete = () => {};

	console.log('aqui', people);
	return (
		<>
			{people && people.length > 0 ? (
				people.map((person) => {
					return (
						<>
							<Person person={person} />
						</>
					);
				})
			) : (
				<h1>Nothing here</h1>
			)}
		</>

		// <>
		// 	<h1>Listagem</h1>
		// 	{people && people.length > 0 ? (
		// 		people.map((person) => {
		// 			console.log(person);
		// 			// return <h1>{person.nome}</h1>;
		// 			return <Person person={person} />;
		// 		})
		// 	) : (
		// 		<h1>Nothing here</h1>
		// 	)}
		// </>
	);
};
export default ListPeople;
