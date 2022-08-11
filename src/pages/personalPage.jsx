import {
	AccordeonsContainer,
	Container,
	Details,
	PageContainer,
	PersonContainer,
} from './people/People.styled';
import { connect } from 'react-redux';
import { getPersonByID } from '../store/actions/peopleAction';
import { useParams } from 'react-router-dom';
import Person from './people/Person';
import AddressContainer from './address/addressContainer';
import { useEffect } from 'react';
import { getAddress } from '../store/actions/addressActions';

const PersonalPage = ({ person, dispatch }) => {
	const { idPessoa } = useParams();

	useEffect(() => {
		if (idPessoa) {
			getPersonByID(idPessoa, dispatch);
			getAddress(idPessoa, dispatch);
		}
	}, []);

	if (!idPessoa || !person || Object.keys(person).length === 0) {
		return (
			<PageContainer>
				<h1>Loading</h1>
			</PageContainer>
		);
	}

	return (
		<PageContainer>
			<Container>
				<PersonContainer>
					<Person person={person} />
				</PersonContainer>
			</Container>

			<Details>
				<AccordeonsContainer>
					<AddressContainer />
				</AccordeonsContainer>
			</Details>
		</PageContainer>
	);
};

const mapStateToProps = (state) => ({
	person: state.peopleReducer.person,
	adressesMap: state.addressReducer.adressesMap,
});

export default connect(mapStateToProps)(PersonalPage);
