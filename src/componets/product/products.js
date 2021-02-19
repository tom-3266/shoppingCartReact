import React from "react";
import "./products.css";
import formatCurrency from "../../util";

const Products = (props) => {
  console.log(props.products);
  return (
    <div className="Products">
      {props.products.map((product) => {
        return (
          <li key={product._id}>
            <div className="Product">
              <a href={"#" + product._id}>
                <img src={product.image} alt="product" />
                <p>{product.title}</p>
              </a>
              <div className="Product-price">
                <div>{formatCurrency(product.price)}</div>
                <button className="button primary">Add to cart</button>
              </div>
            </div>
          </li>
        );
      })}
    </div>
  );
};

export default Products;
