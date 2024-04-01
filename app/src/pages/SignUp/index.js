import React, { useState } from "react";
import { Input, Button, Form, message } from "antd";
import "./index.css";
import { signUpAction } from "../../api/user";

const SignUp = (props) => {
  const [form] = Form.useForm();
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const handleSignInClick = () => {
    // 调用父组件传递的回调函数
    props.onSignIn();
  };
  const handleFinish = async (values) => {
    // Email validation
    if (!values.email.includes("@")) {
      setEmailError("Invalid email format");
      return;
    }
    setEmailError("");

    // Password validation
    if (values.password === "") {
      setPasswordError("Password cannot be empty");
      return;
    }
    setPasswordError("");

    try {
      // Call the sign up API
      const params = {
        email: values.email,
        password: values.password,
      };
      const response = await signUpAction(params);

      // Handle the response
      if (response.code === "success") {
        // Registration successful
        message.success("Registration successful");
      } else {
        // Registration failed
        message.error("Registration failed");
      }
    } catch (error) {
      console.log("Error occurred during registration:", error);
    }
  };

  return (
    <div className="login-container">
      <div className="title">Sign up an account</div>
      <Form form={form} onFinish={handleFinish} layout="vertical">
        <Form.Item
          label="Email"
          name="email"
          rules={[
            {
              required: true,
              message: "Please enter your email",
            },
            {
              type: "email",
              message: "Invalid email format",
            },
          ]}
        >
          <Input />
        </Form.Item>
        {emailError && <div className="error">{emailError}</div>}
        <br />
        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: "Please enter your password",
            },
          ]}
        >
          <Input.Password />
        </Form.Item>
        {passwordError && <div className="error">{passwordError}</div>}
        <br />
        <Button type="primary" htmlType="submit">
          Create account
        </Button>
        <br />
        <div className="links">
          <span>
            Already have an account?{" "}
            <a href="javascript:;" onClick={handleSignInClick}>
              Sign In
            </a>
          </span>
        </div>
      </Form>
    </div>
  );
};

export default SignUp;
