import React, { useEffect, useState } from "react";
import Layout from "./../../Components/Layout/Layout";
import UserMenu from "../../Components/Layout/UserMenu";
import axios from "axios";
import { useAuth } from "../../Context/AuthContext";
import moment from "moment";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [auth, setAuth] = useAuth();

  const getOrders = async () => {
    try {
      const { data } = await axios.get(
        "https://pear-worried-bonobo.cyclic.app/api/v1/auth/orders"
      );
      setOrders(data);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    if (auth?.token) getOrders();
  }, [auth?.token]);

  return (
    <Layout title={"Your Orders"}>
      <div className="container-flui p-3 m-3">
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>
          <div className="col-md-9">
            <h1 className="text-center">All Orders</h1>
            {orders?.map((o, i) => {
              return (
                <div className="border shadow">
                  <table className="table">
                    <thead>
                      <tr>
                        <th scope="col">#</th>
                        <th scope="col">Status</th>
                        <th scope="col">Buyer</th>
                        <th scope="col">Date</th>
                        <th scope="col">Payment</th>
                        <th scope="col">Quantity</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>{i + 1}</td>
                        <td>{o?.status}</td>
                        <td>{o?.buyer?.name}</td>
                        <td>{moment(o?.createdAt).fromNow()}</td>
                        <td>{o?.payment.success ? "Success" : "Failed"}</td>
                        <td>{o?.products?.length}</td>
                      </tr>
                    </tbody>
                  </table>
                  <div className="container">
                    {o?.products?.map((ele, i) => (
                      <div className="row mb-2 p-3 card flex-row" key={ele._id}>
                        <div className="col-md-4">
                          <img
                            src={`https://pear-worried-bonobo.cyclic.app/api/v1/product/product-photo/${ele._id}`}
                            className="card-img-top"
                            alt={ele.name}
                            width="100px"
                            height={"280px"}
                            // style={{
                            //   width: "20rem",
                            //   display: "block",
                            //   margin: "auto",
                            //   marginTop: "10px",
                            //   borderRadius: "10px",
                            // }}
                          />
                        </div>
                        <div
                          className="col-md-8 mt-2"
                          style={{ border: "0px solid red" }}
                        >
                          <h4>{ele.name}</h4>
                          <p>{ele.description.substring(0, 30)}...</p>
                          <p>Price : ₹{ele.price}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Orders;
