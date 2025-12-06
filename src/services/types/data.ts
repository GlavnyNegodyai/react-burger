export type TIngredient = {
    _id: string;
    name: string;
    type: string;
    proteins?: number;
    fat?: number;
    carbohydrates?: number;
    calories?: number;
    price: number;
    image?: string;
    image_mobile?: string;
    image_large?: string;
    __v?: number;
};

export type TFeedOrderStatus = 'done' | 'pending' | 'created';

export type TFeedOrder = {
  name: string;
  ingredients: string[];
  _id: string;
  status: TFeedOrderStatus;
  number: number;
  createdAt: string;
  updatedAt: string;
};

export type TfeedResponse = {
  success: boolean;
  orders: TFeedOrder[];
  total: number;
  totalToday: number;
};

export type TConstructorIngredient = TIngredient & { uid: string };

export type TuserData = {
  email: string;
  name: string;
};