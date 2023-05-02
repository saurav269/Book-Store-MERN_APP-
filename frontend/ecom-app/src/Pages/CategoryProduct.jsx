import React, { useEffect, useState } from "react";
import Layout from "../Components/Layout/Layout";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "../Components/Loading";

const CategoryProduct = () => {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [loading, setLoading] = useState(false);
  const params = useParams();
  const navigate = useNavigate()

  const getProductsByCat = async () => {
    try {
      const { data } = await axios.get(
        `https://pear-worried-bonobo.cyclic.app/api/v1/product/product-category/${params.slug}`
      );
      setCategory(data?.category);
      setProducts(data?.products);
    } catch (err) {
      console.log(err);
    }
  }; 

  useEffect(() =>{
    if(params?.slug) getProductsByCat()
  },[params?.slug])
  return (
    <Layout>
      <div className="container mt-3">
        <h3 className="text-center">Category : {category?.name}</h3>
        <h5 className="text-center">
            {loading ? (<Loading />) :(
                <div>
                    {products?.length} results found 
                </div>
            )}
            </h5>
        <div className="row">
        <div className="col-md-9">
          {/* {JSON.stringify(radio, null, 4)} */}
          <div className="d-flex flex-wrap">
            {products?.map((ele) => (
              <div className="card m-2" style={{ width: "18rem" }}>
                <img
                  src={`https://pear-worried-bonobo.cyclic.app/api/v1/product/product-photo/${ele._id}`}
                  className="card-img-top"
                  alt={ele.name}
                  // style={{
                  //   width: "20rem",
                  //   display: "block",
                  //   margin: "auto",
                  //   marginTop: "10px",
                  //   borderRadius: "10px",
                  // }}
                />
                <div className="card-body">
                  <h5 className="card-title">{ele.name}</h5>
                  <p className="card-text">
                    {ele.description.substring(0, 35)}...
                  </p>
                  <p className="card-text">Price : ₹{ele.price}</p>
                  <div className="btn_div">
                    <button
                      className="btn btn-primary ms-1"
                      onClick={() => navigate(`/product/${ele.slug}`)}
                    >
                      See Details
                    </button>
                    <button
                      className="btn btn-secondary ms-1"
                      style={{ backgroundColor: "tomato" }}
                    >
                      ADD TO CARD 🛒
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        </div>
      </div>
    </Layout>
  );
};

export default CategoryProduct;
