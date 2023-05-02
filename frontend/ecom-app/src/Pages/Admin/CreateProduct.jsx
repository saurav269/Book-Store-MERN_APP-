import React, { useEffect, useState } from "react";
import Layout from "../../Components/Layout/Layout";
import AdminMenu from "../../Components/Layout/AdminMenu";
import axios from "axios";
import toast from "react-hot-toast";
import { Select } from "antd";
import { useNavigate } from "react-router-dom";


const { Option } = Select;
const CreateProduct = () => {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [author, setAuthor] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [shipping, setShipping] = useState("");

  const navigate = useNavigate()

  //GETTING ALL CATEGORIES
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(
        "https://pear-worried-bonobo.cyclic.app/api/v1/category/get-category"
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

  //FOR CREATING PRODUCT
  const handleCreate = async(e) => {
     e.preventDefault()
     try{
      const productData = new FormData()
      productData.append("name", name)
      productData.append("author", author)
      productData.append("description", description)
      productData.append("price", price)
      productData.append("quantity", quantity)
      productData.append("image", image)
      productData.append("category", category)
      const {data} = axios.post('https://pear-worried-bonobo.cyclic.app/api/v1/product/create-product', productData)
      if(data?.success){
        toast.error(data?.message)
      }else{
        alert('Product Created Successfully..😃')
        navigate('/dashboard/admin/products')
      }
     }catch(err){
      console.log(err)
      toast.error()
     }
  };

  return (
    <Layout title={"Dashboard - Create Product"}>
      <div className="container-fluid m-4 p-4">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1>Create Product</h1>
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
                {image && (
                  <div className="text-center">
                    <img
                      src={URL.createObjectURL(image)}
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
                >
                  <Option value="0">No</Option>
                  <Option value="1">Yes</Option>
                </Select>
              </div>
              <div className="md-3" style={{ marginTop: "10px" }}>
                <button className="btn btn-primary" onClick={handleCreate}>
                  CREATE PRODUCT
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CreateProduct;
