import React, { useState } from "react";
import { Button } from "antd";
import "./index.css";
const NumberInput = (props) => {
  const [value, setValue] = useState(props.value ? props.value : 1);

  const handleQuantity = (action) => {
    if (action === "up") {
      setValue(value + 1);
      props.onChange(value + 1);
    } else if (action == "down") {
      if (value > 1) {
        setValue(value - 1);
        props.onChange(value - 1);
      }
    } else {
      setValue(action);
      props.onChange(action);
    }
  };

  return (
    <div className="number-input">
      <button className="quantity-down" onClick={() => handleQuantity("down")}>
        -
      </button>
      <input
        className="quantity-input"
        value={value}
        onChange={(e) => handleQuantity(e.target.value)}
      />

      <button className="quantity-up" onClick={() => handleQuantity("up")}>
        +
      </button>
    </div>
  );
};
export default NumberInput;
