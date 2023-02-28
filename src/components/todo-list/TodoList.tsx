import { useEffect, useState } from 'react';
import styled from 'styled-components';

import useModal from './hooks/useModal';
import CommmonButton from '../../styles/CommonButton';
import TodoListItem from './TodoListItem';
import TodoAdder from './TodoAdder';
import TodoViewer from './TodoViewer';
import TodoUpdater from './TodoUpdater';

export type Todo = {
  todoId: string;
  title: string;
  isDone: boolean;
};

const TodoList = () => {
  const [todoList, setTodoList] = useState<Todo[]>([]);
  const [TodoAdderModal, openTodoAdderModal, closeTodoAdderModal] = useModal();
  const [TodoViwerModal, openTodoViwerModal, closeTodoViwerModal] = useModal();
  const [TodoUpdaterModal, openTodoUpdaterModal, closeTodoUpdaterModal] = useModal();
  const [selectedTodoId, setSelectedTodoId] = useState('');

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    if (userId === null) return;

    fetch('http://localhost:5000/todos', { credentials: 'include' })
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data.todos)) {
          setTodoList(data.todos);
        }
      });
  }, []);

  return (
    <TodoListWrapper>
      <TodoAdderModal>
        <TodoAdder close={closeTodoAdderModal} setTodoList={setTodoList} />
      </TodoAdderModal>
      <TodoViwerModal>
        <TodoViewer close={closeTodoViwerModal} todoId={selectedTodoId} />
      </TodoViwerModal>
      <TodoUpdaterModal>
        <TodoUpdater close={closeTodoUpdaterModal} setTodoList={setTodoList} todoId={selectedTodoId} />
      </TodoUpdaterModal>
      <TodoListHeader>
        <Addbutton onClick={openTodoAdderModal}>todo 추가</Addbutton>
        <Filter>
          <FilterButton>전체</FilterButton>
          <FilterButton>완료</FilterButton>
          <FilterButton>미완료</FilterButton>
        </Filter>
      </TodoListHeader>

      <List>
        {todoList.map(({ todoId, title, isDone }) => {
          return (
            <TodoListItem
              key={todoId}
              todoId={todoId}
              title={title}
              isDone={isDone}
              setTodoList={setTodoList}
              setSelectedTodoId={setSelectedTodoId}
              openTodoViwerModal={openTodoViwerModal}
              openTodoUpdaterModal={openTodoUpdaterModal}
            />
          );
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
