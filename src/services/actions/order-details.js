import { BASE_URL } from '../../utils/base-url';
import { checkResponse } from '../../utils/check-response';


export const CONSTRUCTOR_SEND_ORDER_REQUEST = 'CONSTRUCTOR_SEND_ORDER_REQUEST';
export const CONSTRUCTOR_SEND_ORDER_FAIL = 'CONSTRUCTOR_SEND_ORDER_FAIL';
export const CONSTRUCTOR_SEND_ORDER_SUCCESS = 'CONSTRUCTOR_SEND_ORDER_SUCCESS';


export const sendOrder = () => async (dispatch, getState) => {
    const { constructorItems, constructorBun } = getState().constructorReducer;
    const ingredientIds = [(constructorBun && constructorBun._id), ...constructorItems.map(item => item._id)];
    if(ingredientIds.some(id => id)){
        try{
            dispatch({type: CONSTRUCTOR_SEND_ORDER_REQUEST});
            console.log(ingredientIds);
            const res = await fetch(`${BASE_URL}/orders`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ ingredients: ingredientIds })
            });

            const data = await checkResponse(res);

            const orderSendResult = data;
            dispatch({type: CONSTRUCTOR_SEND_ORDER_SUCCESS, payload: orderSendResult});
        }
        catch (error) {
            dispatch({type: CONSTRUCTOR_SEND_ORDER_FAIL});
            console.error('Ошибка при отправке:', error);
            throw error;
        }
    }
    else{
        dispatch({type: CONSTRUCTOR_SEND_ORDER_FAIL});
    }
}