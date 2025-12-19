import { TFeedOrder } from "../services/types/data";

export const bun = {
  _id: "01",
  name: "someBun",
  type: "bun",
  proteins: 0,
  fat: 100,
  carbohydrates: 0,
  calories: 0,
  price: 1000,
  image: "string",
  image_mobile: "string",
  image_large: "string",
  __v: 1,
};

export const ingredient1 = {
  _id: "01",
  name: "someIngr",
  type: "ingredient",
  proteins: 0,
  fat: 100,
  carbohydrates: 0,
  calories: 0,
  price: 1000,
  image: "string",
  image_mobile: "string",
  image_large: "string",
  __v: 1,
};

export const ingredient2 = {
  _id: "02",
  name: "someIngr2",
  type: "ingredient",
  proteins: 1,
  fat: 101,
  carbohydrates: 1,
  calories: 1,
  price: 1001,
  image: "string",
  image_mobile: "string",
  image_large: "string",
  __v: 2,
};

export const testOrder:TFeedOrder = {
          _id: "123",
          number: 1,
          name: "test",
          status: "done",
          ingredients: ["bun", "beefpatty", "bun"],
          createdAt: "01.01.2000",
          updatedAt: "01.01.2000",
        };