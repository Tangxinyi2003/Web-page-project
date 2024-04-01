import React, { useState } from "react";
import { Input, Button, Form } from "antd";
import "./index.css";

const UpdatePasswordSend = () => {
  const [form] = Form.useForm();
  return (
    <div className="message-container">
      <div className="send-icon">
        <svg
          width="60"
          height="57"
          viewBox="0 0 60 57"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M32.9168 38.5833H44.5835V29.8333L59.1668 42.9583L44.5835 56.0833V47.3333H32.9168V38.5833ZM53.3335 0.666626H6.66683C5.11973 0.666626 3.636 1.28121 2.54204 2.37517C1.44808 3.46913 0.833496 4.95286 0.833496 6.49996V41.5C0.833496 43.047 1.44808 44.5308 2.54204 45.6247C3.636 46.7187 5.11973 47.3333 6.66683 47.3333H27.0835V41.5H6.66683V12.3333L30.0002 26.9166L53.3335 12.3333V29.8333H59.1668V6.49996C59.1668 4.95286 58.5522 3.46913 57.4583 2.37517C56.3643 1.28121 54.8806 0.666626 53.3335 0.666626ZM30.0002 21.0833L6.66683 6.49996H53.3335L30.0002 21.0833Z"
            fill="#5048E5"
          />
        </svg>
      </div>
      <div className="sub-title">
        We have sent the update password link to your emial, please check that
        ！
      </div>
    </div>
  );
};

export default UpdatePasswordSend;
