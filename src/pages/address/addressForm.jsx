import { useFormikContext, Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { useEffect } from 'react';
import { apiCep } from '../../api';
import NumberFormat from 'react-number-format';
import {
	PageContainer,
	FormContainerWider,
	StyledForm,
} from '../../components/Forms.styled';
import {
	PrimaryButton,
	SecondaryButton,
} from '../../components/button/Buttons';
import { useNavigate } from 'react-router-dom';
import { removeCepInputFormat, removeCepMask } from '../../utils/mascaras';
import { Errors } from '../../components/Forms.styled';
import { connect } from 'react-redux';
import {
	cancelEdit,
	createAddress,
	updateAddress,
} from '../../store/actions/addressActions';

const AddressForm = ({
	idPessoa,
	address,
	isEditMode,
	addressToEdit,
	dispatch,
}) => {
	const navigate = useNavigate();

	const handleCep = async (values) => {
		const cep = removeCepMask(values.cep);
		try {
			const { data } = await apiCep.get(`/${cep}/json/`);
			values.logradouro = data.logradouro;
			values.estado = data.uf;
			values.complemento = data.complemento;
			values.cidade = data.localidade;
		} catch (error) {
			console.log(error);
		}
	};

	const GetCep = () => {
		const { values } = useFormikContext();

		useEffect(() => {
			if (!values.cep.includes('_')) {
				handleCep(values);
			}
		}, [values.cep]);
	};

	const handlePreviousData = (values) => {
		// const { data } = await getAddressByAddressId(idEndereco);
		values.tipo = addressToEdit.tipo;
		values.logradouro = addressToEdit.logradouro;
		values.numero = addressToEdit.numero;
		values.complemento = addressToEdit.complemento;
		values.cep = addressToEdit.cep;
		values.cidade = addressToEdit.cidade;
		values.estado = addressToEdit.estado;
		values.pais = addressToEdit.pais;
	};

	const GetPreviusData = () => {
		const { values } = useFormikContext();
		useEffect(() => {
			handlePreviousData(values);
		}, []);
	};

	const handleSubmit = (values, resetForm) => {
		console.log('Handle submit', values);
		const cleanAddress = cleanInputs(values);
		if (isEditMode) {
			// 	setIsEditMode(false);
			console.log('EditMide', {
				...cleanAddress,
				idEndereco: addressToEdit.idEndereco,
			});
			updateAddress(
				{
					...cleanAddress,
					idEndereco: addressToEdit.idEndereco,
				},
				dispatch,
				resetForm,
				navigate
			);
			// 	updateAddress(idEndereco, cleanAddress, resetForm);
			// 	return;
		}
		createAddress(cleanAddress, dispatch, navigate, resetForm);
	};

	const handleCancel = () => {
		//falta alterar editmode nas actions
		cancelEdit(dispatch);
		navigate('/people');
	};

	const cleanInputs = (values) => {
		const newCep = values.cep.replaceAll('-', '');
		const newAddress = {
			idPessoa: parseInt(idPessoa),
			tipo: values.tipo,
			logradouro: values.logradouro,
			numero: parseInt(values.numero),
			complemento: values.complemento,
			cep: newCep,
			cidade: values.cidade,
			estado: values.estado,
			pais: values.pais,
		};
		return newAddress;
	};

	const SignupSchema = Yup.object().shape({
		cep: Yup.string()
			.min(8, 'Cep inválido!')
			.max(9, 'cep inválido!')
			.required('Cep Obrigatório'),

		tipo: Yup.string().required('Campo obrigatório'),
		logradouro: Yup.string()
			.required('Campo obrigatório')
			.min(3, 'Deve ter pelo menos 3 caracteres')
			.max(250, 'Campo demasiado longo. (Máx: 250 caracteres)'),
		numero: Yup.number('Deve ser um número').required('Campo obrigatório'),
		cidade: Yup.string()
			.required('Campo obrigatório')
			.min(2, 'Deve ter pelo menos 2 caracteres')
			.max(250, 'Campo demasiado longo. (Máx: 250 caracteres)'),
		estado: Yup.string()
			.required('Campo obrigatório')
			.min(2, 'Deve ter pelo menos 2 caracteres')
			.max(250, 'Campo demasiado longo. (Máx: 250 caracteres)'),
		pais: Yup.string()
			.required('Campo obrigatório')
			.min(2, 'Deve ter pelo menos 2 caracteres')
			.max(250, 'Campo demasiado longo. (Máx: 250 caracteres)'),
	});

	function validateCep(value) {
		let error;

		const newCep = removeCepInputFormat(value);

		if (newCep.length !== 8) {
			error = 'CEP Inválido';
		}
		return error;
	}

	return (
		<PageContainer>
			<FormContainerWider>
				<h2>Cadastro de Endereço</h2>
				<StyledForm>
					<Formik
						initialValues={{
							tipo: '',
							logradouro: '',
							numero: '',
							complemento: '',
							cep: '',
							cidade: '',
							estado: '',
							pais: '',
						}}
						validationSchema={SignupSchema}
						onSubmit={(values, { resetForm }) => {
							handleSubmit(values, resetForm);
						}}
					>
						{({ errors, touched }) => (
							<Form>
								{isEditMode ? <GetPreviusData /> : ''}
								<div>
									<label htmlFor='cep'>CEP* </label>
									<Field name='cep' validate={validateCep}>
										{({ field, form, meta }) => (
											<NumberFormat
												{...field}
												format='#####-###'
												mask='_'
												id='cep'
												type='text'
											/>
										)}
									</Field>
									{touched.cep ? <GetCep /> : null}

									{errors.cep && touched.cep ? (
										<Errors>{errors.cep}</Errors>
									) : null}
								</div>
								<div>
									<label htmlFor='tipo'>Tipo*: </label>
									<Field
										component='select'
										id='tipo'
										name='tipo'
										multiple={false}
									>
										<option value='' hidden>
											Escolha uma opção
										</option>
										<option value='COMERCIAL'>Comercial</option>
										<option value='RESIDENCIAL'>Residencial</option>
									</Field>
									{errors.tipo && touched.tipo ? (
										<Errors>{errors.tipo}</Errors>
									) : null}
								</div>
								<div>
									<label htmlFor='logradouro'>Logradouro*</label>
									<Field name='logradouro' />
									{touched.logradouro && errors.logradouro ? (
										<Errors>{errors.logradouro}</Errors>
									) : null}
								</div>
								<div className='flexContainer'>
									<div>
										<label htmlFor='numero'>Numero* </label>
										<Field name='numero' />
										{errors.numero && touched.numero ? (
											<Errors>{errors.numero}</Errors>
										) : null}
									</div>

									<div>
										<label htmlFor='complemento'>Complemento </label>
										<Field name='complemento' />
										{errors.complemento && touched.complemento ? (
											<Errors>{errors.complemento}</Errors>
										) : null}
									</div>
								</div>
								<div>
									<label htmlFor='cidade'>Cidade* </label>
									<Field name='cidade' />
									{errors.cidade && touched.cidade ? (
										<Errors>{errors.cidade}</Errors>
									) : null}
								</div>
								<div className='flexContainer'>
									<div>
										<label htmlFor='estado'>Estado* </label>
										<Field name='estado' />
										{errors.estado && touched.estado ? (
											<Errors>{errors.estado}</Errors>
										) : null}
									</div>
									<div>
										<label htmlFor='pais'>País* </label>
										<Field name='pais' />
										{errors.pais && touched.pais ? (
											<Errors>{errors.pais}</Errors>
										) : null}
									</div>
								</div>

								{isEditMode ? (
									<PrimaryButton text='Editar' disable type='submit' />
								) : (
									<PrimaryButton text='Cadastrar' type='submit' />
								)}
								<SecondaryButton text='Cancelar' onClick={handleCancel} />
							</Form>
						)}
					</Formik>
				</StyledForm>
			</FormContainerWider>
		</PageContainer>
	);
};

const mapStateToProps = (state) => ({
	address: state.addressReducer.address,
	isEditMode: state.addressReducer.isEditMode,
	addressToEdit: state.addressReducer.addressToEdit,
});

export default connect(mapStateToProps)(AddressForm);
