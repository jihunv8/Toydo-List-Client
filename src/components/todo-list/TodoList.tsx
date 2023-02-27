import { useEffect, useState } from 'react';
import styled from 'styled-components';

import CommmonButton from '../../styles/CommonButton';
import useModal from './hooks/useModal';
import TodoAdder from './TodoAdder';
import TodoListItem from './TodoListItem';

export type Todo = {
  todoId: string;
  title: string;
  isDone: boolean;
};

const TodoList = () => {
  const [todoList, setTodoList] = useState<Todo[]>([]);
  const [Modal, openModal, closeModal] = useModal();

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    if (userId === null) return;

    fetch('http://localhost:5000/todos', { credentials: 'include' })
      .then((res) => res.json())
      .then((data) => {
        setTodoList(data.todos);
      });
  }, []);

  return (
    <TodoListWrapper>
      <TodoListHeader>
        <Modal>
          <TodoAdder close={closeModal} setTodoList={setTodoList} />
        </Modal>
        <Addbutton onClick={openModal}>todo 추가</Addbutton>
        <Filter>
          <FilterButton>전체</FilterButton>
          <FilterButton>완료</FilterButton>
          <FilterButton>미완료</FilterButton>
        </Filter>
      </TodoListHeader>

      <List>
        {todoList.map(({ todoId, title, isDone }) => {
          return <TodoListItem key={todoId} todoId={todoId} title={title} isDone={isDone} setTodoList={setTodoList} />;
        })}
      </List>
    </TodoListWrapper>
  );
};

export default TodoList;

const TodoListWrapper = styled.div`
  width: 800px;
  padding: 60px 100px 40px 100px;
  margin: 120px auto 0;
  border: solid 1px #000;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30px;
`;

const TodoListHeader = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const Addbutton = styled(CommmonButton)`
  align-self: flex-end;
`;

const Filter = styled.div`
  margin-top: 20px;
  display: flex;
  gap: 10px;
`;

const FilterButton = styled.button`
  background-color: transparent;
  border: none;
`;

const List = styled.ul`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;
