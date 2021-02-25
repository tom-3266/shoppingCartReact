import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { texterror } from "./texterror";
import { useHistory } from "react-router-dom";
import shortid from "shortid";
import Modal from "react-modal";
import Zoom from "react-reveal/Zoom";
import axios from "../../axios-orders";
import * as Yup from "yup";
import "./chekcoutForm.css";

const initialValues = {
  name: "",
  email: "",
  address: "",
  phoneNumber: "",
};

const validationSchema = Yup.object({
  name: Yup.string().required("Required"),
  email: Yup.string().email("Invalid email").required("Required"),
  address: Yup.string().required("Required"),
  phoneNumber: Yup.number()
    .required("Required")
    .min(10, ({ min }) => `Phone Number must be at least ${min} characters`),
});
const CheckoutForm = (props) => {
  const history = useHistory();
  const [showModal, setShowModal] = useState(false);
  const [order, setOrder] = useState([]);

  const onSubmit = (values) => {
    const order = {
      id: shortid.generate(),
      name: values.name,
      email: values.email,
      address: values.address,
      phone: values.phoneNumber,
      cartItems: props.cartItems,
      totalPrice: props.totalPrice,
    };
    setShowModal(true);
    setOrder(order);
    // console.log(order.id);
    axios
      .post("/orders.json", order)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
      
    
  };

  const closeModal = () => {
    history.push("/");
    localStorage.setItem("cartItems", JSON.stringify([]));
    setShowModal(false);
  };

  return (
    <div>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        <Form>
          <div className="horizontal-line"></div>
          <div className="checkout-header">Checkout</div>
          <div className="cart">
            <div className="form-container">
              <div className="individual">
                <label htmlFor="name">Name </label>
                <Field id="name" name="name" type="text" />
                <ErrorMessage name="name" component={texterror} />
              </div>
              <div className="individual">
                <label htmlFor="email">Email </label>
                <Field id="email" name="email" type="email" />
                <ErrorMessage name="email" component={texterror} />
              </div>
              <div className="individual">
                <label htmlFor="address">Address </label>
                <Field id="address" name="address" type="text" />
                <ErrorMessage name="address" component={texterror} />
              </div>
              <div className="individual">
                <label htmlFor="phoneNumber">Phone Number</label>
                <Field id="phoneNumber" name="phoneNumber" type="text" />
                <ErrorMessage name="phoneNumber" component={texterror} />
              </div>
              <button type="submit" className="button primary">
                Create Order
              </button>
            </div>
          </div>
        </Form>
      </Formik>
      {showModal && (
        <Modal isOpen={true} onRequestClose={closeModal} ariaHideApp={false}>
          <Zoom>
            <button className="close-modal" onClick={closeModal}>
              x
            </button>
            <div className="order-details">
              <div className="success-message">
                <h3>Your order has been placed</h3>
              </div>
              <div>
                <h2>Order : {order.id}</h2>
              </div>
              <li>Name : {order.name}</li>
              <li>Email : {order.email}</li>
              <li>Total Price : {props.totalPrice}</li>
              <li className="items">
                Items :
                {props.cartItems.map((item) => (
                  <div>
                    {item.count} {" x "} {item.title}
                  </div>
                ))}
              </li>
            </div>
          </Zoom>
        </Modal>
      )}
    </div>
  );
};

export default CheckoutForm;
