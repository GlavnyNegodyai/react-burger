import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useDrag } from "react-dnd";
import PropTypes from 'prop-types';
import {Counter, CurrencyIcon, Tab} from '@ya.praktikum/react-developer-burger-ui-components';
import IngredientDetails from '../ingredient-details/ingredient-details.jsx';
import Modal from '../modal/modal.jsx';
import { fetchIngredients } from '../../services/actions/burger-ingredients.js';
import { REMOVE_INGREDIENT_DETAILS, ADD_INGREDIENT_DETAILS } from '../../services/actions/ingredient-details.js';
import './burger-ingredients.css';


const BurgerIngredientCard = ({ingredient, handleModal}) => {
    const {name, image, price, type, _id} = ingredient;
    const [isCardClicked, setCardClicked] = useState(false);
    const dispatch = useDispatch();

    const constructorItems = useSelector(
        store => store.constructorReducer.constructorItems
    );

    const constructorBun = useSelector(
        store => store.constructorReducer.constructorBun
    );

    const handleIngredientCount = () => {
        const arrayToCount = type === 'bun' ? (constructorBun ? [constructorBun]: []) : (constructorItems || []);
        return arrayToCount.filter(item => item._id === _id).length;
    }

    const onModalClose = () => {
            setCardClicked(false);
            dispatch({type: REMOVE_INGREDIENT_DETAILS});
            handleModal();
    }

    const onCardClick = () => {

            setCardClicked(true);
            dispatch({type:ADD_INGREDIENT_DETAILS, payload: ingredient});
            handleModal();
    }


    const [, dragRef] = useDrag({
        type: 'ingredient',
        item: { id: _id },
     });

    return(
        <>
        <div className='ingredient-card' onClick={onCardClick} ref={dragRef}>
            {handleIngredientCount() !== 0 && <Counter count={handleIngredientCount()} size="default" extraClass="m-1" />}
            <img src={image} alt={name} className='ingredient-picture'/>
            <p className='ingredient-price text text_type_digits-default p-1'>
                <span className='ingredient-price__number'>{price.toLocaleString()}&nbsp;</span>
                <CurrencyIcon type="primary" />
            </p>
            <h3 className='ingredient-name text text_type_main-default'>{name}</h3>

        </div>
            <Modal onClose={onModalClose} headerText='Детали ингредиента' isModalOpened={isCardClicked}>
                <IngredientDetails/>
            </Modal>
        </>
    );
}

const BurgerIngredientRow = ({ingredients, title, handleModal, rowRef}) => {
    return(
    <div className='ingredients-row' ref={rowRef}>
        <h2 className='ingredients-row__headline text text_type_main-medium'>{title}</h2>
        <ul className='ingredients-row__list'>
            {ingredients.map(ingredient => (
                <li key={String(ingredient._id)}>
                    <BurgerIngredientCard ingredient={ingredient} handleModal={handleModal}/>
                </li>
            ))}
        </ul>
    </div>
    );
}

BurgerIngredientRow.propTypes = {
  ingredients: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
      proteins: PropTypes.number,
      fat: PropTypes.number,
      carbohydrates: PropTypes.number,
      calories: PropTypes.number,
      price: PropTypes.number.isRequired,
      image: PropTypes.string,
      image_mobile: PropTypes.string,
      image_large: PropTypes.string,
      __v: PropTypes.number,
    })
  ).isRequired,
};

function ingredientsByType(allIngredients, ingredientsType){
    return allIngredients.filter(singleIngredient => singleIngredient.type === ingredientsType);
}

const BurgerIngredients = ({handleModal}) => {
    const {ingredients, loading, error} = useSelector(store => ({
        ingredients: store.ingredientsReducer.ingredients,
        loading: store.ingredientsReducer.fetchLoading,
        error: store.ingredientsReducer.fetchError
    }));

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchIngredients());
    }, [dispatch]);

    const ingredientsRef = useRef();
    const bunRef = useRef();
    const SauceRef = useRef();
    const mainRef = useRef();

    const bunIngredients = ingredientsByType(ingredients, 'bun');
    const mainIngredients = ingredientsByType(ingredients, 'main');
    const sauceIngredients = ingredientsByType(ingredients, 'sauce');
    const [current, setCurrent] = React.useState('Булки');

    const handleScroll = () => {
        const containerTop = ingredientsRef.current.getBoundingClientRect().top;
        
        const positions = [
            {type: 'Булки', position: Math.abs(bunRef.current.getBoundingClientRect().top - containerTop)},
            {type: 'Соусы', position: Math.abs(SauceRef.current.getBoundingClientRect().top - containerTop)},
            {type: 'Начинки', position: Math.abs(mainRef.current.getBoundingClientRect().top - containerTop)}
        ]

        const closest = positions.reduce((prev, current) => prev.position < current.position ? prev : current);

        setCurrent(closest.type);
    };



    return(
        <>
            {loading && <p>Загрузка...</p>}
            {error && <p>Ошибка: {ingredients.error}</p>}
            <section className='burger-ingredients'>  
                <h1 className='burger-ingredients__headline text text_type_main-large'>Соберите бургер</h1>
                <nav className='burger-tabs'>
                    <Tab value="Булки" active={current === 'Булки'} onClick={setCurrent}>
                        Булки
                    </Tab>
                    <Tab value="Соусы" active={current === 'Соусы'} onClick={setCurrent}>
                        Соусы
                    </Tab>
                    <Tab value="Начинки" active={current === 'Начинки'} onClick={setCurrent}>
                        Начинки
                    </Tab>               
                </nav>
                <div className='burger-ingredients__wrapper' onScroll={handleScroll}  ref={ingredientsRef}>
                    <BurgerIngredientRow ingredients={bunIngredients} title='Булки' rowRef={bunRef} handleModal={handleModal}></BurgerIngredientRow>
                    <BurgerIngredientRow ingredients={sauceIngredients} title='Соусы' rowRef={SauceRef} handleModal={handleModal}></BurgerIngredientRow>
                    <BurgerIngredientRow ingredients={mainIngredients} title='Начинки' rowRef={mainRef} handleModal={handleModal}></BurgerIngredientRow>
                </div>
            </section>
        </>

    );
};


export default BurgerIngredients;