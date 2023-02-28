import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import CommmonButton from '../../styles/CommonButton';

const Header = () => {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem('userId');
    navigate('/login');
  };

  return (
    <HeaderWrapper>
      <CommmonButton onClick={logout}>로그아웃</CommmonButton>
    </HeaderWrapper>
  );
};

export default Header;

const HeaderWrapper = styled.header`
  width: 100%;
  height: 90px;
  padding: 0 30px;
  border: 1px solid #000;
  display: flex;
  justify-content: right;
  align-items: center;
  position: fixed;
  top: 0;
`;
