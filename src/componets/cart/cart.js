import React from "react";
import formatCurrency from "../../util";
import "./cart.css";

const Cart = (props) => {
  console.log(props.cartItems);
  return (
    <div className="Main-Cart">
      <div className="Cart-Header">
        {props.cartItems.length === 0
          ? "Your cart is empty"
          : `You have ${props.cartItems.length} items in your cart`}
      </div>
      <div className="horizontal-line"></div>
      <div className="cart">
        <ul className="cart-items">
          {props.cartItems.map((items) => {
            return (
              <li id={items._id + items.count}>
                <div>
                  <img src={items.image} alt={items.title} />
                </div>
                <div>
                  <div>{items.title}</div>
                  <div className="right">
                    {formatCurrency(items.price)} x {items.count}{" "}
                    <button onClick={() => props.removeHandler(items._id)}>
                      Remove
                    </button>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
      {props.cartItems.length > 0 ? (
        <div>
          <div className="horizontal-line"></div>
          <div className="cart">
            <div className="total">
              <div>
                {" "}
                Total Price :{"  "}
                {formatCurrency(
                  props.cartItems.reduce((a, c) => a + c.price * c.count, 0)
                )}
              </div>
            </div>
            <button className='button primary'>Proceed</button>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export { Cart };
