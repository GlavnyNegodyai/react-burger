import React, { useEffect } from 'react';
import { OrdersFeed } from '../../components/orders-feed/orders-feed';
import { OrdersBoard } from '../../components/orders-board/orders-board';
import { useDispatch, useSelector } from 'react-redux';
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
        // @ts-ignore
        orders: store.allFeedReducer.orders,
        // @ts-ignore
        total: store.allFeedReducer.total,
        // @ts-ignore
        totalToday: store.allFeedReducer.totalToday

    }));
    return(
    <main>
        <OrdersFeed orders={orders}/>
        <OrdersBoard orders={orders} total={total} totalToday={totalToday}/>
    </main>
    )
}

export default AllOrders;
