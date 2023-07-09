import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import css from './Modal.module.css';

const modalRoot = document.getElementById('modal-root');

function Modal({ onClose, src, alt }) {
  useEffect(() => {
    function handleKeyDown(e) {
      if (e.code === 'Escape') {
        onClose();
      }
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  function onBackdrop(e) {
    if (e.currentTarget === e.target) {
      onClose();
    }
  }

  return createPortal(
    <div className={css.overlay} onClick={onBackdrop}>
      <div className={css.modal}>
        <img src={src} alt={alt} />
      </div>
    </div>,
    modalRoot
  );
}

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default Modal;
