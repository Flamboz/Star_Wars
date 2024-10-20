import { useCallback, useEffect } from "react";
import "@xyflow/react/dist/style.css";
import "./Modal.css";

interface ModalProps {
  isModalOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isModalOpen, onClose, children }) => {
  const closeModal = useCallback(() => onClose(), [onClose]);

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeModal();
      }
    },
    [closeModal]
  );

  const handleClickOutside = useCallback(
    (event: MouseEvent) => {
      const modalContent = document.querySelector(".modal__content");
      if (modalContent && !modalContent.contains(event.target as Node)) {
        closeModal();
      }
    },
    [closeModal]
  );

  useEffect(() => {
    if (isModalOpen) {
      document.addEventListener("keydown", handleKeyDown);
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isModalOpen, handleKeyDown, handleClickOutside]);

  return (
    <>
      {isModalOpen && (
        <div className="modal">
          <div className="modal__content">
            <button className="modal__close" onClick={closeModal}>
              &times;
            </button>
            {children}
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
