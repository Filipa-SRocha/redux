import { PageContainer } from '../people/People.styled';
import Logo from '../../images/notfoundLogo.png';

const NotFoundPage = () => {
	return (
		<PageContainer>
			<img src={Logo} alt='Logo' />
			<h1>404</h1>
			<p>Page Not Found</p>
		</PageContainer>
	);
};
export default NotFoundPage;
