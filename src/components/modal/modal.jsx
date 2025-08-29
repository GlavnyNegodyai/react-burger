import React from 'react';
import {useEffect} from 'react';
import ReactDOM from 'react-dom';
import './modal.css';
import {CloseIcon} from  '@ya.praktikum/react-developer-burger-ui-components';

const Modal = ({onClose, headerText, children, isModalOpened}) => {

  const handleCloseClick = (event) => {
    if (event.target === event.currentTarget || event.target.closest('.modal-close')) {
      onClose();
    }
    
  };

  useEffect (() => {
    const closeOnEsc = (event) => {
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
    document.getElementById('modal-overlay')
  );
};

export default Modal;
