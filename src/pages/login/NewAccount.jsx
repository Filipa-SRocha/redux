import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import YupPassword from 'yup-password';
import { AiOutlineLock } from 'react-icons/ai';
import { AiOutlineUnlock } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { FormLogin, LogoContainer, FormContainer } from './Login.styled';
import { Errors, PageContainer } from '../../components/Forms.styled';
import Logo from '../../images/logoImg.png';
import { PrimaryButton } from '../../components/button/Buttons';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { handleSignup } from '../../store/actions/authAction';

const NewAccount = ({ auth, dispatch }) => {
	const navigate = useNavigate();
	YupPassword(Yup);

	const SignupSchema = Yup.object().shape({
		login: Yup.string()
			.min(2, 'Login demasiado curto!')
			.max(50, 'Login demasiado longo!!')
			.required('Login obrigatório'),
		senha: Yup.string()
			.required('Por favor digite uma senha forte')
			.password()
			.min(8, 'Senha precisa conter pelo menos oito caracteres')
			.minLowercase(1, 'Senha precisa conter pelo menos uma letra minuscula')
			.minUppercase(1, 'Senha precisa conter pelo menos uma letra maiuscula')
			.minNumbers(1, 'Senha precisa conter pelo menos um número')
			.minSymbols(1, 'Senha precisa conter pelo menos um caractere especial'),
	});

	return (
		<PageContainer>
			<FormContainer>
				<LogoContainer>
					<img src={Logo} alt='Logo' />

					<h1>Dashboard Kit</h1>
					<p>Criar Nova Conta</p>
					<p>Escolha um nome de usuário e uma senha</p>
				</LogoContainer>
				<FormLogin>
					<Formik
						initialValues={{
							login: '',
							senha: '',
						}}
						validationSchema={SignupSchema}
						onSubmit={(values) => {
							handleSignup(values, dispatch, navigate);
						}}
					>
						{({ errors, touched }) => (
							<Form>
								<div>
									<label htmlFor='login'>LOGIN: </label>
									<Field name='login' placeholder='Nome de usuário' />
									{errors.login && touched.login ? (
										<Errors>{errors.login}</Errors>
									) : null}
								</div>

								<div>
									<div className='StrongPassword'>
										<label htmlFor='senha'>SENHA </label>

										{errors.senha && touched.senha ? (
											<AiOutlineUnlock style={{ color: 'red' }} />
										) : touched.senha ? (
											<AiOutlineLock style={{ color: 'green' }} />
										) : (
											<></>
										)}
									</div>

									<Field name='senha' type='password' placeholder='Senha' />
									{errors.senha && touched.senha ? (
										<Errors>{errors.senha}</Errors>
									) : null}
								</div>

								<PrimaryButton type='submit' text='Cadastrar' />
							</Form>
						)}
					</Formik>
				</FormLogin>
				<div>
					<Link to='/login' className={'testing'}>
						Já tem uma conta?<span> Faça Login</span>
					</Link>
				</div>
			</FormContainer>
		</PageContainer>
	);
};

const mapStateToProps = (state) => ({
	auth: state.authReducer.auth,
});

export default connect(mapStateToProps)(NewAccount);
