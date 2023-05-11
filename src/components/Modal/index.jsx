import React, { useEffect } from 'react';
import { ModalContainer, ModalBackground, ModalContent } from './style';

function Modal({ modalOption }) {
  // 모달창 열었을 때 뒷 배경 스크롤 방지
  useEffect(() => {
    if (modalOption.isModalShow) {
      document.body.style.cssText = `
      position: fixed; 
      top: -${window.scrollY}px;
      overflow-y: scroll;
      width: 100%;`;
    } else {
      const scrollY = document.body.style.top;
      document.body.style.cssText = '';
      window.scrollTo(0, parseInt(scrollY || '0', 10) * -1);
    }
  }, [modalOption]);

  return (
    <>
      {modalOption?.isModalShow && (
        <ModalContainer>
          <ModalBackground onClick={() => modalOption.onClose()} />
          <ModalContent>{modalOption.innerElement}</ModalContent>
        </ModalContainer>
      )}
    </>
  );
}

export default Modal;
