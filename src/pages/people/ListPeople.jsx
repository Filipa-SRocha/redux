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
	console.log('listaaa');
	console.log('aqui', people);
	return (
		<>
			<h1>Listagem</h1>
			{people && people.length > 0 ? (
				people.map((person) => {
					console.log(person);
					return <h1>{person.nome}</h1>;
				})
			) : (
				<h1>Nothing here</h1>
			)}
		</>
	);
};
export default ListPeople;
