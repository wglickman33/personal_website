import { useRef } from 'react';
import { createPortal } from 'react-dom';
import useTheme from '../../../hooks/useTheme';
import useModalA11y from '../../../hooks/useModalA11y';
import './ConfirmModal.scss';

interface ConfirmModalProps {
  isOpen: boolean;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmModal = ({
  isOpen,
  title,
  message,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  onConfirm,
  onCancel
}: ConfirmModalProps) => {
  const { theme } = useTheme();
  const dialogRef = useRef<HTMLDivElement>(null);
  const cancelBtnRef = useRef<HTMLButtonElement>(null);

  useModalA11y({
    isOpen,
    onClose: onCancel,
    containerRef: dialogRef,
    initialFocusRef: cancelBtnRef,
  });

  if (!isOpen) return null;

  return createPortal(
    <div
      ref={dialogRef}
      className={`confirm-modal confirm-modal--${theme}`}
      role="dialog"
      aria-modal="true"
      aria-labelledby="confirm-modal-title"
      aria-describedby="confirm-modal-message"
    >
      <div className="confirm-modal__overlay" onClick={onCancel} />
      <div className="confirm-modal__content">
        <h3 id="confirm-modal-title" className="confirm-modal__title">{title}</h3>
        <p id="confirm-modal-message" className="confirm-modal__message">{message}</p>
        <div className="confirm-modal__actions">
          <button
            ref={cancelBtnRef}
            className="confirm-modal__button confirm-modal__button--cancel"
            onClick={onCancel}
            type="button"
          >
            {cancelText}
          </button>
          <button
            className="confirm-modal__button confirm-modal__button--confirm"
            onClick={onConfirm}
            type="button"
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default ConfirmModal;
