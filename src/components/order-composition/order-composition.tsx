import react, { useEffect } from "react";
import { IngredientGradient } from "../ingredient-gradient/ingredient-gradient";
import { useParams } from "react-router-dom";
import { TIngredient } from "../../services/types/data";
import "./order-composition.css";
import { useDispatch, useSelector } from '../../services/hooks';
import { getOrderDetails } from "../../services/actions/order-composition";
import { fetchIngredients } from "../../services/actions/burger-ingredients";
import {
  FormattedDate,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

type SortedIngredient = TIngredient & {
  count: number;
};


export const OrderComposition = () => {
  const countIngredients = (ingredientsArray: TIngredient[], ingredient: TIngredient) => {
    return ingredientsArray.filter((ing) => ing._id === ingredient._id).length;
  };

  const sortOutIngredients = (ingredientsArray: TIngredient[]) => {
    const sortedOutIngredients: SortedIngredient[] = [];
    for (let i = 0; i < ingredientsArray.length; i++) {
      const currentIngredient = ingredientsArray[i];

      const doesAlreadyExist = sortedOutIngredients.some(
        (sortedIng) => sortedIng._id === currentIngredient._id
      );

      if (!doesAlreadyExist) {
        sortedOutIngredients.push({
          ...currentIngredient,
          count:
            countIngredients(ingredientsArray, currentIngredient) * (currentIngredient.type === "bun"? 2 : 1)
        });
      }
    }
    return sortedOutIngredients;
  };

  const { id } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    
    dispatch(getOrderDetails(id));
    
    dispatch(fetchIngredients());
  }, [dispatch]);
  const order = useSelector(
    
    (store) => store.orderCompositionReducer.orderDetails
  );
  const allIngredients = useSelector(
    
    (store) => store.ingredientsReducer.ingredients
  );

  if (!order || !order.ingredients) {
    return <div>Загрузка...</div>;
  }

    const orderIngredients: TIngredient[] = [];
  for (let i = 0; i < order.ingredients.length; i++) {
    const ingredientId = order.ingredients[i];
    const found = allIngredients.find((ing: TIngredient) => ingredientId === ing._id)
    if (found){
      orderIngredients.push(found);
    }
    
  }
  const orderPrice = orderIngredients.reduce(
    (sum, ingredient) =>
      ingredient.type === "bun"
        ? sum + ingredient.price * 2
        : sum + ingredient.price,
    0
  );

  const sortedOutIngredients = sortOutIngredients(orderIngredients);

  return (
    <div className="order-composition-card">
      <p className="text text_type_digits-default mb-10 order-number">
        #{order.number}
      </p>
      <h2 className="text text_type_main-medium mb-3">{order.name}</h2>
      <p className={`pb-6 text text_type_main-default order-status order-status--${order.status}`}>
      {order.status === 'created'
      ? 'Готовится'
      : order.status === 'pending'
      ? 'В работе'
      : order.status === 'done'
      ? 'Выполнен'
      : ''}
      </p>
      <div>
        <h3 className="text text_type_main-medium mb-6">Состав:</h3>
        <ul className="order-composition__ingredients mb-10">
          {sortedOutIngredients.map((ingredient, index) => (
            <li className="order-composition__ingredient" key={index}>
              <div className="order-composition__ingredient__image-and-name">
                <IngredientGradient imageUrl={ingredient.image ?? ''} />
                <h4 className="pl-4 pr-4 text text_type_main-default">
                  {ingredient.name}
                </h4>
              </div>
              <div className="text text_type_digits-default price-wrapper">
                <div className="price__number">
                  <span>{ingredient.count}</span>
                  <span>x</span>
                  <span>{ingredient.price}</span>
                </div>
                <CurrencyIcon type="primary" />
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className="order-composition__bottom">
        <FormattedDate
          date={new Date(order.createdAt)}
          className="text text_type_main-default text_color_inactive"
        />
        <div className="text text_type_digits-default price-wrapper">
          <div className="price__number">
            <span>{orderPrice}</span>
          </div>
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </div>
  );
};
