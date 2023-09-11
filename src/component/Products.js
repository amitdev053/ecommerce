import React, { useEffect, useState } from "react";
import Loader from "./Loader";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from "react-toastify";
import ProductSlider from "./ProductSlider";
import ProductListView from "./ProductListView";


export default function Products() {
  const baseUrl = "https://fakestoreapi.com";
  const productsUrl = "/products";
  const cartUrl = "/carts";
  const [loader, setloader] = useState(true);
  const [allproduct, setAllProduct] = useState([]);
  const [SliderHeading, setSliderHeading] = useState("Choose Your Favourite");
  const [productView, setProductView] = useState(true)
 


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
  function addToCart(productName,productPrice,ProductImage,productid) {
    console.log("set Cart");
   let usercartarr = JSON.parse(localStorage.getItem("usercart") || "[]");
    let usercart = {    
      productName: productName,
      productImage: ProductImage,
      productPrice: productPrice,
      productid:productid,
      productQuanity: 1,
    };
    
      let pusharr =  usercartarr.push(usercart);
    console.log("pusharr", pusharr);

    localStorage.setItem("usercart", JSON.stringify(usercartarr));
    toast.success("Your cart is added");
  }

  useEffect(() => {
    getProducts(baseUrl, productsUrl);
  }, []);

 function  toggleView(){
 

  if(productView === true){
    setProductView(false)
    document.getElementById('listType').style.backgroundColor = "black"
    document.getElementById('listType').style.color = "white"
  }else{
    setProductView(true)
    document.getElementById('listType').style.backgroundColor = "#eee"
    document.getElementById('listType').style.color = "black"


  }
 

  
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
theme="dark"

/>
<div style={{display:"flex", justifyContent:"space-between", alignItems:"center", padding:"0px 10px 0px 0px"}}>
      <div
            style={{
              fontSize: "25px",
              fontWeight: "700",
              marginBottom: "20px",
            }}
          >
            Flash Products
          </div>
          <i className={`fa-solid fa-list-ul product_view_icon grid_view`} onClick={toggleView} id="listType"></i>
          </div>
         {
          (productView === true) ?           
          
              <>
              <div className="row">
            {/* Columns Started Here */}
            {allproduct.map((product) => {
              const formatter = new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
              });

              return (
                <div className="col-md-3 col-sm-12 gallerycol" key={product.id}>
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
                    <div className="gallerytitle productname productdiscripation" id="productname">
                      {product.description.slice(0, 100)}...
                    </div>
                    
                    <div class="p_btns mt-3">
                      <button
                        className="btn btn-sm btn-primary p_s_btn  mr-1 brand_button"
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
                        Cart

                        <i class="fa-solid fa-cart-plus icon_margin"></i>
                      </button>
                      <button className="btn btn-sm btn-primary p_s_btn brand_button ">
                        Save<i className="fa-solid fa-arrow-up-right-from-square icon_margin"></i>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
            {/* Columns End Upon the div Here */}
          </div>
          </>          
          :
          <ProductListView />
         
         }
        </div>
<ProductSlider heading={SliderHeading}/>


      </>
    );
  }
}
