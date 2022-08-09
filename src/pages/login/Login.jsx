import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { connect } from 'react-redux';
import * as AuthActions from '../../store/actions/auth';
import { handleLogin } from '../../store/actions/auth';
import { apiDBC } from '../../api';

const Login = ({ auth, dispatch }) => {
	const SignInSchema = Yup.object().shape({
		login: Yup.string().required('Login obrigatório'),
		senha: Yup.string().required('Por favor digite a sua senha!'),
	});

	// const handleLogin = async (values) => {
	// 	try {
	// 		const { data } = await apiDBC.post('/auth', values);
	// 		const logado = {
	// 			type: 'SET_LOGIN',
	// 			token: data,
	// 		};
	// 		dispatch(logado);

	// 		//window.location.href = '/people';
	// 		//handleLogin(token);
	// 	} catch (error) {
	// 		console.log('Senha ou login inválido');
	// 	}
	// };

	return (
		<div>
			<Formik
				initialValues={{
					login: '',
					senha: '',
				}}
				validationSchema={SignInSchema}
				onSubmit={(values) => {
					handleLogin(values, dispatch);
				}}
			>
				{({ errors, touched }) => (
					<Form>
						<div>
							<label htmlFor='login'>LOGIN: </label>
							<Field name='login' placeholder='Nome de usuário' />
							{errors.login && touched.login ? <div>{errors.login}</div> : null}
						</div>

						<div>
							<label htmlFor='senha'>SENHA </label>
							<div style={{ margin: 0 }}>
								<Field name='senha' type='text' placeholder='Senha' />
							</div>
							{errors.senha && touched.senha ? <div>{errors.senha}</div> : null}
						</div>

						<button type='submit'>Login</button>
					</Form>
				)}
			</Formik>
		</div>
	);
};

const mapStateToProps = (state) => ({
	auth: state.authReducer.auth,
});

// const mapDispatchToProps = (dispatch) => ({
// 	handleLogin: (token) => dispatch(AuthActions.handleLogin(token)),
// 	//deleteLesson: () => dispatch(AuthActions.deleteLesson()),
// });

export default connect(mapStateToProps)(Login);
