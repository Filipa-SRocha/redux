import { connect } from 'react-redux';
import AddressForm from './addressForm';

const UpdateAddressPage = ({ addressToEdit, dispatch }) => {
	return (
		<div>
			<AddressForm />
		</div>
	);
};

const mapStateToProps = (state) => ({
	addressToEdit: state.addressReducer.addressToEdit,
});

export default connect(mapStateToProps)(UpdateAddressPage);
