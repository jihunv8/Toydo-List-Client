import { createBrowserRouter } from 'react-router-dom';

import HomePage from './HomePage';
import LoginPage from './LoginPage';
import SignInPage from './SignInPage';

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
    element: <SignInPage />,
  },
]);

export default router;
