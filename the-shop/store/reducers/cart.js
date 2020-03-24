import { ADD_TO_CART } from "../actions/cart";

import CartItem from "../../models/cart-item";

const initialState = {
  items: {},
  totalAmount: 0
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      const addedProduct = action.product;
      let updatedOrNewCartItem;

      if (state.items[addedProduct.id]) {
        updatedOrNewCartItem = new CartItem(
          state.items[addedProduct.id].quantity + 1,
          addedProduct.price,
          addedProduct.title,
          state.items[addedProduct.id].sum + addedProduct.price
        );
      } else {
        updatedOrNewCartItem = new CartItem(
          1,
          addedProduct.price,
          addedProduct.title,
          addedProduct.price
        );
      }
      return {
        ...state,
        items: { ...state.items, [addedProduct.id]: updatedOrNewCartItem },
        totalAmount: state.totalAmount + addedProduct.price
      };
  }

  return state;
};
