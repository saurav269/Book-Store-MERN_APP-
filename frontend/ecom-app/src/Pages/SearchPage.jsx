import React from "react";
import Layout from "../Components/Layout/Layout";
import { useSearch } from "../Context/Search";

const SearchPage = () => {
  const [values, setValues] = useSearch();
  return (
    <Layout title={"Search Results"}>
      <div className="container">
        <div className="text-center">
          <h1>Search Results</h1>
          <h5>
            {values?.results.length < 1
              ? "No Books Found"
              : `Found ${values?.results.length}`}
          </h5>
          <div className="d-flex flex-wrap mt-4">
            {values?.results.map((ele) => (
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
                    <button className="btn btn-primary ms-1">
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
    </Layout>
  );
};

export default SearchPage;
