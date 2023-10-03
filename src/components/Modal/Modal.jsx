import React, { useEffect } from 'react';
import { ModalContainer, Overlay } from './Modal.styled';

export const Modal = ({ largeImageURL, onClose }) => {
  useEffect(() => {
    const handleKeyDown = event => {
      if (event.code === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  const handleCloseModal = event => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  return (
    <Overlay onClick={handleCloseModal}>
      <ModalContainer>
        <img src={largeImageURL} alt="" />
      </ModalContainer>
    </Overlay>
  );
};
