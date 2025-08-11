import React from 'react';
import './modal-overlay.css';

const ModalOverlay = ({children, isModalOpened}) => {
    return(
        <div id='modal-overlay' className='modal-overlay' style={!isModalOpened ? {display: 'none'} : {}}>
            {children}
        </div>
    );
}

export default ModalOverlay;