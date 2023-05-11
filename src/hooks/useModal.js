import React, { useState, useCallback } from "react";

const MODAL_OPTION = {
  isModalShow: false,
  onOpen: () => {},
  onClose: () => {},
  innerElement: null,
};

function useModal() {
  const [modalOption, setModalOption] = useState(MODAL_OPTION);

  const showModal = useCallback(
    (isModalShow, onOpenCallback, onCloseCallback, innerElement) => {
      setModalOption((prev) => ({
        ...prev,
        isModalShow,
        onOpen: () => {
          if (onOpenCallback) onOpenCallback();
          setModalOption((prev) => ({ ...prev, isModalShow: !isModalShow }));
        },
        onClose: () => {
          if (onCloseCallback) onCloseCallback();
          setModalOption((prev) => ({ ...prev, isModalShow: !isModalShow }));

        },
        innerElement,
      }));
    },
    [modalOption]
  );

  return [modalOption, showModal];
}

export default useModal;