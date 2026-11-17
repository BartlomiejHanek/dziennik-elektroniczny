import { useNavigate } from 'react-router';
import AuthForm from '../components/AuthForm.jsx';
import { useAuth } from '../context/AuthContext.jsx';

export default function RegisterPage() {
  const navigate = useNavigate();
  const { setAuthenticatedUser } = useAuth();

  function handleAuthenticated(user) {
    setAuthenticatedUser(user);
    navigate('/test', { replace: true });
  }

  return <AuthForm mode="register" onAuthenticated={handleAuthenticated} />;
}
