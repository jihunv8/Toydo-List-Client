import { useState } from 'react';
import styled from 'styled-components';

import type { Todo } from './TodoList';

type TodoAdderPropsType = {
  close: () => void;
  setTodoList: React.Dispatch<React.SetStateAction<Todo[]>>;
};

const TodoAdder = ({ close, setTodoList }: TodoAdderPropsType) => {
  const [inputTitle, setInputTitle] = useState('');
  const [inputContent, setInputContent] = useState('');

  const addTodo = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    fetch('http://localhost:5000/todos', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: inputTitle,
        content: inputContent,
      }),
    })
      .then((res) => res.json())
      .then(({ todo: { todoId, title, isDone } }) => {
        setTodoList((prev) => {
          const newTodoList = [{ todoId, title, isDone }, ...prev];
          return newTodoList;
        });
        close();
      });
  };

  return (
    <TodoAdderWrapper>
      <Form onSubmit={addTodo}>
        <Header>
          <button onClick={close}>닫기</button>
        </Header>
        <InputTitle onChange={(e) => setInputTitle(e.target.value)} placeholder="제목" value={inputTitle} />
        <InputContent
          onChange={(e) => setInputContent(e.target.value)}
          placeholder="내용"
          value={inputContent}
        ></InputContent>
        <Footer>
          <button>작성</button>
        </Footer>
      </Form>
    </TodoAdderWrapper>
  );
};

export default TodoAdder;

const TodoAdderWrapper = styled.div`
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
