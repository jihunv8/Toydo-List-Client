import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { validateId, validatePassword } from '../../util/validation';

import UserInfoInput from '../common/UserInfoInput';

const LoginForm = () => {
  const [inputId, setInputId] = useState('');
  const [inputPassword, setinputPassword] = useState('');
  const [idWarningMessageIndex, setIdWarningMessageIndex] = useState(0);
  const [passwordWarningMessageIndex, setPasswordWarningMessageIndex] = useState(0);

  const idWarningMessages = [
    '',
    '아이디를 입력하세요',
    '아이디는 6 ~ 15자 사이이고 최소 1개 이상의 영문자와 숫자를 포함해야합니다.',
  ];
  const passwordWarningMessages = [
    '',
    '비밀번호를 입력하세요',
    '비밀번호는 8 ~ 32자 사이이고 최소 1개 이상의 영문자와 숫자를 포함해야합니다.',
  ];

  const onChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setinputPassword(e.target.value);
  };

  const setIdWarningMessage = () => {
    if (inputId.length === 0) {
      setIdWarningMessageIndex(1);
    } else if (validateId(inputId)) {
      setIdWarningMessageIndex(0);
    } else {
      setIdWarningMessageIndex(2);
    }
  };

  const setPasswordWarningMessage = () => {
    if (inputPassword.length === 0) {
      setPasswordWarningMessageIndex(1);
    } else if (validatePassword(inputPassword)) {
      setPasswordWarningMessageIndex(0);
    } else {
      setPasswordWarningMessageIndex(2);
    }
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const isValidId = validateId(inputId);
    const isValidPassword = validateId(inputPassword);
    if (isValidId && isValidPassword) {
      console.log('요청함');
    } else {
      setIdWarningMessage();
      setPasswordWarningMessage();
    }
  };

  return (
    <LoginFormWrapper>
      <Form onSubmit={onSubmit}>
        <UserInfoInput
          value={inputId}
          setValue={setInputId}
          placeholder="아이디"
          warningMessage={idWarningMessages[idWarningMessageIndex]}
          onBlur={setIdWarningMessage}
        />
        <UserInfoInput
          type="password"
          value={inputPassword}
          setValue={setinputPassword}
          placeholder="비밀번호"
          warningMessage={passwordWarningMessages[passwordWarningMessageIndex]}
          onBlur={setPasswordWarningMessage}
        />
        <LoginButton>로그인</LoginButton>
        <SignUpLink to="/sign-up">회원가입</SignUpLink>
      </Form>
    </LoginFormWrapper>
  );
};

export default LoginForm;

const LoginFormWrapper = styled.div`
  width: 100vw;
  height: 100vh;

  display: flex;
  justify-content: center;
  align-items: center;
`;

const Form = styled.form`
  width: 500px;
  padding: 80px 100px 40px 100px;
  border: solid 1px #000;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30px;
`;

const InputContainer = styled.div`
  width: 100%;
`;

const Input = styled.input`
  width: 100%;
  height: 30px;
  text-indent: 10px;
  outline: none;
`;

const ErrorViewer = styled.div`
  width: 100%;
  height: 20px;
  padding: 2px;
  color: tomato;
  font-size: 12px;
`;

const LoginButton = styled.button`
  width: 100px;
  height: 40px;
`;

const SignUpLink = styled(Link)`
  font-size: 12px;
  color: #000;
`;
