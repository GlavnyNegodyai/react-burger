import React from 'react';
import {useState, useMemo, useRef} from 'react';
import {ConstructorElement, Button, CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import OrderDetails from '../order-details/order-details.jsx';
import Modal from '../modal/modal.jsx';
import './burger-constructor.css';
import { useDrop, useDrag } from 'react-dnd';
import { useDispatch, useSelector } from 'react-redux';
import {
    handleCardDrop,
    handleRemoveIngredient,
    handleMoveConstructorElement
} from '../../services/actions/burger-constructor.js';
import { sendOrder } from '../../services/actions/order-details.js';


const DraggableConstructorElement = ({draggableIndex, ingredient}) => {
    const dispatch = useDispatch();
    const constructorElementRef = useRef(null);

        const [, constructorDragRef] = useDrag({
        type: 'constructorElement',
        item: { draggableIndex },
    });

        const [, constructorDropRef] = useDrop({
        accept: 'constructorElement',
        drop: (dragItem) => {
            if (!constructorElementRef.current) return;

            const dragIndex = dragItem.draggableIndex;
            const dropIndex = draggableIndex;
            if (dragIndex === dropIndex) return;

            dispatch(handleMoveConstructorElement(dragIndex, dropIndex));
        }
    });

    constructorDragRef(constructorDropRef(constructorElementRef));


    return(
    <li ref={constructorElementRef}  className='burger-constructor__draggable-element'>
        <ConstructorElement
            text={ingredient.name}
            price={ingredient.price}
            thumbnail={ingredient.image}
            handleClose={() => dispatch(handleRemoveIngredient(draggableIndex))}
        />
    </li>
    )
}

const BurgerConstructor = ({ handleModal }) => {
    const [isButtonClicked, setButtonClicked] = useState(false);
    const dispatch = useDispatch();


    const onButtonClick = async () => {
        await dispatch(sendOrder());
        setButtonClicked(true);
        handleModal();
        
    }
    
    const onModalClose = () => {
        setButtonClicked(false);
        handleModal();
    }

    

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

    const countPrice = useMemo(() => {
    const ingredientsPrice = selectedIngredients.reduce(
        (sum, ingredient) => sum + ingredient.price,
        0
    );
    return ingredientsPrice + (selectedBun ? selectedBun.price * 2 : 0);
    }, [selectedIngredients, selectedBun]);


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
                    <DraggableConstructorElement key={index} ingredient={ingredient} draggableIndex={index}></DraggableConstructorElement>
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
                    <span className='ingredient-price__number'>{countPrice}&nbsp;</span>
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