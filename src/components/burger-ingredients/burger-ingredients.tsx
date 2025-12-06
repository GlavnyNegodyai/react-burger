import React, { useEffect, useRef, FC } from 'react';
import { useDispatch, useSelector } from '../../services/hooks';
import { useDrag } from "react-dnd";
import { useNavigate, useLocation } from 'react-router-dom';
import {Counter, CurrencyIcon, Tab} from '@ya.praktikum/react-developer-burger-ui-components';
import { fetchIngredients } from '../../services/actions/burger-ingredients';
import './burger-ingredients.css';

type Ingredient = {
    _id: string;
    name: string;
    type: string;
    proteins?: number;
    fat?: number;
    carbohydrates?: number;
    calories?: number;
    price: number;
    image?: string;
    image_mobile?: string;
    image_large?: string;
    __v?: number;
};

type BurgerIngredientCardProps = {
    ingredient: Ingredient;
};

type DragItem = {
    id: string;
};

const BurgerIngredientCard: FC<BurgerIngredientCardProps> = ({ingredient}) => {
    const location = useLocation();
    const {name, image, price, type, _id} = ingredient;
    const navigate = useNavigate();

    const constructorItems = useSelector(

        store => store.constructorReducer.constructorItems
    );

    const constructorBun = useSelector(

        store => store.constructorReducer.constructorBun
    );

    const handleIngredientCount = () => {
        const arrayToCount = type === 'bun' ? (constructorBun ? [constructorBun]: []) : (constructorItems || []);
        return arrayToCount.filter((item: Ingredient) => item._id === _id).length;
    }

    const onCardClick = () => {
            navigate(`/ingredients/${_id}`, {
                state: {background: location}
            });
    }

    const ingredientRef = useRef<HTMLDivElement>(null);
    const [, dragRef] = useDrag<DragItem>({
        type: 'ingredient',
        item: { id: _id },
     });

    dragRef(ingredientRef);
    
    return(
        <div className='ingredient-card' onClick={onCardClick} ref={ingredientRef}>
            {handleIngredientCount() !== 0 && <Counter count={handleIngredientCount()} size="default" extraClass="m-1" />}
            <img src={image} alt={name} className='ingredient-picture'/>
            <p className='ingredient-price text text_type_digits-default p-1'>
                <span className='ingredient-price__number'>{price.toLocaleString()}&nbsp;</span>
                <CurrencyIcon type="primary" />
            </p>
            <h3 className='ingredient-name text text_type_main-default'>{name}</h3>

        </div>
    );
}

type BurgerIngredientRowProps = {
    ingredients: Ingredient[];
    title: string;
    rowRef: React.RefObject<HTMLDivElement | null>;
};

const BurgerIngredientRow: FC<BurgerIngredientRowProps> = ({ingredients, title, rowRef}) => {
    return(
    <div className='ingredients-row' ref={rowRef}>
        <h2 className='ingredients-row__headline text text_type_main-medium'>{title}</h2>
        <ul className='ingredients-row__list'>
            {ingredients.map((ingredient: Ingredient) => (
                <li key={String(ingredient._id)}>
                    <BurgerIngredientCard ingredient={ingredient}/>
                </li>
            ))}
        </ul>
    </div>
    );
}


function ingredientsByType(allIngredients: Ingredient[], ingredientsType: string){
    return allIngredients.filter(singleIngredient => singleIngredient.type === ingredientsType);
}

const BurgerIngredients = () => {
    const {ingredients, loading, error} = useSelector(store => ({

        ingredients: store.ingredientsReducer.ingredients,

        loading: store.ingredientsReducer.fetchLoading,

        error: store.ingredientsReducer.fetchError
    }));

    const dispatch = useDispatch();
    useEffect(() => {

        dispatch(fetchIngredients());
    }, [dispatch]);

    const ingredientsRef = useRef<HTMLDivElement>(null);
    const bunRef = useRef<HTMLDivElement>(null);
    const SauceRef = useRef<HTMLDivElement>(null);
    const mainRef = useRef<HTMLDivElement>(null);

    const bunIngredients = ingredientsByType(ingredients, 'bun');
    const mainIngredients = ingredientsByType(ingredients, 'main');
    const sauceIngredients = ingredientsByType(ingredients, 'sauce');
    const [current, setCurrent] = React.useState('Булки');

    const handleScroll = () => {
        if (!ingredientsRef.current || !bunRef.current || !SauceRef.current || !mainRef.current) return;
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
            {error && <p>Ошибка: {error}</p>}
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
                    <BurgerIngredientRow ingredients={bunIngredients} title='Булки' rowRef={bunRef}></BurgerIngredientRow>
                    <BurgerIngredientRow ingredients={sauceIngredients} title='Соусы' rowRef={SauceRef}></BurgerIngredientRow>
                    <BurgerIngredientRow ingredients={mainIngredients} title='Начинки' rowRef={mainRef}></BurgerIngredientRow>
                </div>
            </section>
        </>

    );
};


export default BurgerIngredients;