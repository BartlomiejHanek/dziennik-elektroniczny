import { useLocation, useNavigate } from 'react-router';
import AuthForm from '../components/AuthForm.jsx';
import { useAuth } from '../context/AuthContext.jsx';

export default function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { setAuthenticatedUser } = useAuth();

  function handleAuthenticated(user) {
    setAuthenticatedUser(user);
    navigate(location.state?.from?.pathname || '/test', { replace: true });
  }

  return <AuthForm mode="login" onAuthenticated={handleAuthenticated} />;
}
