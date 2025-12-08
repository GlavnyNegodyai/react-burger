import React, { useEffect, FC } from 'react';
import './ingredient-details.css';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { ADD_INGREDIENT_DETAILS } from '../../services/actions/ingredient-details';
import { fetchIngredients } from '../../services/actions/burger-ingredients';


type IngredientMacroProps = {
    macroName: string;
    macroNumber: number;
};

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

const IngredientMacro: FC<IngredientMacroProps> = ({macroName, macroNumber}) => {
    return(
        <div className='modal__ingredient-macro'>
            <h4 className='modal__ingredient-macro-name pb-2'>{macroName}</h4>
            <span className='modal__ingredient-macro-number text text_type_digits-default'>{macroNumber}</span>
        </div>
    )
}

const IngredientDetails = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {ingredients, loading, error} = useSelector(store => ({
        // @ts-ignore
        ingredients: store.ingredientsReducer.ingredients,
        // @ts-ignore
        loading: store.ingredientsReducer.fetchLoading,
        // @ts-ignore
        error: store.ingredientsReducer.fetchError
    }));

    const ingredient = useSelector(store => ({
        // @ts-ignore
        ...store.ingredientDetailsReducer.ingredient
    }));

    const {name, calories, proteins, fat, carbohydrates, image_large} = ingredient;

    useEffect(() => {
        // @ts-ignore
        dispatch(fetchIngredients());
    }, [dispatch]);

    useEffect(() => {
        if (!loading && ingredients.length > 0){
            const ingredientByUrl = ingredients.find((ingredient: Ingredient) => ingredient._id === id);
            if (ingredientByUrl){
                dispatch({type: ADD_INGREDIENT_DETAILS, payload: ingredientByUrl});
            }
            /*else(
                navigate('/page-not-found')
            );*/
        }

    }, [dispatch, id, ingredients, loading, navigate]);

    if (loading){
        return <p>Загрузка</p>
    }
    if (error){
        return <p>Ошибка: {ingredients.error}</p>
    }
    
    return(
        
        <div className='modal__ingredient-content'>
            <img src={image_large} alt={name} className='modal__ingredient-picture'/>
            <h3 className='text text_type_main-medium pt-4 pb-8'>{name}</h3>
            <div className='modal__ingredient-macros text text_type_main-default text_color_inactive'>
                <IngredientMacro macroName='Калории, ккал' macroNumber={calories}/>
                <IngredientMacro macroName='Белки, г' macroNumber={proteins}/>
                <IngredientMacro macroName='Жиры, г' macroNumber={fat}/>
                <IngredientMacro macroName='Углеводы, г' macroNumber={carbohydrates}/>
            </div>
        </div>
        
    )
}

export default IngredientDetails;