import React, { useEffect, useState } from "react";
import Layout from "../Components/Layout/Layout";
import { useAuth } from "../Context/AuthContext";
import { useCart } from "../Context/Cart";
import { useNavigate } from "react-router-dom";
import DropIn from "braintree-web-drop-in-react";
import axios from "axios";
import toast from "react-hot-toast";

const CartPage = () => {
  const [auth, setAuth] = useAuth();
  const [cart, setCart] = useCart();
  const [clientToken, setClientToken] = useState("");
  const [instance, setInstance] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  //FOR TOTAL PRICE CALCULATE
  const totalPrice = () => {
    try {
      let total = 0;
      cart?.map((item) => {
        total = total + item.price;
      });
      return total.toLocaleString("INR", {
        style: "currency",
        currency: "INR",
      });
    } catch (err) {
      console.log(err);
    }
  };

  //FOR DELETING ITEM;
  const removeCartItem = async (pid) => {
    try {
      let myCart = [...cart];
      let index = myCart.findIndex((item) => item._id === pid);
      myCart.splice(index, 1);
      setCart(myCart);
      localStorage.setItem("cart", JSON.stringify(myCart));
    } catch (err) {
      console.log(err);
    }
  };

  //GET PAYMENT GATEWAY TOKEN
  const getToken = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:5200/api/v1/product/braintree/token"
      );
      setClientToken(data?.clientToken);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getToken();
  }, [auth?.token]);

  //FOR HANDLING PAYMENT
  const handlePayment = async () => {
    try {
      setLoading(true);
      const { nonce } = await instance.requestPaymentMethod();
      const { data } = await axios.post(
        "http://localhost:5200/api/v1/product/braintree/payment",
        {
          nonce,
          cart,
        }
      );
      setLoading(false);
      localStorage.removeItem("cart");
      setCart([]);
      navigate("/dashboard/user/orders");
      toast.success("Payment Completed");
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
    console.log("Hello");
  };

  return (
    <Layout>
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <h1 className="text-center p-2 mb-1">
              {`Hello ${auth?.token && auth?.user?.name}`}
            </h1>
            <h4 className="text-center">
              {cart?.length
                ? `You Have ${cart.length} items in your cart ${
                    auth?.token ? "" : "Please login to checkout"
                  }`
                : "Your Cart is Empty"}
            </h4>
          </div>
        </div>
        <div className="row">
          <div className="col-md-7">
            <div className="row">
              {cart?.map((ele) => (
                <div className="row mb-2 p-3 card flex-row">
                  <div className="col-md-4 mt-2 mb-2">
                    <img
                      src={`http://localhost:5200/api/v1/product/product-photo/${ele._id}`}
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
                    <button
                      className="btn btn-danger"
                      onClick={() => removeCartItem(ele._id)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="col-md-4 text-center">
            <h2>Cart Summary</h2>
            <p>Total | Checkout | Payment</p>
            <hr />
            <h4>Total : {totalPrice()}</h4>
            {auth?.user?.address ? (
              <>
                <div className="mb-3">
                  <h4>Current Address</h4>
                  <h5>{auth?.user?.address}</h5>
                  <button
                    className="btn btn-outline-warning"
                    onClick={() => navigate("/dashboard/user/profile")}
                  >
                    Update Address
                  </button>
                </div>
              </>
            ) : (
              <div className="mb-3">
                {auth?.token ? (
                  <button
                    className="btn btn-outline-warning"
                    onClick={() => navigate("/dashboard/user/profile")}
                  >
                    Update Address
                  </button>
                ) : (
                  <button
                    className="btn btn-outline-warning"
                    onClick={() =>
                      navigate("/login", {
                        state: "/cart",
                      })
                    }
                  >
                    Please Login to Checkout
                  </button>
                )}
              </div>
            )}
            <div className="mt-2">
              {!clientToken || !cart?.length ? (
                ""
              ) : (
                <>
                  <DropIn
                    options={{
                      authorization: clientToken,
                      paypal: {
                        flow: "vault",
                      },
                    }}
                    onInstance={(instance) => setInstance(instance)}
                  />
                  <button
                    className="btn btn-primary"
                    onClick={handlePayment}
                    disabled={loading || !instance || !auth?.user?.address}
                  >
                    {loading ? "Processing......" : "Make Payment"}
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CartPage;
