import React from "react";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";
import "./styles.css";
const ErrorPage = () => {
  const navigate = useNavigate();
  const handleGoHome = () => {
    navigate("/");
  };
  return (
    <div className="error-page">
      <div className="error-icon">
        <svg
          width="100"
          height="100"
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M50 8.33337C73.0125 8.33337 91.6667 26.9917 91.6667 50C91.6667 73.0084 73.0125 91.6667 50 91.6667C26.9875 91.6667 8.33337 73.0084 8.33337 50C8.33337 26.9917 26.9875 8.33337 50 8.33337ZM50 15.2792C30.8542 15.2792 15.2792 30.8542 15.2792 50C15.2792 69.1459 30.8542 84.7209 50 84.7209C69.1459 84.7209 84.7209 69.1459 84.7209 50C84.7209 30.8542 69.1459 15.2792 50 15.2792ZM49.9959 60.425C51.0998 60.425 52.1586 60.8636 52.9392 61.6442C53.7198 62.4248 54.1584 63.4836 54.1584 64.5875C54.1584 65.6915 53.7198 66.7503 52.9392 67.5309C52.1586 68.3115 51.0998 68.75 49.9959 68.75C48.8919 68.75 47.8332 68.3115 47.0525 67.5309C46.2719 66.7503 45.8334 65.6915 45.8334 64.5875C45.8334 63.4836 46.2719 62.4248 47.0525 61.6442C47.8332 60.8636 48.8919 60.425 49.9959 60.425ZM49.975 29.1667C50.7309 29.1657 51.4615 29.4388 52.0315 29.9352C52.6015 30.4316 52.9722 31.1179 53.075 31.8667L53.1042 32.2875L53.1209 51.0459C53.1217 51.838 52.8217 52.6009 52.2815 53.1802C51.7413 53.7596 51.0012 54.1122 50.211 54.1667C49.4207 54.2212 48.6392 53.9736 48.0246 53.4739C47.41 52.9742 47.008 52.2598 46.9 51.475L46.8709 51.05L46.8542 32.2959C46.8537 31.8851 46.9341 31.4783 47.0909 31.0987C47.2477 30.7191 47.4778 30.3741 47.768 30.0835C48.0583 29.7928 48.4029 29.5623 48.7824 29.405C49.1618 29.2477 49.5685 29.1667 49.9792 29.1667H49.975Z"
            fill="#5048E5"
          />
        </svg>
      </div>
      <h1>Oops! Something went wrong.</h1>
      <Button type="primary" htmlType="submit" onClick={handleGoHome}>
        Go Home
      </Button>
    </div>
  );
};
export default ErrorPage;
