import React from 'react';
import './modal-window.css';
import IngredientDetails from '../ingredient-details/ingredient-details.jsx';
import Modal from '../modal/modal.jsx';
import { useNavigate } from 'react-router-dom';

export const ModalWindow = () => {
    const navigate = useNavigate();
    const onModalClose = () => {
            navigate(-1);
    }

    return(
        <Modal onClose={onModalClose} headerText='Детали ингредиента' isModalOpened={true}>
            <IngredientDetails/>
        </Modal>
    );
}