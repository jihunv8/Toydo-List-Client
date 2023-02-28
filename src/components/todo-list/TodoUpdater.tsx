import styled from 'styled-components';
import { useEffect, useState } from 'react';

import type { Todo } from './TodoList';

type TodoUpdaterPropsType = {
  todoId: string;
  close: () => void;
  setTodoList: React.Dispatch<React.SetStateAction<Todo[]>>;
};

const TodoUpdater = ({ close, setTodoList, todoId }: TodoUpdaterPropsType) => {
  const [inputTitle, setInputTitle] = useState('');
  const [isDone, setIsDone] = useState(false);
  const [inputContent, setInputContent] = useState('');

  useEffect(() => {
    fetch(`http://localhost:5000/todos/${todoId}`, { credentials: 'include' })
      .then((res) => res.json())
      .then((data) => {
        const { title, content, isDone } = data;
        setInputTitle(title);
        setInputContent(content);
        setIsDone(isDone);
      });
  }, []);

  const update = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    fetch(`http://localhost:5000/todos/${todoId}`, {
      method: 'PUT',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        isDone,
        title: inputTitle,
        content: inputContent,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      });
    setTodoList((prev) => {
      return prev.map((todo) => {
        if (todo.todoId !== todoId) {
          return todo;
        } else {
          const newTodo = {
            ...todo,
            isDone,
            title: inputTitle,
          };
          return newTodo;
        }
      });
    });

    close();
  };

  return (
    <TodoUpdaterWrapper>
      <Form onSubmit={update}>
        <Header>
          <button onClick={close}>닫기</button>
        </Header>
        <InputTitle placeholder="제목" value={inputTitle} onChange={(e) => setInputTitle(e.target.value)} />
        <InputIsDone>
          왼료여부 <input type="checkbox" checked={isDone} onChange={(e) => setIsDone(e.target.checked)} />
        </InputIsDone>
        <InputContent placeholder="내용" value={inputContent} onChange={(e) => setInputContent(e.target.value)} />
        <Footer>
          <button>작성</button>
        </Footer>
      </Form>
    </TodoUpdaterWrapper>
  );
};

export default TodoUpdater;

const TodoUpdaterWrapper = styled.div`
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

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30px;
`;

const InputTitle = styled.input`
  width: 100%;
  height: 50px;
  text-indent: 10px;
`;

const InputIsDone = styled.div`
  width: 100%;
  display: flex;
  justify-content: left;
`;

const InputContent = styled.textarea`
  width: 100%;
  height: 300px;
  padding: 10px;
  resize: none;
`;

const Footer = styled.div`
  width: 100%;
  display: flex;
  justify-content: right;
`;
