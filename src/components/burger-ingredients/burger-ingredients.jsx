import React from 'react';
import {useState} from 'react';
import PropTypes from 'prop-types';
import {Counter, CurrencyIcon, Tab} from '@ya.praktikum/react-developer-burger-ui-components';
import IngredientDetails from '../ingredient-details/ingredient-details.jsx';
import Modal from '../modal/modal.jsx';
import './burger-ingredients.css';


const BurgerIngredientCard = ({ingredient, onIngredientSelect, onBunSelect, handleModal}) => {
    const {name, image, price} = ingredient;
    const [clickCount, setClickCount] = useState(0);
    const [isCardClicked, setCardClicked] = useState(false);

    const onModalClose = () => {
            setCardClicked(false);
            handleModal();
    }

    const onCardClick = () => {
            if (ingredient.type !== 'bun') {
                onIngredientSelect(ingredient);
            }
            else(onBunSelect(ingredient))

            setCardClicked(true);
            handleModal();
        }

    return(
        <>
        <div className='ingredient-card' onClick={onCardClick}>
            {clickCount !== 0 && <Counter count={clickCount} size="default" extraClass="m-1" />}
            <img src={image} alt={name} className='ingredient-picture'/>
            <p className='ingredient-price text text_type_digits-default p-1'>
                <span className='ingredient-price__number'>{price.toLocaleString()}&nbsp;</span>
                <CurrencyIcon type="primary" />
            </p>
            <h3 className='ingredient-name text text_type_main-default'>{name}</h3>

        </div>
            <Modal onClose={onModalClose} headerText='Детали ингредиента' isModalOpened={isCardClicked}>
                <IngredientDetails ingredient={ingredient}/>
            </Modal>
        </>
    );
}

const BurgerIngredientRow = ({ingredients, title, onIngredientSelect, onBunSelect, handleModal}) => {
    return(
    <div className='ingredients-row'>
        <h2 className='ingredients-row__headline text text_type_main-medium'>{title}</h2>
        <ul className='ingredients-row__list'>
            {ingredients.map(ingredient => (
                <li key={String(ingredient._id)}>
                    <BurgerIngredientCard ingredient={ingredient} onIngredientSelect={onIngredientSelect} onBunSelect={onBunSelect} handleModal={handleModal}/>
                </li>
            ))}
        </ul>
    </div>
    );
}

function ingredientsByType(allIngredients, ingredientsType){
    return allIngredients.filter(singleIngredient => singleIngredient.type === ingredientsType);
}

const BurgerIngredients = ({ingredients, onIngredientSelect, onBunSelect, handleModal}) => {
    const bunIngredients = ingredientsByType(ingredients, 'bun');
    const mainIngredients = ingredientsByType(ingredients, 'main');
    const sauceIngredients = ingredientsByType(ingredients, 'sauce');
    const [current, setCurrent] = React.useState('one');
    return(
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
            <div className='burger-ingredients__wrapper'>
                <BurgerIngredientRow ingredients={bunIngredients} title='Булки' onBunSelect={onBunSelect} onIngredientSelect={onIngredientSelect} handleModal={handleModal}></BurgerIngredientRow>
                <BurgerIngredientRow ingredients={sauceIngredients} title='Соусы' onBunSelect={onBunSelect} onIngredientSelect={onIngredientSelect} handleModal={handleModal}></BurgerIngredientRow>
                <BurgerIngredientRow ingredients={mainIngredients} title='Начинки' onBunSelect={onBunSelect} onIngredientSelect={onIngredientSelect} handleModal={handleModal}></BurgerIngredientRow>
            </div>
        </section>
    );
};

BurgerIngredients.propTypes = {
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


export default BurgerIngredients;