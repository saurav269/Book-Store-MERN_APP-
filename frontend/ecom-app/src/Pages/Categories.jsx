import React from "react";
import Layout from "../Components/Layout/Layout";
import useCategory from "../hooks/useCategory";
import { Link } from "react-router-dom";

const Categories = () => {
  const categories = useCategory();

  return (
    <Layout title={"All Categories"}>
      <h1>All Categories</h1>
      <div className="container">
        <div className="row">
          {categories.map((ele) => (
            <div className="col-md-3 mt-5 mb-3 gx-2 gy-2" key={ele._id}>
                <Link to={`/category/${ele.slug}`}>
                  <button className="btn btn-primary" style={{backgroundColor : 'tomato', border:'none', padding: "30px", fontSize:"20px" }}>
                  {ele.name}
                  </button>
                </Link>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Categories;
