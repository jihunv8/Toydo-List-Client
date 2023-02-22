import styled from 'styled-components';

type UserInfoInputType = {
  type?: string;
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  placeholder?: string;
  warningMessage?: string;
  onBlur?: () => void;
};

const UserInfoInput = ({
  type,
  value,
  setValue,
  placeholder = '',
  warningMessage = '',
  onBlur = () => {},
}: UserInfoInputType) => {
  return (
    <UserInfoInputWrapper>
      <Input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
        }}
        onBlur={onBlur}
      />
      <ErrorMessage>{warningMessage}</ErrorMessage>
    </UserInfoInputWrapper>
  );
};

export default UserInfoInput;

const UserInfoInputWrapper = styled.div`
  width: 100%;
`;

const Input = styled.input`
  width: 100%;
  height: 30px;
  text-indent: 10px;
  outline: none;
`;

const ErrorMessage = styled.div`
  width: 100%;
  height: 20px;
  padding: 2px;
  color: tomato;
  font-size: 12px;
`;
