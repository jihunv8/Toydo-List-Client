import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginForm from '../components/login/LoginForm';

const LoginPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem('userId') !== null) {
      navigate('/');
    }
  }, []);

  return (
    <div>
      <LoginForm />
    </div>
  );
};

export default LoginPage;
