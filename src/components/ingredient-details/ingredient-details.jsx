import React from 'react';
import './ingredient-details.css';
import { useDispatch, useSelector } from 'react-redux';


const IngredientMacro = ({macroName, macroNumber}) => {
    return(
        <div className='modal__ingredient-macro'>
            <h4 className='modal__ingredient-macro-name pb-2'>{macroName}</h4>
            <span className='modal__ingredient-macro-number text text_type_digits-default'>{macroNumber}</span>
        </div>
    )
}

const IngredientDetails = () => {
    const {name, calories, proteins, fat, carbohydrates, image_large} = useSelector(store => ({
        ...store.ingredientDetailsReducer.ingredient
    }));
    
    
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