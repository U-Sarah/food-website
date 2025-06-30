import "./App.css";
import React, { useState, useContext, createContext } from "react";
import ProductCard from "./components/ProductCard";
import data from "./data.json";
import CartList from "./components/CartList";
import CartModal from "./components/CartModal";

export const CartContext = createContext();

function App() {
  const [cartCount, setCartCount] = useState(0);
  const [cartItems, setCartItems] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const addToCart = (action) => {
    let items = 1;
    cartItems.map((value) => {
      const x = value.noOfItem;
      if (action === "increment") {
        items += value.noOfItem;
      }
      if (action === "decrement") {
        items = value.noOfItem - 1;
      }
      console.log(items);
    });

    setCartCount(items);
  };

  const removeItem = (itemName) => {
    const updatedCartItems = cartItems.filter((item) => item.name !== itemName);
    console.log(itemName);
    console.log(updatedCartItems);
    setCartItems(updatedCartItems);

    const newCartCount = updatedCartItems.reduce(
      (total, item) => total + item.noOfItem,
      0
    );
    setCartCount(newCartCount);
    console.log("removedItem");
  };

  const resetCart = () => {
    setCartCount(0);
    setCartItems([]);
  };

  return (
    <CartContext.Provider value={{ cartItems, setCartItems, removeItem }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: "0px 70px",
          backgroundColor: "hsl(20, 50%, 98%)",
        }}
        className="main"
      >
        <div style={{ width: "70%", boxSizing: "border-box" }}>
          {/* {JSON.stringify(cartItems)} */}
          <h1>Desserts</h1>
          {/* {JSON.stringify(cartItems)} */}
          <main
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "20px",
            }}
          >
            {data.map((prod, idx) => (
              <ProductCard
                id={idx}
                price={prod.price}
                name={prod.name}
                img={prod.image.desktop}
                thumbnail={prod.image.thumbnail}
                category={prod.category}
                addToCart={addToCart}
                cartItems={cartItems}
                setCartItems={setCartItems}
                setCartCount={setCartCount}
                removeItem={removeItem}
                resetCart={resetCart}
              />
            ))}
          </main>
        </div>
        <section
          style={{
            width: window.innerWidth <= 768 ? "55%" : "28%",
            boxSizing: "border-box",
            backgroundColor: "white",
            height: "fit-content",
            padding: "3px 20px",
            marginTop: "10px",
            borderRadius: "10px",
            color: "hsl(14, 86%, 42%)",
          }}
          className="cart"
        >
          <h1>
            Your Cart <span>({cartCount})</span>
          </h1>
          <CartList setShowModal={setShowModal} />
        </section>
      </div>
      <CartModal
        cartItems={cartItems}
        showModal={showModal}
        setShowModal={setShowModal}
        resetCart={resetCart}
      />
    </CartContext.Provider>
  );
}

export default App;
