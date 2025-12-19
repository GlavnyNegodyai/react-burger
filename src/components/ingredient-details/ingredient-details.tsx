import React, { useEffect, FC } from 'react';
import './ingredient-details.css';
import { useDispatch, useSelector } from '../../services/hooks';
import { TIngredient } from '../../services/types/data';
import { useParams, useNavigate } from 'react-router-dom';
import { ADD_INGREDIENT_DETAILS } from '../../services/actions/ingredient-details';


type IngredientMacroProps = {
    macroName: string;
    macroNumber: number;
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

        ingredients: store.ingredientsReducer.ingredients,

        loading: store.ingredientsReducer.fetchLoading,

        error: store.ingredientsReducer.fetchError
    }));

    const ingredient = useSelector(store => ({

        ...store.ingredientDetailsReducer.ingredient
    }));

    const {name, calories, proteins, fat, carbohydrates, image_large} = ingredient;

    useEffect(() => {
        if (!loading && ingredients.length > 0){
            const ingredientByUrl = ingredients.find((ingredient: TIngredient) => ingredient._id === id);
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
        return <p>Ошибка: {error}</p>
    }
    
    return(
        
        <div className='modal__ingredient-content'>
            <img src={image_large} alt={name} className='modal__ingredient-picture'/>
            <h3 className='text text_type_main-medium pt-4 pb-8'>{name}</h3>
            <div className='modal__ingredient-macros text text_type_main-default text_color_inactive'>
                <IngredientMacro macroName='Калории, ккал' macroNumber={calories ?? 0}/>
                <IngredientMacro macroName='Белки, г' macroNumber={proteins ?? 0}/>
                <IngredientMacro macroName='Жиры, г' macroNumber={fat ?? 0}/>
                <IngredientMacro macroName='Углеводы, г' macroNumber={carbohydrates ?? 0}/>
            </div>
        </div>
        
    )
}

export default IngredientDetails;