import React, { useState } from "react";
import "./products.css";
import formatCurrency from "../../util";
import Fade from "react-reveal/Fade";
import Modal from "react-modal";
import Zoom from "react-reveal/Zoom";

const Products = (props) => {
  const [productModal, setProductModal] = useState();
  const openModal = (product) => {
    console.log(product);
    setProductModal(product);
  };
  const closeModal = () => {
    setProductModal();
  };
  return (
    <div>
      <Fade bottom cascade>
        <ul className="Products">
          {props.products.map((product) => {
            return (
              <li key={product._id + product.price}>
                <div className="Product">
                  <a
                    href={"#" + product._id}
                    onClick={() => openModal(product)}
                  >
                    <img src={product.image} alt="product" />
                    <p>{product.title}</p>
                  </a>
                  <div className="Product-price">
                    <div>{formatCurrency(product.price)}</div>
                    <button
                      onClick={() => props.addToCart(product)}
                      className="button primary"
                    >
                      Add to cart
                    </button>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </Fade>
      {productModal && (
        <Modal isOpen={true} onRequestClose={closeModal} ariaHideApp={false}>
          <Zoom>
            <button className="close-modal" onClick={closeModal}>
              x
            </button>
            <div className="product-details">
              <img src={productModal.image} alt={productModal.title}></img>
              <div className="product-details-description">
                <p>
                  <strong>{productModal.title}</strong>
                </p>
                <p>{productModal.description}</p>
                <p>
                  Avaiable Sizes:{" "}
                  {productModal.availableSizes.map((x) => (
                    <span>
                      {" "}
                      {x === "ALL" ? null : (
                        <button className="button">{x}</button>
                      )}
                    </span>
                  ))}
                </p>
                <div className="product-price">
                  <div>{formatCurrency(productModal.price)}</div>
                  <div>
                    <button
                      className="button primary modal"
                      onClick={() => {
                        props.addToCart(productModal);
                        closeModal();
                      }}
                    >
                      Add To Cart
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </Zoom>
        </Modal>
      )}
    </div>
  );
};

export default Products;
