import React, { useEffect, useState } from "react";
import Loader from "./Loader";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";

export default function ProductSlider(props) {
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
        // console.log("response", response);
        return response.json();
      })
      .then((result) => {
        // console.log("products Result", result);
        setAllProduct(result);
      });
  }
  function addToCart(
    productName,
    productPrice,
    ProductImage,
    productid,
    baseUrl,
    cartUrl
  ) {
    // console.log("set Cart");
    let usercartarr = JSON.parse(localStorage.getItem("usercart") || "[]");
    let usercart = {
      productName: productName,
      productImage: ProductImage,
      productPrice: productPrice,
      productid: productid,
      productQuanity: 1,
    };

    let pusharr = usercartarr.push(usercart);
    // console.log("pusharr", pusharr);

    localStorage.setItem("usercart", JSON.stringify(usercartarr));
    // toast.success("Your cart is added");
  }

  useEffect(() => {
    getProducts(baseUrl, productsUrl);
  }, []);


  
   const nextProduct = ()=>{
// console.log("we are now going to the next prouct")
let productRow = document.getElementById('sliderrow')
// console.log("productRow", productRow.children)

   }
   const previousProduct = ()=>{
// console.log("we are now going to the next prouct")

    
   }

  if (loader === true) {
    return (
      <>
        <Loader></Loader>
      </>
    );
  } else {
    return (
      <>
        <div className={`container text-left my-5 ${props.class}`} id="ProductSlider">
       
       
          <div
            style={{
              fontSize: "25px",
              fontWeight: "700",
              marginBottom: "20px",
            }}
          >
            {props.heading}
          </div>

          <div className="row  setslider sliderrow " id="sliderrow">
            {/* Columns Started Here */}
            {allproduct.map((product) => {
              const formatter = new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
              });

              return (
                <div
                  className="col-md-3 col-sm-12 gallerycol slidercol"
                  id="gallerycolses"
                  key={product.id}
                >
                  <div className="galleryimg position-relative">
                    <img src={product.image} id="productimg" alt="" />
                    <span id="productprice" className="productprice">
                      {formatter.format(product.price)}
                    </span>
                  </div>
                  <div className="mediacontent d-inline-block">
                    <p className="mb-1 totalgal">
                      Rating: {product.rating.rate}
                    </p>
                    <h4 className="gallerytitle productname" id="productname">
                      {product.title.slice(0, 37)}...
                    </h4>
                    <div
                      className="gallerytitle productname productdiscripation"
                      id="productname"
                    >
                      {product.description.slice(0, 100)}...
                    </div>

                    <div class="p_btns mt-3">
                      <button
                        className="btn btn-sm btn-primary p_s_btn  mr-1 brand_button w-100 py-2"
                        onClick={() => {
                          addToCart(
                            product.title,
                            product.price,
                            product.image,
                            product.id,
                            baseUrl,
                            cartUrl
                          );
                        }}
                      >
                        Checkout
                        <i class="fa-solid fa-cart-plus icon_margin"></i>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
            {/* Columns End Upon the div Here */}
            {/* <div className="Slide_btn position-absolute">
              <i
                class="fa-solid fa-angle-left prev_btn"
                id="prevBtn"
                onClick={previousProduct}
              ></i>
              <i
                class="fa-solid fa-angle-right prev_btn coustom_padding"
                id="nextbtn"
                onClick={nextProduct}
              ></i>
            </div> */}
          </div>
        </div>
      </>
    );
  }
}
