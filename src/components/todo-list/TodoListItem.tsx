import styled from 'styled-components';

import type { Todo } from './TodoList';

type TodoListItemProps = {
  todoId: string;
  title: string;
  isDone: boolean;
  setTodoList: React.Dispatch<React.SetStateAction<Todo[]>>;
};

const TodoListItem = ({ todoId, title, isDone, setTodoList }: TodoListItemProps) => {
  const remove = () => {
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
    <TodoListItemWrapper key={todoId}>
      <CheckBox type="checkbox" onChange={() => {}} checked={isDone} />
      <Title className="title">{title}</Title>
      <ButtonContainer className="button-container">
        <button>수정</button>
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
