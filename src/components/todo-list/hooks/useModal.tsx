import { ReactNode, useState } from 'react';
import styled from 'styled-components';

type ModalPropsType = {
  children: ReactNode;
};

const useModal = (): [({ children }: ModalPropsType) => JSX.Element, () => void, () => void] => {
  const [isOpen, setIsOpen] = useState(false);
  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const closeModalByClickingOutsideScreen = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  const Modal = ({ children }: ModalPropsType) => {
    return (
      <ModalWrapper onClick={closeModalByClickingOutsideScreen} isOpen={isOpen}>
        {children}
      </ModalWrapper>
    );
  };

  return [Modal, openModal, closeModal];
};

export default useModal;

const ModalWrapper = styled.div<{ isOpen: boolean }>`
  background-color: rgba(0, 0, 0, 0.5);
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: ${({ isOpen }) => (isOpen ? 'flex' : 'none')};
  justify-content: center;
  align-items: center;
`;
