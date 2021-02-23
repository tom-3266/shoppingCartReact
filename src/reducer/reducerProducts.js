import {
  FETCH_PRODUCTS,
  FILTER_PRODUCTS_BY_SIZE,
  ORDER_PRODUCTS_BY_PRICE,
} from "../actionCreators";

export const productsReducer = (state = {}, action) => {
  switch (action.type) {
    case FILTER_PRODUCTS_BY_SIZE:
      return {
        ...state,
        filteredItems: action.payload.items,
        size: action.payload.size,
      };
    case ORDER_PRODUCTS_BY_PRICE:
      return {
        ...state,
        sortP: action.payload.sortP,
        filteredItems: action.payload.items,
      };
    case FETCH_PRODUCTS:
      return { items: action.payload ,filteredItems: action.payload};
    default:
      return state;
  }
};
