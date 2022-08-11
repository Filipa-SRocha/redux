import { useNavigate } from 'react-router-dom';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { MdHomeRepairService } from 'react-icons/md';
import { AiOutlineHome } from 'react-icons/ai';
import { BiEditAlt } from 'react-icons/bi';
import { AiOutlineClose } from 'react-icons/ai';
import { CrudSmallActionButton } from '../../components/button/Buttons';
import { connect } from 'react-redux';

import {
	AccordeonItemContainer,
	AccordeonDetailsContainer,
	AccordeonButtonsContainer,
} from '../../components/Accordeon/Accordeon.styled';
import {
	deleteAddress,
	getAddress,
	setAddressToEdit,
} from '../../store/actions/addressActions';

const PersonAddress = ({ address, setup, idPessoa, dispatch }) => {
	const navigate = useNavigate();

	const handleDelete = async () => {
		await deleteAddress(address.idEndereco, dispatch);
		getAddress(idPessoa, dispatch);
	};

	const handleEdit = () => {
		console.log('fire');
		setAddressToEdit(address, dispatch);
		navigate('/address/update');
	};

	console.log(address);
	return (
		<AccordeonItemContainer>
			<AccordeonDetailsContainer>
				<div>
					{address.tipo === 'COMERCIAL' ? (
						<MdHomeRepairService />
					) : (
						<AiOutlineHome />
					)}
					<p>
						{address.logradouro}, {address.numero}, {address.complemento}
					</p>
				</div>
				<small>
					{address.cep} {address.cidade}, {address.estado}, {address.pais}
				</small>
			</AccordeonDetailsContainer>

			<AccordeonButtonsContainer>
				<CrudSmallActionButton
					text='Editar'
					icon='edit'
					borderColor='grey'
					onClick={handleEdit}
				></CrudSmallActionButton>
				<CrudSmallActionButton
					text='Excluir'
					icon='delete'
					backgroundColor='#BD322B'
					color='white'
					onClick={() => {
						confirmAlert({
							title: 'Eliminar',
							message: `Quer mesmo eliminar este endereço?`,
							buttons: [
								{
									label: 'Sim',
									onClick: () => handleDelete(),
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
				/>
			</AccordeonButtonsContainer>
		</AccordeonItemContainer>
	);
};

const mapStateToProps = (state) => ({
	person: state.peopleReducer.person,
	addressList: state.addressReducer.addressList,
	isLoading: state.addressReducer.isLoading,
});

export default connect(mapStateToProps)(PersonAddress);
