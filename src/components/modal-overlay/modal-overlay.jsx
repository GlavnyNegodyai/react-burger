import React from 'react';
import './modal-overlay.css';

const ModalOverlay = ({children}) => {
    return(
        <div id='modal-overlay' className='modal-overlay'>
            {children}
        </div>
    );
}

export default ModalOverlay;