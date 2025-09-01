import React from 'react';
import './order-details.css';
import doneImage from '../../images/done.png';
import { useSelector } from 'react-redux';

const OrderDetails = () => {
    const orderDetails = useSelector(store => (
        store.orderReducer.orderDetails.order.number
    ));
    return(
        <div className='modal-order__bottom'>
            <h2 className='text text_type_digits-large modal-order__number mb-8'>
                {orderDetails}
            </h2>
            <h3 className='text text_type_main-medium'>
                идентификатор заказа
            </h3>
            <img src={doneImage} alt='done' className="modal-order__image mt-15 mb-15"/>
            <p className='text text_type_main-default mb-1'>Ваш заказ начали готовить</p>
            <p className='text text_type_main-default text_color_inactive mb-15'>Дождитесь готовности на орбитальной станции</p>
        </div>
    )
}

export default OrderDetails;