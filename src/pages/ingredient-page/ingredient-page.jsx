import React from 'react';
import IngredientDetails from '../../components/ingredient-details/ingredient-details.jsx';
import AppHeader from '../../components/app-header/app-header.jsx';

const IngredientPage = () => {

    return (
        <>
            <AppHeader/>
            <main>
                <IngredientDetails/>
            </main>
            
        </>
    );
}

export default IngredientPage;