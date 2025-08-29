import React from 'react';
import {useState} from 'react';
import {ConstructorElement, Button, CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import OrderDetails from '../order-details/order-details.jsx';
import Modal from '../modal/modal.jsx';
import './burger-constructor.css';
import { useDrop } from 'react-dnd';
import { useDispatch, useSelector } from 'react-redux';
import {
    handleCardDrop,
    CONSTRUCTOR_CLEAR,
    CONSTRUCTOR_REMOVE_INGREDIENT
} from '../../services/actions/burger-constructor.js';

const BurgerConstructor = ({ handleModal}) => {
    const [isButtonClicked, setButtonClicked] = useState(false);

    const onButtonClick = () => {
        setButtonClicked(true);
        handleModal();
    }
    
    const onModalClose = () => {
        setButtonClicked(false);
        handleModal();
    }

    const dispatch = useDispatch();

    const [, dropRef] = useDrop({
        accept: 'ingredient',
        drop(item) {
            dispatch(handleCardDrop(item));
        },
    });

    const {selectedIngredients, selectedBun} = useSelector(store => ({
        selectedIngredients: store.constructorReducer.constructorItems,
        selectedBun: store.constructorReducer.constructorBun
    }) )

    return(
        <section className='burger-constructor' ref={dropRef}>
            <div className='burger-constructor__undraggable-element'>
                {selectedBun && <ConstructorElement
                    type="top"
                    isLocked={true}
                    text={selectedBun.name}
                    price={selectedBun.price}
                    thumbnail={selectedBun.image}
                />}
            </div>
            <ul className='burger-constructor__draggables-list'>
                {(selectedIngredients || []).map((ingredient, index) => (
                <li key={index}  className='burger-constructor__draggable-element'>
                    <ConstructorElement
                        text={ingredient.name}
                        price={ingredient.price}
                        thumbnail={ingredient.image}
                    />
                </li>
                ))}
            </ul>
            {selectedBun && <div className='burger-constructor__undraggable-element'>
                <ConstructorElement
                    type="bottom"
                    isLocked={true}
                    text={selectedBun.name}
                    price={selectedBun.price}
                    thumbnail={selectedBun.image}
                /> 
            </div>}
            <div className='burger-constructor__bottom'>
                <p className='text text_type_digits-medium p-1'>
                    <span className='ingredient-price__number'>1000&nbsp;</span>
                    <CurrencyIcon type="primary" />
                </p>
                <Button htmlType="button" type="primary" size="medium" onClick={onButtonClick}>
                    Оформить заказ
                </Button>
            </div>
                <Modal onClose={onModalClose} headerText='' isModalOpened={isButtonClicked}>
                    <OrderDetails/>
                </Modal>
        </section>
    );
};

export default BurgerConstructor;