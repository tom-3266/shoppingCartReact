//faeture 1
import React from "react";
import Products from "./componets/product/products";
import Filter from "./componets/Filter/filter";
import Cart from "./componets/cart/cart";
import { Provider } from "react-redux";
import store from "./store/store";

const App = () => {
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
              <Filter />
              <div className="horizontalLine"></div>
              <Products />
            </div>
            <div className="sidebar">
              <Cart createOrder={createOrder} />
            </div>
          </div>
        </main>
        <footer>All right is reserved</footer>
      </div>
    </Provider>
  );
};

export default App;
