import React, { useEffect, useState } from "react";
import AdminMenu from "./../../Components/Layout/AdminMenu";
import Layout from "../../Components/Layout/Layout";
import toast from "react-hot-toast";
import axios from "axios";
import { useAuth } from "../../Context/AuthContext";
import moment from "moment";
import { Select } from "antd";

const { Option } = Select;
const AdminOrders = () => {
  const [status, setStatus] = useState([
    "Not Process",
    "Processing",
    "Shipping",
    "Deliver",
    "Cancel",
  ]);
  const [changeStatus, setChangeStatus] = useState("");
  const [orders, setOrders] = useState([]);
  const [auth, setAuth] = useAuth();

  const getOrders = async () => {
    try {
      const { data } = await axios.get(
        "https://pear-worried-bonobo.cyclic.app/api/v1/auth/all-orders"
      );
      setOrders(data);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    if (auth?.token) getOrders();
  }, [auth?.token]);

  const handleChange = async (orderId, value) => {
    try {
      const { data } = await axios.put(
        `https://pear-worried-bonobo.cyclic.app/api/v1/auth/order-status/${orderId}`,
        {
          status: value,
        }
      );
      getOrders();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Layout title={"All Orders Data"}>
      <div className="row">
        <div className="col-md-3">
          <AdminMenu />
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
                      <td>
                        <Select
                          bordered={false}
                          onChange={(value) => handleChange(o._id, value)}
                          defaultValue={o?.status}
                        >
                          {status.map((s, i) => (
                            <Option key={i} value={s}>
                              {s}
                            </Option>
                          ))}
                        </Select>
                      </td>
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
    </Layout>
  );
};

export default AdminOrders;
