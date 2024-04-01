import React, { useState, useEffect } from "react";
import { Input, Button, Form, message, Divider } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import NumberInput from "../../components/NumberInput";
import { getProduct } from "../../api/product";
import { getCart, updateCart } from "../../api/cart";

import "./index.css";

const Cart = (props) => {
  const [form] = Form.useForm();
  const [cart, setCart] = useState([]);

  useEffect(() => {
    //如果登录了，从接口拿购物车数据
    if (localStorage.getItem("userId")) {
      getCart(localStorage.getItem("userId")).then((res) => {
        localStorage.setItem("cartItems", JSON.stringify(res.cart));
      });
    }

    if (localStorage.getItem("cartItems")) {
      localStorage.getItem("cartItems");
      let cartItems = JSON.parse(localStorage.getItem("cartItems"));
      Promise.all(
        cartItems.map(async (cartItem) => {
          const product = (await getProduct(cartItem.productId)).data;
          cartItem.price = product.price;
          cartItem.title = product.product_name;
          cartItem.image = product.image_link;
          return cartItem;
        })
      ).then((updatedCartItems) => {
        setCart(updatedCartItems);
      });
    }
  }, []);

  const closeHandler = () => {
    props.onClose();
  };

  const handleRemove = (item) => {
    const newCart = cart.filter((i) => i.productId !== item.productId);
    setCart(newCart);
    localStorage.setItem("cartItems", JSON.stringify(newCart));
    if (localStorage.getItem("userId")) {
      //更新api
      updateCart({
        userId: localStorage.getItem("userId"),
        productId: item.productId,
        quantity: 0,
      }).then((res) => {
        console.log(res);
      });
    }
  };

  const quantityChangeHandler = (item, value) => {
    const newCart = cart.map((c) => {
      if (c.productId === item.productId) {
        c.quantity = value;
      }
      return c;
    });
    setCart(newCart);
    localStorage.setItem(
      "cartItems",
      JSON.stringify(
        newCart.map((x) => {
          return {
            quantity: x.quantity,
            productId: x.productId,
            price: x.price,
          };
        })
      )
    );

    if (localStorage.getItem("userId")) {
      //更新api
      let _item = newCart.find((x) => x.productId == item.productId);
      _item.userId = localStorage.getItem("userId");
      updateCart(_item).then((res) => {
        console.log(res);
      });
    }
  };

  const calculateTotalPrice = () => {
    let totalPrice = 0;
    cart.forEach((item) => {
      totalPrice += item.price * item.quantity;
    });
    props.onTotalPriceChange(totalPrice);
    return totalPrice;
  };

  return (
    <div className="cart-container">
      <div className="wrapper">
        <div className="header">
          <div className="title">
            Cart <span>({cart.length})</span>
          </div>
          <CloseOutlined className="close" onClick={closeHandler} />
        </div>
        <div className="cart-items">
          {cart &&
            cart.map((item, index) => {
              return (
                <div className="cart-item" key={index}>
                  <div className="cart-item-image">
                    <img src={item.image} alt="" />
                  </div>
                  <div className="cart-item-info">
                    <div className="cart-item-title">
                      <span>{item.title}</span>
                    </div>
                    <div className="cart-item-price">
                      <span>${item.price}</span>
                    </div>
                    <div className="cart-item-quantity">
                      <NumberInput
                        value={item.quantity}
                        onChange={(value) => {
                          quantityChangeHandler(item, value);
                        }}
                      ></NumberInput>
                      <a
                        className="remove-from-cart"
                        onClick={() => handleRemove(item)}
                      >
                        Remove
                      </a>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
        <div className="discount-code">
          <div className="discount-code-title">
            <h4>Apply Discount Code</h4>
          </div>
          <div className="discount-code-input">
            <Input
              type="text"
              placeholder="Enter your discount code"
              onChange={(e) => props.handleDiscount(e.target.value)}
            />
            <Button type="primary">Apply</Button>
          </div>
        </div>
        <Divider />

        <div className="cart-total">
          <div className="item">
            <div className="cart-total-title">
              <h4>Subtotal</h4>
            </div>
            <div className="cart-total-price">
              <h4>${calculateTotalPrice()}</h4>
            </div>
          </div>
          <div className="item">
            <div className="cart-total-title">
              <h4>Tax</h4>
            </div>
            <div className="cart-total-price">
              <h4>$0</h4>
            </div>
          </div>
          <div className="item">
            <div className="cart-total-title">
              <h4>Discount</h4>
            </div>
            <div className="cart-total-price">
              <h4>$0</h4>
            </div>
          </div>
          <div className="item">
            <div className="cart-total-title">
              <h4>Estimated total</h4>
            </div>
            <div className="cart-total-price">
              <h4>${calculateTotalPrice()}</h4>
            </div>
          </div>
        </div>
        <div className="cart-checkout">
          <Button
            className="checkout-btn"
            type="primary"
            style={{ width: "100%" }}
          >
            Continue to checkout
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
