import React, { useEffect, useState } from "react";
import Loader from "./Loader";
import { useNavigate } from "react-router-dom";

import { Carousel } from "primereact/carousel";
import 'react-toastify/dist/ReactToastify.css';
//import Slider from "./Slider";
import getUserCartItem from "./Nav";
import { ToastContainer, toast } from "react-toastify";

export default function Products() {
  const baseUrl = "https://fakestoreapi.com";
  const productsUrl = "/products";
  const cartUrl = "/carts";
  const [loader, setloader] = useState(true);
  const [allproduct, setAllProduct] = useState([]);

  function getProducts(baseUrl, productsUrl) {
    const getProductsUrl = baseUrl + productsUrl;
    fetch(getProductsUrl)
      .then((response) => {
        setloader(false);
        console.log("response", response);
        return response.json();
      })
      .then((result) => {
        console.log("products Result", result);
        setAllProduct(result);
      });
  }
  function addToCart(
    productName,
    productPrice,
    ProductImage,
    baseUrl,
    cartUrl
  ) {
    console.log("set Cart");
    let usercartarr = JSON.parse(localStorage.getItem("usercart") || "[]");
    let usercart = {
      productName: productName,
      productImage: ProductImage,
      productPrice: productPrice,
      productQuanity: 1,
    };
    usercartarr.push(usercart);
    console.log(usercart);

    localStorage.setItem("usercart", JSON.stringify(usercartarr));
    toast.success("Your cart is added");
  }

  useEffect(() => {
    getProducts(baseUrl, productsUrl);
  }, []);
  if (loader == true) {
    return (
      <>
        <Loader></Loader>
      </>
    );
  } else {
    return (
      <>
        <div className="container text-left mt-74">
        <ToastContainer
position="top-right"
autoClose={3000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="light"
/>
          <div className="row">
            {/* Columns Started Here */}
            {allproduct.map((product) => {
              const formatter = new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
              });

              return (
                <div className="col-md-3 col-sm-12 gallerycol" key={product.id}>
                  <div className="galleryimg">
                    <img src={product.image} id="productimg" alt="" />
                  </div>
                  <div className="mediacontent d-inline-block">
                    <p className="mb-1 totalgal">
                      Rating: {product.rating.rate}
                    </p>
                    <h4 className="gallerytitle productname" id="productname">
                      {product.title.slice(0, 37)}...
                    </h4>
                    <span id="productprice">
                      {formatter.format(product.price)}
                    </span>
                    <br />
                    <div class="p_btns mt-2">
                      <button
                        className="btn btn-sm btn-primary p_s_btn  mr-1"
                        onClick={() => {
                          addToCart(
                            product.title,
                            product.price,
                            product.image,
                            baseUrl,
                            cartUrl
                          );
                        }}
                      >
                        Cart
                      </button>
                      <button className="btn btn-sm btn-primary p_s_btn ">
                        Product Detail
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
            {/* Columns End Upon the div Here */}
          </div>
        </div>

       
      </>
    );
  }
}
