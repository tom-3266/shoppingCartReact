import { ADD_TO_CART, REMOVE_FROM_CART } from "../actionCreators";

export const addToCart = (product, items) => (dispatch) => {
  // console.log(porduct,items)
  const cartItems = items.slice();
  let alreadyInCart = false;
  cartItems.forEach((item) => {
    if (item._id === product._id) {
      item.count++;
      alreadyInCart = true;
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
    }
  });
  if (!alreadyInCart) {
    cartItems.push({ ...product, count: 1 });
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }
  dispatch({ type: ADD_TO_CART, payload: { cartItems } });
};

export const removeFromCart = (id,cartItems) => (dispatch) => {
  console.log(id,cartItems)
  // const cartItems = items.slice();
  cartItems.forEach((item) => {
    if (item._id === id) {
      item.count--;
      if (item.count < 1) {
        const index = cartItems.indexOf(item);
        cartItems.splice(index, 1);
      }
    }
  });
  dispatch({ type: REMOVE_FROM_CART, payload: { cartItems } });
  localStorage.setItem("cartItems", JSON.stringify(cartItems));
};
