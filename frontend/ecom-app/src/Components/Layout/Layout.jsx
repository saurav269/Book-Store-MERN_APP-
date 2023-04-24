import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import { Helmet } from "react-helmet";
import { Toaster } from 'react-hot-toast';
// import { ToastContainer } from 'react-toastify';


const Layout = ({ children,title,description,keywords,author }) => {
  return (
    <div>
      <Helmet>
        <meta charSet="utf-8" />
          <meta name='description' content={description} />
          <meta name='keyword' content={keywords} />
          <meta name='author' content={author} />
        <title>{title}</title>
      </Helmet>
      <Header />
      <main style={{ minHeight: "70vh" }}>
        <Toaster/>
        {/* <ToastContainer /> */}
        {children}
        </main>
      <Footer />
    </div>
  );
};
Layout.defaultProps = {
  title : "Book Collection App",
  description : "Full Stack App",
  keywords : "React, express,node, mongoDb",
  author : 'Saurav'
}

export default Layout;
