import React, {FC} from 'react';
import "./ingredient-gradient.css";

type IngredientGradientProps = {
    imageUrl: string;
};

export const IngredientGradient: FC<IngredientGradientProps> = ({imageUrl}) => {
    return(
        <div className="ingredient-gradient">
            <img className="ingredient-picture--small"  width="64" height="64" src={imageUrl}/>
        </div>
    );
}