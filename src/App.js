//faeture 1
import React from "react";
import Products from "./componets/product/products";
import Filter from "./componets/Filter/filter";
import Cart from "./componets/cart/cart";
import { Provider } from "react-redux";
import store from "./store/store";

const App = () => {
  // const [displayData, setDisplayData] = useState({
  //   cartItems: localStorage.getItem("cartItems")
  //     ? JSON.parse(localStorage.getItem("cartItems"))
  //     : [],
  // });

  // const addToCartHandler = (product) => {
  //   console.log("Added to cart", product);
  //   const cartItems = displayData.cartItems.slice();
  //   let alreadyInCart = false;
  //   cartItems.forEach((item) => {
  //     if (item._id === product._id) {
  //       item.count++;
  //       alreadyInCart = true;
  //       localStorage.setItem("cartItems", JSON.stringify(cartItems));
  //     }
  //   });
  //   if (!alreadyInCart) {
  //     cartItems.push({ ...product, count: 1 });
  //     localStorage.setItem("cartItems", JSON.stringify(cartItems));
  //   }
  //   setDisplayData((state) => {
  //     return { ...state, cartItems };
  //   });
  // };
  // const removeHandler = (id) => {
  //   console.log("inside remove");
  //   const cartItems = displayData.cartItems.slice();
  //   cartItems.forEach((item) => {
  //     if (item._id === id) {
  //       item.count--;
  //       if (item.count < 1) {
  //         const index = cartItems.indexOf(item);
  //         cartItems.splice(index, 1);
  //       }
  //     }
  //   });
  //   setDisplayData((state) => {
  //     return { ...state, cartItems };
  //   });
  //   localStorage.setItem("cartItems", JSON.stringify(cartItems));
  // };
  const createOrder = (order) => {
    alert("Save Order for " + order.name);
  };
  return (
    <Provider store={store}>
      <div className="grid-container">
        <header>
          <a href="/">Wallpaper Cart</a>
        </header>
        <main>
          <div className="content">
            <div className="main">
              <Filter></Filter>
              <div className="horizontalLine"></div>
              <Products
                // products={displayData.products}
                // addToCart={addToCartHandler}
              />
            </div>
            <div className="sidebar">
              <Cart
                // cartItems={displayData.cartItems}
                // removeHandler={removeHandler}
                createOrder={createOrder}
              />
            </div>
          </div>
        </main>
        <footer>All right is reserved</footer>
      </div>
    </Provider>
  );
};

export default App;
