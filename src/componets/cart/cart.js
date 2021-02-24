import React, { useState } from "react";
import { removeFromCart } from "../../action/cartActions";
import { connect } from "react-redux";
import CheckoutForm from "../checkoutForm/checkoutForm";
import formatCurrency from "../../util";
import Fade from "react-reveal/Fade";
import "./cart.css";

const Cart = (props) => {
  const [showForm, setShowForm] = useState(false);
  
  const handleCheckout = () => {
    setShowForm(!showForm);
  };

  return (
    <div className="Main-Cart">
      <div className="Cart-Header">
        {props.cartItems.length === 0
          ? "Your cart is empty"
          : `You have ${props.cartItems.length} items in your cart`}
      </div>
      <div className="horizontal-line"></div>
      {props.cartItems.length > 0 && (
        <div className="cart">
          <Fade left cascade>
            <ul className="cart-items">
              {props.cartItems.map((item) => (
                <li key={item._id}>
                  <div>
                    <img src={item.image} alt={item.title}></img>
                  </div>
                  <div>
                    <div>{item.title}</div>
                    <div className="right">
                      {formatCurrency(item.price)} x {item.count}{" "}
                      <button
                        className="button"
                        onClick={() => props.removeFromCart(item)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </Fade>
        </div>
      )}
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
            <button className="button primary" onClick={handleCheckout}>
              {!showForm ? "Proceed" : "Cancel"}
            </button>
          </div>
        </div>
      ) : null}
      {showForm && props.cartItems.length > 0 && (
        <Fade right cascade>
          <CheckoutForm cartItems={props.cartItems} totalPrice = {formatCurrency(
                  props.cartItems.reduce((a, c) => a + c.price * c.count, 0)
                )}/>
        </Fade>
      )}
    </div>
  );
};

export default connect(
  (state) => ({
    cartItems: state.cart.cartItems,
  }),
  { removeFromCart }
)(Cart);
