//faeture 1
import React, { useState } from "react";
import data from "./data.json";
import Products from "./componets/product/products";
import { Filter } from "./componets/Filter/filter";
import { Cart } from "./componets/cart/cart";

const App = () => {
  const [displayData, setDisplayData] = useState({
    products: data.products,
    size: "",
    sortP: "",
    cartItems: localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : [],
  });
  const sizeProducts = (e) => {
    console.log("size");
    console.log(e.target.value);
    if (e.target.value) {
      console.log("target available");
      setDisplayData((state) => {
        return {
          ...state,
          size: e.target.value,
          products: data.products.filter(
            (product) => product.availableSizes.indexOf(e.target.value) >= 0
          ),
        };
      });
    }
  };
  const sortProducts = (e) => {
    console.log("sort");
    setDisplayData((state) => {
      return {
        ...state,
        sortP: e.target.value,
        products: displayData.products
          .slice()
          .sort((a, b) =>
            displayData.sortP === "lowest"
              ? a.price < b.price
                ? 1
                : -1
              : displayData.sortP === "highest"
              ? a.price > b.price
                ? 1
                : -1
              : a._id > b._id
              ? 1
              : -1
          ),
      };
    });
  };
  const addToCartHandler = (product) => {
    console.log("Added to cart", product);
    const cartItems = displayData.cartItems.slice();
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
    setDisplayData((state) => {
      return { ...state, cartItems };
    });
  };
  const removeHandler = (id) => {
    console.log("inside remove");
    const cartItems = displayData.cartItems.slice();
    cartItems.forEach((item) => {
      if (item._id === id) {
        item.count--;
        if (item.count < 1) {
          const index = cartItems.indexOf(item);
          cartItems.splice(index, 1);
        }
      }
    });
    setDisplayData((state) => {
      return { ...state, cartItems };
    });
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  };
  const createOrder = (order) =>{
    alert("Save Order for " + order.name)
  }
  return (
    <div className="grid-container">
      <header>
        <a href="/">Wallpaper Cart</a>
      </header>
      <main>
        <div className="content">
          <div className="main">
            <Filter
              count={displayData.products.length}
              sortP={displayData.sortP}
              size={displayData.size}
              sortProducts={sortProducts}
              sizeProducts={sizeProducts}
            />
            <div className="horizontalLine"></div>
            <Products
              products={displayData.products}
              addToCart={addToCartHandler}
            />
          </div>
          <div className="sidebar">
            <Cart
              cartItems={displayData.cartItems}
              removeHandler={removeHandler}
              createOrder={createOrder}
            />
          </div>
        </div>
      </main>
      <footer>All right is reserved</footer>
    </div>
  );
};

export default App;
