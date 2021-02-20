//faeture 1
import React, { useState } from "react";
import data from "./data.json";
import Products from "./componets/product/products";
import { Filter } from "./componets/Filter/filter";

const App = () => {
  const [displayData, setDisplayData] = useState({
    products: data.products,
    size: "",
    sortP: "",
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
  return (
    <div className="grid-container">
      <header>
        <a href="/">Shoppify Cart</a>
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
            <Products products={displayData.products} />
          </div>
          <div className="sidebar">Cart</div>
        </div>
      </main>
      <footer>All right is reserved</footer>
    </div>
  );
};

export default App;
