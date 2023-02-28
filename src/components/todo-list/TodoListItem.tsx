import styled from 'styled-components';

import type { Todo } from './TodoList';

type TodoListItemProps = {
  todoId: string;
  title: string;
  isDone: boolean;
  setTodoList: React.Dispatch<React.SetStateAction<Todo[]>>;
  setSelectedTodoId: React.Dispatch<React.SetStateAction<string>>;
  openTodoViwerModal: () => void;
  openTodoUpdaterModal: () => void;
};

const TodoListItem = ({
  todoId,
  title,
  isDone,
  setTodoList,
  setSelectedTodoId,
  openTodoViwerModal,
  openTodoUpdaterModal,
}: TodoListItemProps) => {
  const select = () => {
    setSelectedTodoId(todoId);
    openTodoViwerModal();
  };

  const update = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();
    setSelectedTodoId(todoId);
    openTodoUpdaterModal();
  };

  const remove = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();

    fetch(`http://localhost:5000/todos/${todoId}`, {
      method: 'DELETE',
      credentials: 'include',
    }).then((res) => {
      if (res.status === 200) {
        setTodoList((prev) => {
          const newTodoList: Todo[] = prev.filter((todo) => {
            return todo.todoId !== todoId;
          });

          return newTodoList;
        });
      }
    });
  };

  return (
    <TodoListItemWrapper onClick={select}>
      <CheckBox type="checkbox" onChange={() => {}} onClick={(e) => e.stopPropagation()} checked={isDone} />
      <Title className="title">{title}</Title>
      <ButtonContainer className="button-container">
        <button onClick={update}>수정</button>
        <button onClick={remove}>삭제</button>
      </ButtonContainer>
    </TodoListItemWrapper>
  );
};

export default TodoListItem;

const ButtonContainer = styled.div`
  visibility: hidden;
  display: flex;
  gap: 10px;
`;

const TodoListItemWrapper = styled.li`
  cursor: pointer;
  width: 100%;
  padding: 10px 20px;
  display: flex;
  gap: 10px;
  border: solid 1px #000;

  &:hover > ${ButtonContainer} {
    visibility: visible;
  }
`;

const CheckBox = styled.input`
  cursor: pointer;
`;

const Title = styled.div`
  flex-grow: 1;
`;
