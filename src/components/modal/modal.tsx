import React, {FunctionComponent, ReactNode} from 'react';
import {useEffect} from 'react';
import ReactDOM from 'react-dom';
import './modal.css';
import {CloseIcon} from '@ya.praktikum/react-developer-burger-ui-components';

interface ModalProps {
  onClose: () => void;
  headerText: string;
  children: ReactNode;
  isModalOpened: boolean;
};

const Modal: FunctionComponent<ModalProps> = ({onClose, headerText, children, isModalOpened}) => {
  const handleCloseClick = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
    if (event.target === event.currentTarget || (event.target as Element).closest('.modal-close')) {
      onClose();
    }
    
  };

  useEffect (() => {
    const closeOnEsc = (event: KeyboardEvent) => {
        if (event.key === 'Escape'){
            onClose();
        }
    };
  if (isModalOpened){
      document.addEventListener('keydown', closeOnEsc);
  }
  return () => {
      document.removeEventListener('keydown', closeOnEsc);
  };
  }, [isModalOpened, onClose]);

  if (!isModalOpened) return null;

  const modalRoot = document.getElementById('modal-overlay');
  if (!modalRoot) return null;

  return ReactDOM.createPortal(
    <div className='modal-wrapper' onClick={handleCloseClick}>
      <div className='modal p-10 pb-15'>
        <div className='modal-content'>
          <div className='modal-top'>
              <h2 className='text text_type_main-large'>{headerText}</h2>
              <div className='modal-close' onClick={handleCloseClick}>
                  <CloseIcon type='primary' />
              </div>
          </div>
              {children}
        </div>
      </div>
    </div>
,
    modalRoot
  );
};

export default Modal;
