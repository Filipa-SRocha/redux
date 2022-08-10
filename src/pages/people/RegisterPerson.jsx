import { FormContainer, PageContainer } from '../../components/Forms.styled';

import PeopleForm from './PeopleForm';

const RegisterPerson = () => {
	return (
		<PageContainer>
			<FormContainer>
				<h2>Cadastrar Pessoa</h2>
				<PeopleForm />
			</FormContainer>
		</PageContainer>
	);
};
export { RegisterPerson };
