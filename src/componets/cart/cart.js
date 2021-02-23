import React, { useState } from "react";
import formatCurrency from "../../util";
import "./cart.css";
import Fade from 'react-reveal/Fade'
import shortid from "shortid";
import axios from '../../axios-orders'
import { removeFromCart } from "../../action/cartActions";
import {connect} from 'react-redux'

const Cart = (props) => {
  const [showForm, setShowForm] = useState(false);
  const [formValue, setFormValues] = useState({
    name: "",
    email: "",
    address: "",
    phone: "",
  });
  const handleCheckout = () => {
    setShowForm(!showForm);
  };
  const createOrder = (e) => {
    e.preventDefault();
    const order = {
      id:shortid.generate(),
      name: formValue.name,
      email: formValue.email,
      address: formValue.address,
      phone: formValue.phone,
      cartItems: props.cartItems,
    };
    
    axios
      .post("/orders.json", order)
      .then((response) => {
        console.log(response)
        // history.push("/");
      })
      .catch((error) => {
        console.log(error)
      });
  };
 
    const handleInput = (e) => {
      setFormValues((state) => {
        return { ...state, [e.target.name]: e.target.value };
      });
    };
  return (
    <div className="Main-Cart">
      <div className="Cart-Header">
        {props.cartItems.length === 0
          ? "Your cart is empty"
          : `You have ${props.cartItems.length} items in your cart`}
      </div>
      <div className="horizontal-line"></div>
      <div className="cart">
        <Fade left cascade>
          <ul className="cart-items">
            {props.cartItems.map((items) => {
              console.log(items)
              return (
                <li id={items._id + items.count}>
                  <div>
                    <img src={items.image} alt={items.title} />
                  </div>
                  <div>
                    <div>{items.title}</div>
                    <div className="right">
                      {formatCurrency(items.price)} x {items.count}{" "}
                      <button onClick={() => props.removeFromCart(items._id,props.cartItems)}>
                        Remove
                      </button>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </Fade>
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
            <button className="button primary" onClick={handleCheckout}>
              {!showForm ? "Proceed" : "Cancel"}
            </button>
          </div>
        </div>
      ) : null}
      {showForm && props.cartItems.length > 0 && (
        <Fade right cascade>
          <div>
            <div className="horizontal-line"></div>
            <div className="checkout-header">Checkout</div>
            <div className="cart">
              <form onSubmit={createOrder}>
                <ul className="form-container">
                  <li>
                    <label htmlFor="email">Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formValue.name}
                      required
                      onChange={handleInput}
                    />
                  </li>
                  <li>
                    <label htmlFor="email">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formValue.email}
                      required
                      onChange={handleInput}
                    />
                  </li>
                  <li>
                    <label htmlFor="address">Address</label>
                    <input
                      type="text"
                      name="address"
                      value={formValue.address}
                      required
                      onChange={handleInput}
                    />
                  </li>
                  <li>
                    <label htmlFor="phone">Phone No</label>
                    <input
                      type="text"
                      name="phone"
                      value={formValue.phone}
                      required
                      onChange={handleInput}
                    />
                  </li>
                  <li>
                    <button
                      className="button primary"
                      type="submit"
                      onClick={createOrder}
                    >
                      Create Order
                    </button>
                  </li>
                </ul>
              </form>
            </div>
          </div>
        </Fade>
      )}
    </div>
  );
};

export default connect(
  (state) => ({
    cartItems: state.cart.cartItems,
  }),
  removeFromCart
)(Cart);
