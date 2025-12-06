import React, { FC, useEffect } from "react";
import "./orders-feed.css";
import { TIngredient } from "../../services/types/data";
import { useDispatch, useSelector } from '../../services/hooks';
import { fetchIngredients } from "../../services/actions/burger-ingredients";
import { useNavigate, useLocation } from "react-router-dom";
import { IngredientGradient } from "../ingredient-gradient/ingredient-gradient";
import {
  FormattedDate,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

type Order = {
  _id: string;
  name: string;
  ingredients: string[];
  status: 'created' | 'pending' | 'done';
  number: number;
  createdAt: string;
  updatedAt: string;
}

type OrderCardProps = {
  allIngredients: TIngredient[];
  showReadiness?: boolean; 
  order: Order;
};

type OrdersFeedProps = {
  orders: Order[];
  showReadiness?: boolean;
};

const OrderFeedCard: FC<OrderCardProps> = ({ order, allIngredients, showReadiness}) => {
  const { name, ingredients, createdAt, number, status } = order;
  const navigate = useNavigate();
  const location = useLocation();
  const onCardClick = () => {
    navigate(`${number}`, {
      state: { background: location },
    });
  };
  const ingredientsIds = ingredients;
  const orderIngredients: TIngredient[] = [];
  for (let i = 0; i < ingredientsIds.length; i++) {
    const ingredientId = ingredientsIds[i];
    const foundIngredient = allIngredients.find(ing => ingredientId === ing._id);
    if (foundIngredient) {
      orderIngredients.push(foundIngredient);
    }
  }
  if (
    !(orderIngredients.length > 1) ||
    !orderIngredients.some((ing) => ing.type === "bun") || !orderIngredients.some((ing) => ing.type !== "bun")
  ) {
    return null;
  }
  const isOrderBig = orderIngredients.length > 6;
  const orderPrice = orderIngredients.reduce(
    (sum, ingredient) =>
      ingredient.type === "bun"
        ? sum + ingredient.price * 2
        : sum + ingredient.price,
    0
  );
  const ingredientsToDisplay = isOrderBig
    ? orderIngredients.slice(0, 6)
    : orderIngredients;

  return (
    <li className="order-card" onClick={onCardClick}>
      <div className="order-card__top pb-6">
        <p className="text text_type_digits-default">{`#${number}`}</p>
        <FormattedDate
          date={new Date(createdAt)}
          className="text text_type_main-default text_color_inactive"
        />
      </div>
      <h3 className="text text_type_main-medium">{name}</h3>
      {showReadiness && (
      <p className={`pb-6 text text_type_main-default order-status order-status--${status}`}>
      {status === 'created'
      ? 'Готовится'
      : status === 'pending'
      ? 'В работе'
      : status === 'done'
      ? 'Выполнен'
      : ''}
      </p>
      )}
      <div className="order-card__bottom">
        <ul className="order-card__ingredients">
          {ingredientsToDisplay.map((orderIngredient, index) => (
            <li
              className={`order-card__ingredient${
                isOrderBig && index === 5 ? " order-card__ingredient--more" : ""
              }`}
              key={index}
              style={{
                transform: `translateX(${-16 * index}px)`,
                zIndex: 100 - index,
              }}
            >
              <IngredientGradient imageUrl={orderIngredient.image ?? ''} />
              {isOrderBig && index === 5 && (
                <span className="text text_type_main-default more-ingredients-counter">
                  +{orderIngredients.slice(5).length}
                </span>
              )}
            </li>
          ))}
        </ul>

        <div className="order-card__price">
          <span className="text text_type_digits-default ">{orderPrice}</span>
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </li>
  );
};

export const OrdersFeed: FC<OrdersFeedProps> = ({ orders, showReadiness }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    
    dispatch(fetchIngredients());
  }, [dispatch]);
  const allIngredients = useSelector(
    
    (store) => store.ingredientsReducer.ingredients
  );

  return (
    <section className="orders-feed">
      <h1 className="text_type_main-large">Лента заказов</h1>
      <ul className="order-cards">
        {orders.map((order, index) => (
          <OrderFeedCard
            order={order}
            allIngredients={allIngredients}
            key={index}
            showReadiness={showReadiness}
          />
        ))}
      </ul>
    </section>
  );
};
