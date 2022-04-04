import { ICartProduct } from '../models';

export const calculateCartSum = (cartProducts: ICartProduct[]): number => {
  return cartProducts.reduce((previousValue, currentValue) => {
    previousValue += currentValue.price * currentValue.count;

    return previousValue;
  }, 0);
};
