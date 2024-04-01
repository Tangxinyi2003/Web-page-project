import React, { useState } from "react";
import { Button } from "antd";
import "./index.css";
import { updateCart } from "../../api/cart";
import PubSub from "pubsub-js";

const AddToCart = (props) => {
  const [value, setValue] = useState(0);
  const [numberShow, setNumberShow] = useState(false);

  const handleQuantity = (action) => {
    if (action === "up") {
      setValue(value + 1);
      addToCartHandler(1, props.product);
    } else if (action == "down") {
      if (value > 1) {
        setValue(value - 1);
        addToCartHandler(-1, props.product);
      }
    }
  };

  const addToCartHandler = (value, product) => {
    if (!localStorage.getItem("cartItems")) {
      localStorage.setItem("cartItems", "[]");
    }
    const cartItems = JSON.parse(localStorage.getItem("cartItems"));
    if (cartItems) {
      const productIndex = cartItems.findIndex(
        (item) => item.productId === product._id
      );
      if (productIndex >= 0) {
        cartItems[productIndex].quantity += value;
      } else {
        cartItems.push({
          productId: product._id,
          quantity: value,
          price: product.price,
        });
      }
    } else {
      cartItems.push({
        productId: product._id,
        quantity: value,
        price: product.price,
      });
    }
    localStorage.setItem("cartItems", JSON.stringify(cartItems));

    //如果登录了，则保存到数据库
    if (localStorage.getItem("userId")) {
      let item = cartItems.find((x) => x.productId == product._id);
      item.userId = localStorage.getItem("userId");
      updateCart(item).then((res) => {
        console.log(res);
      });
    }
    PubSub.publish("UpdateCart");
  };

  return (
    <div className="add-to-cart">
      {numberShow == true ? (
        <span style={{ paddingTop: "1px" }}>
          <button
            className="quantity-down"
            onClick={() => handleQuantity("down")}
          >
            -
          </button>
          <input className="quantity-input" value={value} disabled />

          <button className="quantity-up" onClick={() => handleQuantity("up")}>
            +
          </button>
        </span>
      ) : (
        <Button
          type="primary"
          className="add"
          onClick={() => {
            setNumberShow(true);
          }}
        >
          {props.text}
        </Button>
      )}
    </div>
  );
};
export default AddToCart;
