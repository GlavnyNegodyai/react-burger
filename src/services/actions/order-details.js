export const CONSTRUCTOR_SEND_ORDER_REQUEST = 'CONSTRUCTOR_SEND_ORDER_REQUEST';
export const CONSTRUCTOR_SEND_ORDER_FAIL = 'CONSTRUCTOR_SEND_ORDER_FAIL';
export const CONSTRUCTOR_SEND_ORDER_SUCCESS = 'CONSTRUCTOR_SEND_ORDER_SUCCESS';


export const sendOrder = () => async (dispatch, getState) => {
    const { constructorItems, constructorBun } = getState().constructorReducer;
    const ingredientIds = [(constructorBun && constructorBun._id), ...constructorItems.map(item => item._id)];

    try{
        dispatch({type: CONSTRUCTOR_SEND_ORDER_REQUEST});
        const sendingOrder = await fetch('https://norma.nomoreparties.space/api/orders', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ ingredients: ingredientIds })
        });

        if(!sendingOrder.ok){
            throw new Error(`Ошибка: ${sendingOrder.status}`);
        }

        const orderSendResult = await sendingOrder.json();
        return dispatch({type: CONSTRUCTOR_SEND_ORDER_SUCCESS, payload: orderSendResult});
    }
    catch (error) {
        dispatch({type: CONSTRUCTOR_SEND_ORDER_FAIL});
        console.error('Ошибка при отправке:', error);
        throw error;
    }
}