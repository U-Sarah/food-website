import React, { useState, useContext, useEffect } from "react";
import { CartContext } from "../App";
// import image from "/assets/images/image-tiramisu-tablet.jpg"

const style = {
  color: "red",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  boxSizing: "border-box",
  width: "250px",
  margin: "0",
  padding: "0",
};

export const btnStyle = {
  backgroundColor: "white",
  width: "136px",
  padding: "5px 20px",
  display: "flex",
  gap: "5px",
  alignItems: "center",
  borderRadius: "50px",
  border: "1px solid  hsl(7, 20%, 60%)",
  margin: "-20px auto 20px",
};

const imgStyle = {
  border: "1px solid white",
  borderRadius: "50px",
  padding: "3px",
};

const ProductCard = ({
  id,
  price,
  name,
  category,
  img,
  addToCart,
  cartItems,
  setCartItems,
  setCartCount,
  removeItem,
  thumbnail,
  resetCart,
}) => {
  const cart = useContext(CartContext);
  const [count, setCount] = useState(0);
  // useEffect(() => setCount(0), [resetCart]);

  const decrementCount = () => {
    // addToCart("decrement");
    updateCartItems(id, name, price, "decrement");
    setCount((prev) => (prev > 0 ? prev - 1 : prev));
  };
  const incrementCount = () => {
    // addToCart("increment");

    updateCartItems(id, name, price, "increment");
    setCount((prev) => prev + 1);
  };

  const updateCartItems = (id, name, price, action) => {
    setCartItems((prev) => {
      const productIndex = prev.findIndex((item) => item.id === id);

      if (productIndex !== -1) {
        // Create a copy of the cart items
        const updatedItems = [...prev];

        if (action === "increment") {
          updatedItems[productIndex].noOfItem += 1;
          setCartCount((prev) => prev + 1);
        }
        if (action === "decrement") {
          // Decrease quantity only if it's greater than 1
          if (updatedItems[productIndex].noOfItem > 0) {
            updatedItems[productIndex].noOfItem -= 1;
            setCartCount((prev) => prev - 1);
            if (updatedItems[productIndex].noOfItem === 0) {
              removeItem(updatedItems[productIndex].name);
              count === 1 && setCount(0);
            }
          }
        }

        return updatedItems;
      } else if (action === "increment") {
        // Add new item to cart if it doesn't exist and action is increment
        return [...prev, { id, name, price, noOfItem: 1, thumbnail }];
      }

      return prev;
    });
  };

  //first add to cart click
  const handleAddToCart = () => {
    setCount(1);
    // addToCart("increment");
    setCartCount((prev) => prev + 1);
    updateCartItems(id, name, price, "increment");
  };

  return (
    <div style={style}>
      <img
        src={img}
        width={"100%"}
        alt={name}
        style={{
          borderRadius: "5px",
          alignItems: "center",
          justifyContent: "center",
        }}
      />
      <button
        style={{
          ...btnStyle,
          backgroundColor: count ? "hsl(14, 86%, 42%)" : "",
          justifyContent: "space-between",
        }}
        onClick={count ? undefined : handleAddToCart}
      >
        {count ? (
          <>
            <img
              style={{ ...imgStyle, padding: "7px 3px" }}
              src="/assets/images/icon-decrement-quantity.svg"
              alt=""
              onClick={(e) => {
                e.stopPropagation();
                decrementCount(e);
              }}
            />
            {count}
            <img
              style={imgStyle}
              src="/assets/images/icon-increment-quantity.svg"
              alt=""
              onClick={(e) => {
                e.stopPropagation();
                incrementCount(e);
              }}
            />
          </>
        ) : (
          <>
            <img src="/assets/images/icon-add-to-cart.svg" alt="" />
            Add to Cart
          </>
        )}
      </button>

      <p
        style={{
          margin: "0",
          marginBottom: "4px",
          color: "hsl(12, 20%, 44%)",
          fontFamily: "'Red Hat Text', sans-serif",
          fontWeight: "200",
          fontSize: "14px",
        }}
      >
        {category}
      </p>
      <h3
        style={{
          margin: "0",
          marginBottom: "4px",
          color: "hsl(14, 65%, 9%)",
          fontFamily: "'Red Hat Text', sans-serif",
          fontSize: "16px",
          fontWeight: "600",
          lineHeight: "1",
        }}
      >
        {name}
      </h3>
      <h4
        style={{
          margin: "0",
          marginBottom: "20px",
          color: "hsl(14, 86%, 42%)",
          fontFamily: "'Red Hat Text', sans-serif",
          fontSize: "15px",
          fontWeight: "600",
        }}
      >
        ${price.toFixed(2)}
      </h4>
    </div>
  );
};

export default ProductCard;
