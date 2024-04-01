import React, { useState } from "react";
import { Input, Button, Form, Select, Space, Row, Col, message } from "antd";
import { useNavigate } from "react-router-dom";

import { addProduct } from "../../api/product";

import "./index.css";

const { Option } = Select;

const ProductAdd = () => {
  const [form] = Form.useForm();
  const [imagePreview, setImagePreview] = useState("");
  const history = useNavigate();

  const onFinish = (values) => {
    console.log(values);
    const params = {
      product_name: values.product_name,
      price: values.price,
      category: values.category,
      product_description: values.product_description,
      image_link: values.image_link,
      in_stock_quantity: values.in_stock_quantity,
    };
    addProduct(params).then((res) => {
      console.log(res);
      message.success("Product created!");
      history("/productList");
    });
  };

  const handlePreview = () => {
    const imageLink = form.getFieldValue("image_link");
    setImagePreview(imageLink);
  };

  return (
    <div className="product-add-container">
      <h1>Create Product</h1>
      <div className="product-add">
        <Form form={form} onFinish={onFinish} layout="vertical">
          <Row>
            <Col span={24}>
              <Form.Item
                name="product_name"
                label="Product name"
                rules={[{ required: true }]}
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <Form.Item
                name="product_description"
                label="Product Description"
                rules={[{ required: true }]}
              >
                <Input.TextArea />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={5}>
            <Col span={12}>
              <Form.Item
                name="category"
                label="Category"
                rules={[{ required: true }]}
              >
                <Select>
                  <Option value="category1">Category 1</Option>
                  <Option value="category2">Category 2</Option>
                  <Option value="category3">Category 3</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="price"
                label="Price"
                rules={[{ required: true }]}
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={5}>
            <Col span={10}>
              <Form.Item
                name="in_stock_quantity"
                label="In Stock Quantity"
                rules={[{ required: true }]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={9}>
              <Form.Item
                name="image_link"
                label="Add Image Link"
                rules={[{ required: true }]}
              >
                <Input placeholder="http://" />
              </Form.Item>
            </Col>
            <Col span={2}>
              <Form.Item label=" ">
                <Button type="primary" onClick={handlePreview}>
                  Preview
                </Button>
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <div className="image-preview">
                {imagePreview ? (
                  <img src={imagePreview} alt="preview" />
                ) : (
                  <div className="empty">
                    <svg
                      width="40"
                      height="40"
                      viewBox="0 0 40 40"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M16.255 17.5C16.7475 17.5 17.2351 17.403 17.6901 17.2145C18.145 17.0261 18.5584 16.7499 18.9067 16.4017C19.2549 16.0534 19.5311 15.64 19.7196 15.1851C19.908 14.7301 20.005 14.2425 20.005 13.75C20.005 13.2575 19.908 12.7699 19.7196 12.3149C19.5311 11.86 19.2549 11.4466 18.9067 11.0983C18.5584 10.7501 18.145 10.4739 17.6901 10.2855C17.2351 10.097 16.7475 10 16.255 10C15.2604 10 14.3066 10.3951 13.6034 11.0983C12.9001 11.8016 12.505 12.7554 12.505 13.75C12.505 14.7446 12.9001 15.6984 13.6034 16.4017C14.3066 17.1049 15.2604 17.5 16.255 17.5Z"
                        fill="#E5E5E5"
                      />
                      <path
                        d="M35 35C35 36.3261 34.4732 37.5979 33.5355 38.5355C32.5979 39.4732 31.3261 40 30 40H10C8.67392 40 7.40215 39.4732 6.46447 38.5355C5.52678 37.5979 5 36.3261 5 35V5C5 3.67392 5.52678 2.40215 6.46447 1.46447C7.40215 0.526784 8.67392 0 10 0L23.75 0L35 11.25V35ZM10 2.5C9.33696 2.5 8.70107 2.76339 8.23223 3.23223C7.76339 3.70107 7.5 4.33696 7.5 5V30L13.06 24.44C13.257 24.2434 13.514 24.1182 13.7903 24.0843C14.0665 24.0503 14.3462 24.1095 14.585 24.2525L20 27.5L25.3925 19.95C25.498 19.8024 25.6344 19.6796 25.7921 19.59C25.9499 19.5005 26.1252 19.4463 26.306 19.4313C26.4868 19.4164 26.6687 19.4409 26.839 19.5033C27.0094 19.5656 27.1641 19.6643 27.2925 19.7925L32.5 25V11.25H27.5C26.5054 11.25 25.5516 10.8549 24.8483 10.1517C24.1451 9.44839 23.75 8.49456 23.75 7.5V2.5H10Z"
                        fill="#E5E5E5"
                      />
                    </svg>
                    <br />
                    Image Preview
                  </div>
                )}
              </div>
            </Col>
          </Row>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Add Product
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default ProductAdd;
