import {
    CONSTRUCTOR_SEND_ORDER_REQUEST,
    CONSTRUCTOR_SEND_ORDER_FAIL,
    CONSTRUCTOR_SEND_ORDER_SUCCESS
} from '../actions/order-details.js';

const initialState = {
    orderDetails: null,
    sendOrderLoading: false,
    sendOrderError: false
}

export function orderReducer(state = initialState, action){
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
                sendOrderError: true,
                orderDetails: null
            }
        }
        case CONSTRUCTOR_SEND_ORDER_SUCCESS: {
            return{
                ...state,
                sendOrderLoading: false,
                sendOrderError: false,
                orderDetails: action.payload
            }
        }
        default: return state;
    }
}