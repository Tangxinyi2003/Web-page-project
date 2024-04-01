import { Children } from "react";
import { useRoute, useRoutes } from "react-router-dom";
import { Layout } from "./layouts/index";
import SignIn from "./pages/SignIn/index";
import SignUp from "./pages/SignUp/index";
import UpdatePassword from "./pages/updatePassword/index";
import UpdatePasswordSend from "./pages/updatePassword/send";
import ErrorPage from "./pages/ErrorPage";
import ProductList from "./pages/ProductList/index";
import ProductAdd from "./pages/ProductAdd/index";
import ProductEdit from "./pages/ProductEdit/index";
import ProductDetail from "./pages/ProductDetail/index";
import GetAuthFromLocalStorage from "./Auth/GetAuthFromLocalStorage";
import RequireAuth from "./Auth/RequireAuth";

const config = [
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "signin",
        element: <SignIn />,
      },
      {
        path: "signup",
        element: <SignUp />,
      },
      {
        path: "updatePassword",
        element: <UpdatePassword />,
      },
      {
        path: "updatePasswordSend",
        element: <UpdatePasswordSend />,
      },
      {
        path: "productList",
        element: <ProductList />,
      },
      {
        path: "productList/:searchValue",
        element: <ProductList />,
      },
      {
        path: "productAdd",
        element: <ProductAdd />,
      },
      {
        path: "productDetail/:id",
        element: <ProductDetail />,
      },
      {
        path: "ProductEdit/:id",
        element: <ProductEdit />,
      },
      {
        path: "error",
        element: <ErrorPage />,
      },
    ],
  },
];

const handleConfig = (arr) => {
  arr.forEach((obj) => {
    const { children, element, hasAuth } = obj;
    if (hasAuth) {
      obj.element = <RequireAuth children={element}></RequireAuth>;
    }
    if (children && children.length !== 0) {
      handleConfig(children);
    }
  });
  return arr;
};

handleConfig(config);

// const Route = useRoutes(config)

export default () => {
  const element = useRoutes(config);
  return element;
};
