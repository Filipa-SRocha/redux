import { useEffect, useState } from 'react';
import { AiOutlineHome } from 'react-icons/ai';
import { AccordeonContentContainer } from '../../components/Accordeon/Accordeon.styled';
import PersonAddress from './personAddress';
import { useNavigate } from 'react-router-dom';
import { SecondaryButton } from '../../components/button/Buttons';
import { AccordeonTab } from '../../components/Accordeon/Accordeon';
import { connect } from 'react-redux';

const AddressContainer = ({ isLoading, dispatch, person, addressList }) => {
	const navigate = useNavigate();
	const [isOpen, setIsOpen] = useState(false);

	if (isLoading) {
		return <h1>Loading...</h1>;
	}

	return (
		<>
			<AccordeonTab title='Endereços' isOpen={isOpen} setIsOpen={setIsOpen} />

			<AccordeonContentContainer className={isOpen ? 'show' : ''}>
				{addressList && addressList.length > 0 ? (
					<ul>
						{addressList.map((address) => {
							return (
								<PersonAddress
									key={`idEndereco${address.idEndereco}`}
									address={address}
									// setup={setup}
									idPessoa={person.idPessoa}
								/>
							);
						})}
					</ul>
				) : (
					<>
						<p style={{ margin: '10px 0 20px 0' }}>
							Não existe nenhuma morada cadastrada
						</p>
					</>
				)}

				<SecondaryButton
					text='Novo Endereço'
					width='160px'
					onClick={() => {
						navigate(`/new-address/${person.idPessoa}`);
					}}
				/>
			</AccordeonContentContainer>
		</>
	);
};

const mapStateToProps = (state) => ({
	person: state.peopleReducer.person,
	addressList: state.addressReducer.addressList,
	isLoading: state.addressReducer.isLoading,
});

export default connect(mapStateToProps)(AddressContainer);
