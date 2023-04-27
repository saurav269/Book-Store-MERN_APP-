import React, { useEffect, useState } from "react";
import Layout from "../../Components/Layout/Layout";
import AdminMenu from "../../Components/Layout/AdminMenu";
import axios from "axios";
import toast from "react-hot-toast";
import { Select } from "antd";
import { useNavigate, useParams } from "react-router-dom";
const { Option } = Select;
const UpdateProduct = () => {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [author, setAuthor] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [shipping, setShipping] = useState("");
  const [id, setId] = useState("");
  const params = useParams();

  const navigate = useNavigate();
  //GETTING SINGLE PRODUCT
  const getSingleProduct = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:5200/api/v1/product/get-product/${params.slug}`
      );
      setName(data.product.name);
      setId(data.product._id);
      setAuthor(data.product.author);
      setDescription(data.product.description);
      setPrice(data.product.price);
      setQuantity(data.product.quantity);
      setCategory(data.product.category._id);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getSingleProduct();
  }, []);

  //GETTING ALL CATEGORIES
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:5200/api/v1/category/get-category"
      );
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (err) {
      console.log(err);
      toast.error("Something went Wrong for getting categories");
    }
  };
  useEffect(() => {
    getAllCategory();
  }, []);

  //FOR UPDATING PRODUCT
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const productData = new FormData();
      productData.append("name", name);
      productData.append("author", author);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("quantity", quantity);
      image && productData.append("image", image);
      productData.append("category", category);

      const { data } = axios.put(
        `http://localhost:5200/api/v1/product/update-product/${id}`,
        productData
      );
      if (data?.success) {
        toast.error(data?.message);
      } else {
        alert("Product Updated Successfully..😃");
        navigate("/dashboard/admin/products");
      }
    } catch (err) {
      console.log(err);
      toast.error();
    }
  };
  return (
    <Layout title={"Dashboard - Update Product"}>
      <div className="container-fluid m-4 p-4">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1>Update Product</h1>
            <div className="m-1 w-75">
              <Select
                bordered={false}
                placeholder="Select a category"
                size="large"
                showSearch
                className="form-select mb-3"
                onChange={(value) => {
                  setCategory(value);
                }}
                value={category}
              >
                {categories?.map((ele) => (
                  <Option key={ele._id} value={ele._id}>
                    {ele.name}
                  </Option>
                ))}
              </Select>
              <div className="md-3">
                <label className="btn btn-primary">
                  {image ? image.name : "Upload Image"}
                  <input
                    type="file"
                    name="image"
                    accept="image/*"
                    onChange={(e) => setImage(e.target.files[0])}
                    hidden
                  />
                </label>
              </div>
              <div className="md-3" style={{ marginTop: "10px" }}>
                {image ? (
                  <div className="text-center">
                    <img
                      src={URL.createObjectURL(image)}
                      alt="product-image"
                      height={"200px"}
                      className="img img-responsive"
                    />
                  </div>
                ) : (
                  <div className="text-center">
                    <img
                      src={`http://localhost:5200/api/v1/product/product-photo/${id}`}
                      alt="product-image"
                      height={"200px"}
                      className="img img-responsive"
                    />
                  </div>
                )}
              </div>
              <div className="md-3" style={{ marginTop: "10px" }}>
                <input
                  type="text"
                  value={name}
                  placeholder="Write Name Here"
                  className="form-control"
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="md-3" style={{ marginTop: "10px" }}>
                <input
                  type="text"
                  value={author}
                  placeholder="Write Author Name Here"
                  className="form-control"
                  onChange={(e) => setAuthor(e.target.value)}
                />
              </div>
              <div className="md-3" style={{ marginTop: "10px" }}>
                <textarea
                  type="text"
                  value={description}
                  placeholder="Add Description"
                  className="form-control"
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
              <div className="md-3" style={{ marginTop: "10px" }}>
                <input
                  type="number"
                  value={price}
                  placeholder="Enter Price Here"
                  className="form-control"
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>
              <div className="md-3" style={{ marginTop: "10px" }}>
                <input
                  type="number"
                  value={quantity}
                  placeholder="Enter Quantity Here"
                  className="form-control"
                  onChange={(e) => setQuantity(e.target.value)}
                />
              </div>
              <div className="md-3" style={{ marginTop: "10px" }}>
                <Select
                  bordered={false}
                  placeholder="Select Shipping"
                  size="large"
                  showSearch
                  className="form-select md-3"
                  onChange={(value) => {
                    setShipping(value);
                  }}
                  value={shipping ? "Yes" : "No"}
                >
                  <Option value="0">No</Option>
                  <Option value="1">Yes</Option>
                </Select>
              </div>
              <div className="md-3" style={{ marginTop: "10px" }}>
                <button className="btn btn-primary" onClick={handleUpdate}>
                  UPDATE PRODUCT
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default UpdateProduct;
