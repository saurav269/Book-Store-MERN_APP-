import React, { useEffect, useState } from "react";
import Layout from "../Components/Layout/Layout";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useCart } from "../Context/Cart";
import  toast  from "react-hot-toast";

const ProductDetails = () => {
  const params = useParams();
  const [product, setProduct] = useState({});
  const [relatedProduct, setRelatedProduct] = useState([]);
  const [cart, setCart] = useCart();
  const navigate= useNavigate()

  //GET PRODUCT
  const getProduct = async () => {
    try {
      const { data } = await axios.get(
        `https://pear-worried-bonobo.cyclic.app/api/v1/product/get-product/${params.slug}`
      );
      setProduct(data?.product);
      getSimilarProduct(data?.product._id, data?.product.category._id);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (params?.slug) getProduct();
  }, [params?.slug]);

  //GETTING SIMILAR PRODUCT
  const getSimilarProduct = async (pid, cid) => {
    try {
      const { data } = await axios.get(
        `https://pear-worried-bonobo.cyclic.app/api/v1/product/related-product/${pid}/${cid}`
      );
      setRelatedProduct(data?.products);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Layout>
      <div className="row container mt-4">
        <div className="col-md-6">
          <img
            src={`https://pear-worried-bonobo.cyclic.app/api/v1/product/product-photo/${product._id}`}
            className="card-img-top"
            alt={product.name}
            style={{ width: "55%", height: "400px",display: "block",
                 margin: "auto",
                 marginTop: "10px",
                 borderRadius: "10px", }}
          />
        </div>
        <div className="col-md-6">
          <h1>Book Details</h1>
          <h5>Name : {product.name}</h5>
          <h5>Author Name : {product.author}</h5>
          <h5>Description : {product.description}</h5>
          <h5>Price : ₹{product.price}</h5>
          <h5>Category : {product?.category?.name}</h5>
          <button
            className="btn btn-secondary ms-1"
            style={{ backgroundColor: "tomato" }}
            onClick={() => {
              setCart([...cart, product]);
              localStorage.setItem(
                "cart",
                JSON.stringify([...cart, product])
              );
              toast.success("Item added successfully");
            }}
          >
            ADD TO CARD 🛒
          </button>
        </div>
      </div>
      <hr/>
      <div className="row container mt-4 mb-4">
        <h2>Similar Products</h2>
        {relatedProduct.length < 1 && <h4 className="text-center">No Similar Books Found😞</h4>}
        <div className="d-flex flex-wrap">
            {relatedProduct?.map((ele) => (
              <div className="card m-2" style={{ width: "18rem",borderRadius: "10px", }}>
                <img
                  src={`https://pear-worried-bonobo.cyclic.app/api/v1/product/product-photo/${ele._id}`}
                  className="card-img-top"
                  alt={ele.name}
                   style={{
                //     width: "20rem",
                //     display: "block",
                //     margin: "auto",
                //     marginTop: "10px",
                     borderRadius: "10px",
                //     border:"1px solid red"
                   }}
                />
                <div className="card-body">
                  <h5 className="card-title">{ele.name}</h5>
                  <p className="card-text">
                    {ele.description.substring(0, 35)}...
                  </p>
                  <p className="card-text">Price : ₹{ele.price}</p>
                  <p>Category : {product?.category?.name}</p> 
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
                      onClick={() => {
                        setCart([...cart, ele]);
                        localStorage.setItem(
                          "cart",
                          JSON.stringify([...cart, ele])
                        );
                        toast.success("Item added successfully");
                      }}
                    >
                      ADD TO CARD 🛒
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
      </div>
    </Layout>
  );
};

export default ProductDetails;
