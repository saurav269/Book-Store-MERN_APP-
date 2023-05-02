import React, { useEffect, useState } from "react";
import AdminMenu from "../../Components/Layout/AdminMenu";
import Layout from "../../Components/Layout/Layout";
import toast from "react-hot-toast";
import axios from "axios";
import "./products.css";
import { Link } from "react-router-dom";

const Products = () => {
  const [product, setProduct] = useState([]);
  const [products, setProducts] = useState([]);

  //Getting all products
  const getAllProducts = async () => {
    try {
      const { data } = await axios.get(
        "https://pear-worried-bonobo.cyclic.app/api/v1/product/get-product"
      );
      setProduct(data.products);
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong");
    }
  };


  //USING useEffect Hook
  useEffect(() => {
    getAllProducts();
  }, []);
  return (
    <Layout>
      <div className="row">
        <div className="col-md-3" style={{marginTop : "10px"}}>
          <AdminMenu />
        </div>
        <div className="col-md-9">
          <h1 className="text-center" style={{ marginTop : "10px"}}>All Books Collection</h1>
          <div className="d-flex flex-wrap">
            {product?.map((ele) => (
              <Link 
              key={ele._id} 
              to={`/dashboard/admin/product/${ele.slug}`}
              className="product-link"
              >
                <div className="card m-2" style={{ width: "18rem"}}>
                  <img
                    src={`https://pear-worried-bonobo.cyclic.app/api/v1/product/product-photo/${ele._id}`}
                    className="card-img-top"
                    alt={ele.name}
                    // style={{width : '70%'}}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{ele.name}</h5>
                    <p className="card-text">{ele.description}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Products;
