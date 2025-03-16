import React, { createContext, useState, useContext, useCallback } from 'react';
import Modal from 'modules/Modal';

const ModalContext = createContext();

export const ModalProvider = ({ children }) => {
  const [modalContent, setModalContent] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  const openModal = useCallback((content) => {
    setModalContent(content);
    setIsOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsOpen(false);
    setTimeout(() => setModalContent(null), 300);
  }, []);

  return (
    <ModalContext.Provider value={{ openModal, closeModal }}>
      {children}
      {isOpen && (
        <Modal onClose={closeModal} title={modalContent?.title}>
          {modalContent?.body}
        </Modal>
      )}
    </ModalContext.Provider>
  );
};

export const useModal = () => {
  return useContext(ModalContext);
};
