import React, { useEffect } from 'react';
import { OrdersFeed } from '../../components/orders-feed/orders-feed';
import { useDispatch, useSelector } from '../../services/hooks';
import { userFeedWsActions } from '../../services/actions/user-orders-feed';
import { ProfileMenu } from '../../components/profile-menu/profile-menu';
import { getAccessToken } from '../../utils/auth-cookies';
import styles from './user-orders.module.css';

const UserOrders = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch({type: userFeedWsActions.wsInit, payload: getAccessToken() });
    return () => {
      dispatch({ type: userFeedWsActions.wsClose });
    };
    }, []);
    const {orders} = useSelector(store => ({
        orders: store.userFeedReducer.orders
    }));
    return(
    <main>
        <div className={styles.wrapper}>
            <ProfileMenu/>
            <OrdersFeed orders={orders} showReadiness={true}/>
        </div>
    </main>
    )
}

export default UserOrders;
