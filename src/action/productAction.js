import {
  FETCH_PRODUCTS,
  FILTER_PRODUCTS_BY_SIZE,
  ORDER_PRODUCTS_BY_PRICE,
} from "../actionCreators";
import axios from "axios";

export const fetchProducts = () => (dispatch) => {
  axios
    .get(
      "https://wallpaper-cart-10809-default-rtdb.firebaseio.com/products/-MU4aEG_KQRPr14F8eTY/products.json"
    )
    .then((response) => {
      dispatch({ type: FETCH_PRODUCTS, payload: response.data });
    })
    .catch((error) => {
      console.log(error);
    });
};

export const filterProducts = (products, size) => (dispatch) => {
  // console.log(products) 
  dispatch({
    type: FILTER_PRODUCTS_BY_SIZE,
    payload: {
      size: size,
      items:
        size === "ALL"
          ? products
          : products.filter(
              (product) => product.availableSizes.indexOf(size) >= 0
            ),
    },
  });
};

export const sortProducts = (filteredProducts, sortP) => (dispatch) => {
  
  const sortedProducts = filteredProducts.slice();
  if (sortP === "latest") {
    sortedProducts.sort((a, b) => (a._id > b._id ? 1 : -1));
  } else if (sortP === "lowest") {
    sortedProducts.sort((a, b) => (a.price > b.price ? 1 : -1));
  } else if (sortP === "highest") {
    sortedProducts.sort((a, b) => (a.price > b.price ? -1 : 1));
  }
  // console.log(filteredProducts, sortP);
  dispatch({
    type: ORDER_PRODUCTS_BY_PRICE,
    payload: {
      sortP: sortP,
      items: sortedProducts,
    },
  });
};
