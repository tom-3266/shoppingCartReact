import React from "react";
import { connect } from "react-redux";
import "./filter.css";
import { sortProducts, filterProducts } from "../../action/productAction";
const Filter = (props) => {
  // console.log(props.filteredProducts);
  return !props.filteredProducts ? (
    <div>Loading...</div>
  ) : (
    <div className="Filter">
      <div className="filter-result">
        {props.filteredProducts.length} Products
      </div>
      <div className="filter-sort">
        Order{" "}
        <select
          onChange={(e) =>
            props.sortProducts(props.filteredProducts, e.target.value)
          }
          value={props.sortP}
        >
          <option value="latest">Latest</option>
          <option value="highest">Highest</option>
          <option value="lowest">Lowest</option>
        </select>
      </div>
      <div className="filter-size">
        Size{" "}
        <select
          onChange={(e) => props.filterProducts(props.product, e.target.value)}
          value={props.size}
        >
          <option value="ALL">ALL</option>
          <option value="XS">XS</option>
          <option value="S">S</option>
          <option value="M">M</option>
          <option value="L">L</option>
          <option value="XL">XL</option>
          <option value="XXL">XXL</option>
        </select>
      </div>
    </div>
  );
};

export default connect(
  (state) => ({
    sortP: state.products.sortP,
    size: state.products.size,
    product: state.products.items,
    filteredProducts: state.products.filteredItems,
  }),
  { filterProducts, sortProducts }
)(Filter);
