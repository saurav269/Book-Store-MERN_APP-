// import React from 'react'
// 

// const ContactPage = () => {
//   return (
//    <Layout>
//     <h1>Contact Page</h1>
//    </Layout>
//   )
// }

// export default ContactPage


import React from "react";
import Layout from '../Components/Layout/Layout'
import CONTACT from '../assests/contact-us.jpg'
import { BiMailSend, BiPhoneCall, BiSupport } from "react-icons/bi";
const Contact = () => {
  return (
    <Layout title={"Contact Me -Book Store App"}>
      <div className="row contactus ">
        <div className="col-md-6 ">
          <img
            src={CONTACT}
            alt="contactus"
            style={{ width: "70%" }}
          />
        </div>
        <div className="col-md-4">
          <h1 className="cntH1">CONTACT ME</h1>
          <p className="text-justify mt-2">
            Any query and info about product feel free to call & contact with me anytime.
          </p>
          <p className="mt-3">
            <BiMailSend /> : sauravmallik786@gmail.com
          </p>
          <p className="mt-3">
            <BiPhoneCall /> : 8918705939 / 8670548700
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default Contact;
