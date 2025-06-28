import React, { useContext, useState } from "react";
import CartItem from "./CartItem";
import { CartContext } from "../App";
import Modal from "react-modal";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    borderRadius: "5px",
    backgroundColor: "black",
    backgroundColor: "background-color: rgba(0, 0, 0, 0.3)",
    backdropFilter: "blur(4px)"
  },
};
const buttonStyle = {
  width: "400px",
  padding: "10px",
  backgroundColor: "hsl(14, 86%, 42%)",
  borderRadius: "20px",
  color: "white",
  border: "none",
  marginTop: "10px",
};
const main = {
  backgroundColor: "hsl(20, 50%, 98%)",
};
const mainStyle = {
  display: "flex",
  justifyContent: "space-between",
  width: "350px",
  padding: "15px",
  borderRadius: "3px",
};

const imgStyle = {
  display: "flex",
  gap: "10px",
  // width: "250px",
};
const properties = {
  display: "flex",
  gap: "8px",
  fontFamily: "sans-serif",
};

const styleTotal = {
  display: "flex",
  justifyContent: "space-between",
  backgroundColor: "hsl(20, 50%, 98%)",
  padding: "10px",
  
};

const ModalItem = ({ name, price, itemNum, img }) => {
  const { cartItems } = useContext(CartContext);
  const total = price * itemNum;
  const finalItem = `${itemNum}x `;
  const finalPrice = `$${total.toFixed(2)}`;
  const formattedPrice = `@$${price.toFixed(2)}`;
  const finalTotal = cartItems.reduce((sum, item) => {
    return sum + item.price * item.noOfItem;
  }, 0);
  const formattedTotal = `$${finalTotal.toFixed(2)}`;

  return (
    <>
      <div style={main}>
        <div style={mainStyle}>
          <div style={imgStyle}>
            <img src={img} alt="" width={50} height={40} />
            <div>
              <h4 style={{ margin: "0" }}>{name}</h4>
              <div style={properties}>
                <h4 style={{ margin: "0", color: "hsl(14, 86%, 42%)" }}>
                  {finalItem}
                </h4>
                <h4 style={{ margin: "0", color: "", fontWeight: "lighter" }}>
                  {formattedPrice}
                </h4>
              </div>
            </div>
          </div>
          <h4
            style={{
              margin: "0",
              color: "hsl(12, 20%, 44%)",
              fontWeight: "bold",
            }}
          >
            {finalPrice}
          </h4>
        </div>
        
      </div>
    </>
  );
};

const CartModal = ({ cartItems, showModal, setShowModal, resetCart }) => {
  const finalTotal = cartItems.reduce((sum, item) => {
    return sum + item.price * item.noOfItem;
  }, 0);
  const formattedTotal = `$${finalTotal.toFixed(2)}`;

  const closeModal = () => {
    setShowModal(false);
    resetCart()
  };

  return (
    <div>
      <Modal
        isOpen={showModal}
        //   onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <img src="/assets/images/icon-order-confirmed.svg" alt="icon-confirm" />
        <h1 style={{ margin: "0" }}>Order Confirmed</h1>
        <p style={{ margin: "3px 0 25px 0", color: "hsl(14, 25%, 72%)" }}>
          We hope you enjoy your food!
        </p>

        {cartItems.map((item) => (
          <ModalItem
            name={item.name}
            price={item.price}
            itemNum={item.noOfItem}
            img={item.thumbnail}
          />
        ))}
          <div style={styleTotal}>
          <p style={{margin: "0"}}>Order Total</p>
          <h2 style={{margin: "0"}}>{formattedTotal}</h2>
        </div>
        <button onClick={closeModal} style={buttonStyle}>
          Start New Order
        </button>
      </Modal>
    </div>
  );
};

export default CartModal;
