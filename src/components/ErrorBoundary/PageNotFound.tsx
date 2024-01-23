import { useNavigate } from 'react-router-dom';
import { apiUrls } from '../../constants/apiUrls';
import {
  Button,
  SpaceCenter,
  Title
} from '../index';

const PageNotFound = (): JSX.Element => {
  const navigate = useNavigate();
  const navigateToHome = (): void => {
    navigate(apiUrls.root);
  };

  return (
    <SpaceCenter data-testid="page-not-found-content">
      not Found
      <Title>Page not found</Title>
      <Button type="primary" onClick={navigateToHome}>Go home</Button>
    </SpaceCenter>
  );
};

export default PageNotFound;
