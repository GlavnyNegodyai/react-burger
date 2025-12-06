import { TFeedOrder } from '../types/data';
import { TorderDetailsActions } from '../actions/order-composition';

import {
    ORDER_DETAILS_REQUEST,
    ORDER_DETAILS_FAIL,
    ORDER_DETAILS_SUCCESS
} from '../actions/order-composition';

type TinitialState = {
    orderDetails: TFeedOrder | null;
    orderDetailsLoading: boolean;
    orderDetailsError: boolean;
};

const initialState: TinitialState = {
    orderDetails: null,
    orderDetailsLoading: false,
    orderDetailsError: false
}

export function orderCompositionReducer(state = initialState, action: TorderDetailsActions){
    switch(action.type){
        case ORDER_DETAILS_REQUEST: {
            return{
                ...state,
                orderDetailsLoading: true,
                orderDetailsError: false
            }
        }
        case ORDER_DETAILS_FAIL: {
            return{
                ...state,
                orderDetailsLoading: false,
                orderDetailsError: true,
                orderDetails: null
            }
        }
        case ORDER_DETAILS_SUCCESS: {
            return{
                ...state,
                orderDetailsLoading: false,
                orderDetailsError: false,
                orderDetails: action.payload
            }
        }
        default: return state;
    }
}