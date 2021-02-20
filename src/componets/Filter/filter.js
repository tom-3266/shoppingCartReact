import React from "react";
import "./filter.css";

const Filter = (props) => {
  return (
    <div className="Filter">
      <div className="filter-result">{props.count} Products</div>
      <div className="filter-sort">
        Order {" "}
        <select name="" id="" onChange={props.sortProducts} value={props.sortP}>
          <option value="latest">Latest</option>
          <option value="highest">Highest</option>
          <option value="lowest">Lowest</option>
        </select>
      </div>
      <div className="filter-size">
        Size{" "} 
        <select name="" id="" onChange={props.sizeProducts} value={props.size}>
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

export { Filter };
