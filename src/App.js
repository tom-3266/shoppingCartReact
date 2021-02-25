//faeture 1
import React from "react";
import Products from "./componets/product/products";
import Filter from "./componets/Filter/filter";
import Cart from "./componets/cart/cart";
import Admin from "./componets/Admin/admin";
import { Provider } from "react-redux";
import { Switch, Link, Route } from "react-router-dom";
import store from "./store/store";

const App = () => {
  return (
    <Provider store={store}>
      <div className="grid-container">
        <header>
          <div>
            <Link to="/">Wallpaper Cart</Link>
          </div>
          <div className="cartAdmin">
            <Link to="/cart">Cart</Link>
            <Link to="/admin">Admin</Link>
          </div>
        </header>

        <main>
          <div className="content">
            <Switch>
              <Route path="/" exact>
                <div className="main">
                  <Filter />
                  <div className="horizontalLine"></div>
                  <Products />
                </div>
              </Route>
              <Route path="/cart" exact>
                <div className="sidebar">
                  <Cart />
                </div>
              </Route>
              <Route path="/admin" exact>
                <Admin />
              </Route>
            </Switch>
          </div>
        </main>
        <footer>Enjoy Shopping</footer>
      </div>
    </Provider>
  );
};

export default App;
