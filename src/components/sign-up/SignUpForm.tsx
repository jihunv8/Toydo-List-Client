import styled from 'styled-components';
import { useState } from 'react';
import { validateId, validatePassword } from '../../util/validation';
import UserInfoInput from '../common/UserInfoInput';
import { useNavigate } from 'react-router-dom';

const SignUpForm = () => {
  const [inputName, setInputName] = useState('');
  const [inputId, setInputId] = useState('');
  const [inputPassword, setinputPassword] = useState('');
  const [inputPasswordCheck, setinputPasswordCheck] = useState('');

  const [nameWarningMessageIndex, setNameWarningMessageIndex] = useState(0);
  const [idWarningMessageIndex, setIdWarningMessageIndex] = useState(0);
  const [passwordWarningMessageIndex, setPasswordWarningMessageIndex] = useState(0);
  const [passwordCheckWarningMessageIndex, setPasswordCheckWarningMessageIndex] = useState(0);

  const navigate = useNavigate();
  const nameWarningMessages = ['', '이름을 입력하세요'];

  const idWarningMessages = [
    '',
    '아이디를 입력하세요',
    '아이디는 6 ~ 15자 사이이고 최소 1개 이상의 영문자와 숫자를 포함해야합니다.',
    '중복된 아이디입니다.',
  ];

  const passwordWarningMessages = [
    '',
    '비밀번호를 입력하세요',
    '비밀번호는 8 ~ 32자 사이이고 최소 1개 이상의 영문자와 숫자를 포함해야합니다.',
  ];

  const passwordCheckWarningMessages = ['', '비밀번호를 입력하세요', '비밀번호가 일치하지 않습니다.'];

  const setNameWarningMessage = () => {
    if (inputName.length === 0) {
      setNameWarningMessageIndex(1);
    } else {
      setNameWarningMessageIndex(0);
    }
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

  const setPasswordCheckWarningMessage = () => {
    if (inputPasswordCheck.length === 0) {
      setPasswordCheckWarningMessageIndex(1);
    } else if (inputPassword === inputPasswordCheck) {
      setPasswordCheckWarningMessageIndex(0);
    } else {
      setPasswordCheckWarningMessageIndex(2);
    }
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const isValidName = inputName.length > 0;
    const isValidId = validateId(inputId);
    const isValidPassword = validateId(inputPassword);
    const isValidPasswordCheck = inputPassword === inputPasswordCheck;

    if (isValidName && isValidId && isValidPassword && isValidPasswordCheck) {
      fetch('http://localhost:5000/users/new-user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: inputId,
          name: inputName,
          password: inputPassword,
        }),
      }).then((res) => {
        if (res.status === 201) {
          navigate('/login');
        } else if (res.status === 409) {
          setIdWarningMessageIndex(3);
        }
      });
    } else {
      setNameWarningMessage();
      setIdWarningMessage();
      setPasswordWarningMessage();
      setPasswordCheckWarningMessage();
    }
  };

  return (
    <LoginFormWrapper>
      <Form onSubmit={onSubmit}>
        <UserInfoInput
          value={inputName}
          setValue={setInputName}
          placeholder="이름"
          warningMessage={nameWarningMessages[nameWarningMessageIndex]}
          onBlur={setNameWarningMessage}
        />
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
        <UserInfoInput
          type="password"
          value={inputPasswordCheck}
          setValue={setinputPasswordCheck}
          placeholder="비밀번호 확인"
          warningMessage={passwordCheckWarningMessages[passwordCheckWarningMessageIndex]}
          onBlur={setPasswordCheckWarningMessage}
        />
        <LoginButton>회원가입</LoginButton>
      </Form>
    </LoginFormWrapper>
  );
};

export default SignUpForm;

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

const LoginButton = styled.button`
  width: 100px;
  height: 40px;
`;
