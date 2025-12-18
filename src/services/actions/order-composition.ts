import { BASE_URL } from '../../utils/base-url';
import { checkResponse } from '../../utils/check-response';
import { AppThunk } from "../types";
import { AppDispatch } from "../types"; 
import { TFeedOrder } from '../types/data';

export const ORDER_DETAILS_REQUEST: 'ORDER_DETAILS_REQUEST' = 'ORDER_DETAILS_REQUEST';
export const ORDER_DETAILS_FAIL: 'ORDER_DETAILS_FAIL' = 'ORDER_DETAILS_FAIL';
export const ORDER_DETAILS_SUCCESS: 'ORDER_DETAILS_SUCCESS' = 'ORDER_DETAILS_SUCCESS';

export type TorderDetailsRequestAction = {
    readonly type: typeof ORDER_DETAILS_REQUEST;
};

export type TorderDetailsFailAction = {
    readonly type: typeof ORDER_DETAILS_FAIL;
};

export type TorderDetailsSuccessAction = {
    readonly type: typeof ORDER_DETAILS_SUCCESS;
    readonly payload: TFeedOrder;
};

export type  TorderDetailsActions = 
    TorderDetailsRequestAction| 
    TorderDetailsFailAction|
    TorderDetailsSuccessAction;

export const getOrderDetails: AppThunk = (orderId) => async (dispatch: AppDispatch) => {
    try{
        dispatch({type: ORDER_DETAILS_REQUEST});
        const res = await fetch(`${BASE_URL}/orders/${orderId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const data = await checkResponse(res);
        const orderDetails = data.orders[0];
        dispatch({type: ORDER_DETAILS_SUCCESS, payload: orderDetails});
    }
    catch (error) {
        if (error instanceof Error) {
        dispatch({type: ORDER_DETAILS_FAIL, payload: error.message});
        }
        else {
            dispatch({type: ORDER_DETAILS_FAIL, payload: 'Unknown error'});
        }
        console.error('Ошибка при получении деталей о заказе:', error);
        throw error;
    }
}