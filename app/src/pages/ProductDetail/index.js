import React, { useState, useEffect } from "react";
import { Input, Button, Form, Select, Pagination } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import AddToCart from "../../components/AddToCart";
import "./index.css";
import { getProduct } from "../../api/product";

const { Option } = Select;

const ProductDetail = () => {
  const [form] = Form.useForm();
  const history = useNavigate();
  const [product, setProduct] = useState({});
  const { id } = useParams();
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    getProduct(id).then((res) => {
      setProduct({
        _id: id,
        product_name: res.data.product_name,
        product_description: res.data.product_description,
        price: res.data.price,
        category: res.data.category,
        image_link: res.data.image_link,
        in_stock_quantity: res.data.in_stock_quantity,
      });
    });
    if (
      localStorage.getItem("email") &&
      localStorage.getItem("email").indexOf("admin") != -1
    ) {
      setIsAdmin(true);
    }
  }, []);

  const editProduct = () => {
    history("/productEdit/" + id);
  };

  return (
    <div className="product-detail-container">
      <div className="product-detail-header">
        <span className="title">Products Detail</span>
      </div>
      <div className="product-detail">
        <div className="product-main-pic">
          <img src={product.image_link} />
        </div>

        <div className="product-detail-info">
          <div className="product-detail-info-title">
            <div className="category">{product.category}</div>
            <div className="product-name">{product.product_name}</div>
            <div className="price">${product.price}</div>
            <div className="description">{product.product_description}</div>
            <div className="product-buttons">
              <AddToCart product={product} text="Add To Cart"></AddToCart>
              {isAdmin ? (
                <Button
                  onClick={() => {
                    editProduct();
                  }}
                >
                  Edit
                </Button>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
