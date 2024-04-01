import React, { useState } from "react";
import { Input, Button, Form, message } from "antd";
import "./index.css";
import { signInAction } from "../../api/user";

const SignIn = (props) => {
  const [form] = Form.useForm();
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const handleSignUpClick = () => {
    // 调用父组件传递的回调函数
    props.onSignUp();
  };

  const handleChangePasswordClick = () => {
    props.onChangePassword();
  };

  const handleSubmit = async (values) => {
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
      const params = {
        email: values.email,
        password: values.password,
      };
      const response = await signInAction(params);
      // Handle the response
      if (response.code === "success") {
        // Registration successful
        message.success("Sign In successful");
        const { id, email, token } = response;
        // cache the user's id and email
        // 缓存用户id和邮箱
        localStorage.setItem("userId", id);
        localStorage.setItem("email", email);
        localStorage.setItem("token", token);
        props.onSignedIn();
      } else {
        // Registration failed
        message.error("Sign In failed");
      }
    } catch (error) {
      // handle sign in error
    }
  };

  return (
    <div className="login-container">
      <div className="title">Sign in to your account</div>
      <Form form={form} onFinish={handleSubmit} layout="vertical">
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
          Sign In
        </Button>
        <br />
        <div className="links">
          <span>
            Don't have an account?{" "}
            <a href="javascript:;" onClick={handleSignUpClick}>
              Sign up
            </a>
          </span>

          <a href="javascript:;" onClick={handleChangePasswordClick}>
            Forgot password?
          </a>
        </div>
      </Form>
    </div>
  );
};

export default SignIn;
