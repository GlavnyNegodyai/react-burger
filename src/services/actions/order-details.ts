import { BASE_URL } from '../../utils/base-url';
import { checkResponse } from '../../utils/check-response';
import {
  getAccessToken,
  updateTokens
} from "../../utils/auth-cookies";
import { AppThunk } from "../types";
import { AppDispatch } from "../types"; 
import { TIngredient } from '../types/data';

export const CONSTRUCTOR_SEND_ORDER_REQUEST: 'CONSTRUCTOR_SEND_ORDER_REQUEST' = 'CONSTRUCTOR_SEND_ORDER_REQUEST';
export const CONSTRUCTOR_SEND_ORDER_FAIL: 'CONSTRUCTOR_SEND_ORDER_FAIL' = 'CONSTRUCTOR_SEND_ORDER_FAIL';
export const CONSTRUCTOR_SEND_ORDER_SUCCESS: 'CONSTRUCTOR_SEND_ORDER_SUCCESS' = 'CONSTRUCTOR_SEND_ORDER_SUCCESS';

export type TconstructorSendOrderRequestAction = {
    readonly type: typeof CONSTRUCTOR_SEND_ORDER_REQUEST; 
};

export type TconstructorSendOrderFailAction = {
    readonly type: typeof CONSTRUCTOR_SEND_ORDER_FAIL; 
    readonly payload: string;
};

export type TconstructorSendOrderSuccessAction = {
    readonly type: typeof CONSTRUCTOR_SEND_ORDER_SUCCESS; 
    readonly payload: number; 
};

export type TconstructorSendOrderActions = 
    TconstructorSendOrderRequestAction | 
    TconstructorSendOrderFailAction |
    TconstructorSendOrderSuccessAction;


export const sendOrder: AppThunk = () => async (dispatch: AppDispatch, getState) => {
    const { constructorItems, constructorBun } = getState().constructorReducer;
    const ingredientIds = [(constructorBun && constructorBun._id), ...constructorItems.map(item => item._id)];
    if(ingredientIds.some(id => id)){
        try{
            dispatch({type: CONSTRUCTOR_SEND_ORDER_REQUEST});
            const res = await fetch(`${BASE_URL}/orders`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    authorization: `Bearer ${getAccessToken()}`,
                },
                body: JSON.stringify({ ingredients: ingredientIds })
            });

        if (!res.ok) {
        try {
            const newToken = await updateTokens();
            const retryRes = await fetch(`${BASE_URL}/orders`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        authorization: `Bearer ${newToken}`,
                    },
                    body: JSON.stringify({ ingredients: ingredientIds })
                });

            const retryData = await checkResponse(retryRes);
            dispatch({type: CONSTRUCTOR_SEND_ORDER_SUCCESS, payload: retryData.order.number});
            return;
            } catch (err) {
                console.error(err);
                if (err instanceof Error) {
                dispatch({type: CONSTRUCTOR_SEND_ORDER_FAIL, payload: err.message});
                }
                else{
                    dispatch({type: CONSTRUCTOR_SEND_ORDER_FAIL, payload: 'unknown error'});
                }
                return;
            }
        }
            const data = await checkResponse(res);

            const orderSendResult = data;
            dispatch({type: CONSTRUCTOR_SEND_ORDER_SUCCESS, payload: orderSendResult.order.number});
        }
        catch (error) {
            if (error instanceof Error) {
                dispatch({type: CONSTRUCTOR_SEND_ORDER_FAIL, payload: error.message});
            }
            else{
                dispatch({type: CONSTRUCTOR_SEND_ORDER_FAIL, payload: 'Uknown error'});
            }
            console.error('Ошибка при отправке:', error);
        }
    }
    else{
        dispatch({type: CONSTRUCTOR_SEND_ORDER_FAIL, payload: 'No ingredients selected'});
    }
}