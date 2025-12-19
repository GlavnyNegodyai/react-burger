import react, {FC} from 'react';
import styles from './orders-board.module.css';
import { TFeedOrder } from '../../services/types/data';


type TOrdersBoardProps = {
    orders: TFeedOrder[];
    total: number;
    totalToday: number;
};

export const OrdersBoard: FC<TOrdersBoardProps> = ({orders, total, totalToday}) => {
    const readyOrders = orders.filter(order => order.status === "done").map(order => order.number);
    const inProcessOrders = orders.filter(order => order.status !== "done").map(order => order.number);
    return(
        <section className={styles.section}>
            <div className={styles.ordersWrapper}>
                <div>
                    <h2 className="pb-6 text text_type_main-medium">Готовы:</h2>
                    <ul className={styles.ul}>
                        {readyOrders.slice(0, 20).map((readyOrder, index) => (
                            <li className={`text text_type_digits-default ${styles.cyanDigits}`} key={String(index)}>
                                {readyOrder}
                            </li>
                        ))}

                    </ul>
                </div>
                <div>
                    <h2 className="pb-6 text text_type_main-medium">В работе:</h2>
                    <ul className={styles.ul}>
                        {inProcessOrders.slice(0, 20).map((inProcessOrder, index) => (
                            <li className="text text_type_digits-default" key={String(index)}>
                                {inProcessOrder}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            <div>
                <h2 className="text text_type_main-medium">
                    Выполнено за все время:
                </h2>
                <p className="text text_type_digits-large">
                    {total}
                </p>
            </div>
            <div>
                <h2 className="text text_type_main-medium">
                    Выполнено за сегодня:
                </h2>
                <p className="text text_type_digits-large">
                    {totalToday}
                </p>
            </div>
        </section>
    );
}