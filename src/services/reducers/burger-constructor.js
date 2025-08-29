import {
    CONSTRUCTOR_ADD_BUN,
    CONSTRUCTOR_REMOVE_BUN,
    CONSTRUCTOR_ADD_INGREDIENT,
    CONSTRUCTOR_REMOVE_INGREDIENT,
    CONSTRUCTOR_MOVE,
    CONSTRUCTOR_CLEAR
    } from '../actions/burger-constructor.js';

const initialState = {
    constructorItems: [],
    constructorBun: null
};

export function constructorReducer(state = initialState, action){
    switch(action.type){
        case CONSTRUCTOR_ADD_BUN: {
            return{
                ...state,
                constructorBun: action.payload
            }
        }
        case CONSTRUCTOR_REMOVE_BUN: {
            return {
                ...state,
                constructorItems: null
            }
        }
        case CONSTRUCTOR_ADD_INGREDIENT: {
            return{
                ...state,
                constructorItems: [...state.constructorItems, action.payload]
            }
        }
        case CONSTRUCTOR_REMOVE_INGREDIENT: {
            return{
                ...state,
                constructorItems: action.payload
            }
        }
        case CONSTRUCTOR_CLEAR: {
            return{
                ...state,
                constructorItems: [],
                constructorBun: null
            }
        }
        default:
            return state;
    }
}