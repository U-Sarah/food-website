import React from "react";

const style = {
  display: "flex",
  justifyContent: "space-between",
};
const nameStyle = {
    margin: "0 0 13px 0",
    color: "hsl(14, 65%, 9%)",
}
export const itemStyle = {
  margin: "0",
  fontFamily: "'Red Hat Text', sans-serif",
};

const priceStyle = {
  margin: "0",
  fontFamily: "'Red Hat Text', sans-serif",
  fontWeight: "200",
  color: "hsl(12, 20%, 44%)",
};

const descriptionStyle = {
  display: "flex",
  gap: "12px",
  margin: "0",
};

const properties = {
  display: "flex",
  gap: "4px",
};

const imgStyle = {
    border: "1px solid hsl(12, 20%, 44%)",
    borderRadius: "50%",
    padding: "7px 3px",
    marginTop: "10px"
};

const CartItem = ({ name, price, itemNum, removeItem }) => {
  const total = price * itemNum;
  const finalItem = `${itemNum}x `;
  const finalPrice = `$${total.toFixed(2)}`;
  const formattedPrice = `@$${price.toFixed(2)}`;

  

  return (
    <>
      <div style={style}>
        <div>
          <h4 style={nameStyle}>{name}</h4>
          <div style={descriptionStyle}>
            <h4 style={itemStyle}>{finalItem}</h4>
            <div style={properties}>
              <h4 style={priceStyle}>{formattedPrice}</h4>
              <h4 style={{ ...priceStyle, fontWeight: "bolder" }}>{finalPrice}</h4>
            </div>
          </div>
        </div>
        <img src="/assets/images/icon-remove-item.svg" alt="" height={10}  style={imgStyle} onClick={() => removeItem(name)} />
      </div>
      <hr />
      
    </>
  );
};

export default CartItem;
