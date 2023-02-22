import { createBrowserRouter } from 'react-router-dom';

import HomePage from './HomePage';
import LoginPage from './LoginPage';
import SignUpPage from './SignUpPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/sign-up',
    element: <SignUpPage />,
  },
]);

export default router;
