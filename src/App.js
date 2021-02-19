//faeture 1
import React, { useState } from "react";
import data from "./data.json";
import Products from './componets/product/products'

const App = () => {
  const [displayData, setDisplayData] = useState({
    products: data.products,
    size: "",
    sort: "",
  });
  console.log(displayData.products)
  return (
    <div className="grid-container">
      <header>
        <a href="/">Shopping Cart App</a>
      </header>
      <main>
        <div className="content">
          <div className="main"><Products products={displayData.products} /></div>
          <div className="sidebar">Cart</div>
        </div>
      </main>
      <footer>All right is reserved</footer>
    </div>
  );
};

export default App;
