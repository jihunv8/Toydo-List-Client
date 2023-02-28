import { useEffect, useState } from 'react';
import styled from 'styled-components';

type TodoViewerType = {
  todoId: string;
  close: () => void;
};

const TodoViewer = ({ close, todoId }: TodoViewerType) => {
  type Todo = {
    todoId: string;
    title: string;
    content: string;
    isDone: boolean;
    createAt: number;
  };
  const [todo, setTodo] = useState<Todo>({
    todoId: '',
    title: '',
    content: '',
    isDone: false,
    createAt: 0,
  });

  useEffect(() => {
    fetch(`http://localhost:5000/todos/${todoId}`, { credentials: 'include' })
      .then((res) => res.json())
      .then((data) => setTodo(data));
  }, []);

  const date = new Date(todo.createAt);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  return (
    <TodoViewerrWrapper>
      <ContentsWrapper>
        <Header>
          <button onClick={close}>닫기</button>
        </Header>
        <Title>{todo.title}</Title>
        <div>
          왼료여부 <input type="checkbox" checked={todo.isDone} readOnly />
        </div>
        <div>{`${year}년 ${month}월 ${day}일`}</div>
        <Content>{todo.content}</Content>
      </ContentsWrapper>
    </TodoViewerrWrapper>
  );
};

export default TodoViewer;

const TodoViewerrWrapper = styled.div`
  background-color: #fff;
  width: 500px;
  padding: 40px;
  border: solid 1px #000;
`;

const Header = styled.div`
  width: 100%;
  display: flex;
  justify-content: right;
`;

const ContentsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
`;

const Title = styled.h2`
  width: 100%;
  height: 50px;
`;

const Content = styled.div`
  width: 100%;
  height: 300px;
`;
