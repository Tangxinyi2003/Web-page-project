import React, { useState, useEffect } from "react";
import { Input, Button, Form, Select, Pagination } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import AddToCart from "../../components/AddToCart";
import "./index.css";
import { getProductList, addToCart } from "../../api/product";

const { Option } = Select;

const ProductList = () => {
  const [form] = Form.useForm();
  const history = useNavigate();
  const { searchValue } = useParams();
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [isAdmin, setIsAdmin] = useState(false);
  const [selectedValue, setSelectedValue] = useState("add_time");

  useEffect(() => {
    const params = {
      page: currentPage,
      pageSize: 10,
      orderBy: selectedValue,
      search: searchValue,
    };
    getProductList(params).then((res) => {
      setProducts(res.data);
      setTotal(res.total);
    });
    if (
      localStorage.getItem("email") &&
      localStorage.getItem("email").indexOf("admin") !== -1
    ) {
      setIsAdmin(true);
    }
  }, [currentPage, selectedValue, history]);

  const handleSelectChange = (value) => {
    setSelectedValue(value);
    setCurrentPage(1); // 重置页码为1
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const addProduct = () => {
    history("/productAdd");
  };

  const editProduct = (id) => {
    history("/productEdit/" + id);
  };

  const viewProduct = (id) => {
    history("/productDetail/" + id);
  };

  return (
    <div className="product-list-container">
      <div className="product-list-header">
        <span className="title">Products</span>
        <span>
          <Select defaultValue="add_time" onChange={handleSelectChange}>
            <Option value="add_time">Last Added</Option>
            <Option value="price">Price:low to high</Option>
            <Option value="price_minus">Price:high to low</Option>
          </Select>
          <> </>
          {isAdmin ? (
            <Button type="primary" onClick={addProduct}>
              Add Product
            </Button>
          ) : (
            ""
          )}
        </span>
      </div>

      <div className="product-list">
        {products &&
          products.map((product, index) => (
            <div key={index} className="product-item">
              <img
                src={product.image_link}
                alt={product.product_name}
                onClick={() => {
                  viewProduct(product._id);
                }}
              />
              <div
                className="product-name"
                onClick={() => {
                  viewProduct(product._id);
                }}
              >
                {product.product_name}
              </div>
              <div className="product-value">${product.price}</div>
              <div className="product-buttons">
                <AddToCart product={product} text="Add"></AddToCart>
                {isAdmin ? (
                  <Button
                    onClick={() => {
                      editProduct(product._id);
                    }}
                  >
                    Edit
                  </Button>
                ) : (
                  ""
                )}
              </div>
            </div>
          ))}
        {products.length === 0 && <h3>No products found ...</h3>}
      </div>

      <Pagination
        defaultCurrent={currentPage}
        total={total}
        className="pagination"
        onChange={handlePageChange} // 添加onChange回调函数
      />
    </div>
  );
};

export default ProductList;
