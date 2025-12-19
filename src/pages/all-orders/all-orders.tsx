import React, { useEffect } from 'react';
import { OrdersFeed } from '../../components/orders-feed/orders-feed';
import { OrdersBoard } from '../../components/orders-board/orders-board';
import { useDispatch, useSelector } from '../../services/hooks';
import { allFeedWsActions } from '../../services/actions/all-orders-feed';


const AllOrders = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch({type: allFeedWsActions.wsInit});
    return () => {
      dispatch({ type: allFeedWsActions.wsClose });
    };
    }, []);
    const {orders, total, totalToday} = useSelector(store => ({
        
        orders: store.allFeedReducer.orders,
        
        total: store.allFeedReducer.total,
        
        totalToday: store.allFeedReducer.totalToday

    }));
    return(
    <main>
        <OrdersFeed orders={orders} componentTitle={"Лента заказов"}/>
        <OrdersBoard orders={orders} total={total} totalToday={totalToday}/>
    </main>
    )
}

export default AllOrders;
