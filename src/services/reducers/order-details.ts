import { TconstructorSendOrderActions } from '../actions/order-details'; 
import {
    CONSTRUCTOR_SEND_ORDER_REQUEST,
    CONSTRUCTOR_SEND_ORDER_FAIL,
    CONSTRUCTOR_SEND_ORDER_SUCCESS
} from '../actions/order-details';

type TinitialState = {
    orderDetails: string | null;
    sendOrderLoading: boolean;
    sendOrderError: string | null;
};

const initialState: TinitialState = {
    orderDetails: null,
    sendOrderLoading: false,
    sendOrderError: null
}

export function orderReducer(state = initialState, action: TconstructorSendOrderActions){
    switch(action.type){
        case CONSTRUCTOR_SEND_ORDER_REQUEST: {
            return{
                ...state,
                sendOrderLoading: true,
                sendOrderError: false
            }
        }
        case CONSTRUCTOR_SEND_ORDER_FAIL: {
            return{
                ...state,
                sendOrderLoading: false,
                sendOrderError: action.payload,
                orderDetails: null
            }
        }
        case CONSTRUCTOR_SEND_ORDER_SUCCESS: {
            return{
                ...state,
                sendOrderLoading: false,
                sendOrderError: null,
                orderDetails: action.payload
            }
        }
        default: return state;
    }
}