import React from 'react';
import Modal from '../modal/modal.jsx';
import './order-details.css';
import doneImage from '../../images/done.png';

const OrderDetails = ({onModalClose}) => {
    return(
        <Modal onClose={onModalClose} headerText=''>
            <div className='modal-order__bottom'>
                <h2 className='text text_type_digits-large modal-order__number mb-8'>
                    034536
                </h2>
                <h3 className='text text_type_main-medium'>
                    идентификатор заказа
                </h3>
                <img src={doneImage} alt='done' className="modal-order__image mt-15 mb-15"/>
                <p className='text text_type_main-default mb-1'>Ваш заказ начали готовить</p>
                <p className='text text_type_main-default text_color_inactive mb-15'>Дождитесь готовности на орбитальной станции</p>
            </div>
        </Modal>
    )
}

export default OrderDetails;