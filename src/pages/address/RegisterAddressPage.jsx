import { useParams } from 'react-router-dom';
import AddressForm from './addressForm';

const RegisterAddressPage = ({ dispatch }) => {
	const { idPessoa } = useParams();

	return (
		<>
			{idPessoa ? (
				<div>
					<h1>Registre uma nova morada</h1>

					<AddressForm idPessoa={idPessoa} />
				</div>
			) : (
				<></>
			)}
		</>
	);
};

export default RegisterAddressPage;
