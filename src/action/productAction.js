import { FETCH_PRODUCTS } from "../actionCreators";
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
