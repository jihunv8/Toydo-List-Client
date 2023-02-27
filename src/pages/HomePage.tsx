import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import TodoList from '../components/todo-list/TodoList';

const HomePage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // if (localStorage.getItem('user') === null) {
    //   navigate('/login');
    // }
  }, []);

  return (
    <HomePageWrapper>
      <TodoList />
    </HomePageWrapper>
  );
};

export default HomePage;

const HomePageWrapper = styled.div`
  width: 100vw;
  height: 100vh;

  display: flex;
  justify-content: center;
  align-items: center;
`;
