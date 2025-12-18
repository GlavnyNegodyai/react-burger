import React, { FC, useEffect } from 'react';
import {useState, useMemo, useRef} from 'react';
import {ConstructorElement, Button, CurrencyIcon, DragIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import OrderDetails from '../order-details/order-details';
import Modal from '../modal/modal';
import './burger-constructor.css';
import { useDrop, useDrag } from 'react-dnd';
import { useDispatch, useSelector } from '../../services/hooks';
import { useNavigate } from 'react-router-dom';
import { TIngredient, TConstructorIngredient } from '../../services/types/data';
import {
    handleCardDrop,
    handleRemoveIngredient,
    handleMoveConstructorElement
} from '../../services/actions/burger-constructor';
import { sendOrder } from '../../services/actions/order-details';
import { getRefreshToken } from '../../utils/auth-cookies';


type DraggableConstructorElementProps = {
    draggableIndex: number;
    ingredient: TConstructorIngredient;
};

type DragItem = {
    draggableIndex: number;
};

type BurgerConstructorProps = {
};

const DraggableConstructorElement: FC<DraggableConstructorElementProps> = ({draggableIndex, ingredient}) => {
    const dispatch = useDispatch();
    const constructorElementRef = useRef<HTMLLIElement>(null);

        const [, constructorDragRef] = useDrag<DragItem>({
        type: 'constructorElement',
        item: { draggableIndex },
    });

        const [, constructorDropRef] = useDrop<DragItem>({
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
    <li ref={constructorElementRef}  className='burger-constructor__draggable-element' data-testid="constructor-ingredient">
        <DragIcon type="primary" />
        <ConstructorElement
            text={ingredient.name}
            price={ingredient.price}
            thumbnail={ingredient.image ?? ''}
            handleClose={() => dispatch(handleRemoveIngredient(draggableIndex))}
            extraClass='ml-2 mr-2'
        />
    </li>
    )
}

const BurgerConstructor: FC = () => {
    const [isButtonClicked, setButtonClicked] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const onModalClose = () => {
        setButtonClicked(false);
    }

    
    const dropTargetRef = useRef<HTMLElement>(null);
    const [, dropRef] = useDrop<TIngredient>({
        accept: 'ingredient',
        drop(item: TIngredient) {

            dispatch(handleCardDrop(item));
        },
    });
    dropRef(dropTargetRef);
    
    const {selectedIngredients, selectedBun} = useSelector((store) => ({
        selectedIngredients: store.constructorReducer.constructorItems,
        selectedBun: store.constructorReducer.constructorBun
    }) );

    const onButtonClick = async () => {
        if(!getRefreshToken() || getRefreshToken() === ''){
            navigate('/login');
        }
        else{
            if(selectedIngredients.some((ing: TIngredient) => ing) || selectedBun){
    
                await dispatch(sendOrder());
                setButtonClicked(true);
            }
        }
    }

    const countPrice = useMemo(() => {
    const ingredientsPrice = selectedIngredients.reduce(
        (sum: number, ingredient: TIngredient) => sum + ingredient.price,
        0
    );
    return ingredientsPrice + (selectedBun ? selectedBun.price * 2 : 0);
    }, [selectedIngredients, selectedBun]);

    return(
        <section className='burger-constructor' ref={dropTargetRef} data-testid='constructor'>
            {selectedBun && <div className='burger-constructor__undraggable-element' data-testid="constructor-ingredient">
                <ConstructorElement
                    type="top"
                    isLocked={true}
                    text={`${selectedBun.name} (верх)`}
                    price={selectedBun.price}
                    thumbnail={selectedBun.image ?? ''}
                    extraClass='ml-8 mr-4'
                    
                />
            </div>}
            <ul className='burger-constructor__draggables-list'>
                {(selectedIngredients || []).map((ingredient: TConstructorIngredient, index: number) => (
                    <DraggableConstructorElement key={ingredient.uid} ingredient={ingredient} draggableIndex={index}/>
                ))}
            </ul>
            {selectedBun && <div className='burger-constructor__undraggable-element'>
                <ConstructorElement
                    type="bottom"
                    isLocked={true}
                    text={`${selectedBun.name} (низ)`}
                    price={selectedBun.price}
                    thumbnail={selectedBun.image ?? ''}
                    extraClass='ml-8'
                />
            </div>}
            <div className='burger-constructor__bottom'>
                <p className='text text_type_digits-medium p-1'>
                    <span className='ingredient-price__number'>{countPrice}&nbsp;</span>
                    <CurrencyIcon type="primary" />
                </p>
                <Button htmlType="button" type="primary" size="medium" onClick={onButtonClick} data-testid="send-order">
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