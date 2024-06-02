import React, { useEffect, useState } from "react";
import Loader from "./Loader";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from "react-toastify";
import ProductSlider from "./ProductSlider";
import ProductListView from "./ProductListView";
import { json } from "react-router-dom";
import Alert from "./Alert"
import { useLocation, useParams} from 'react-router-dom'

import 'react-toastify/dist/ReactToastify.css';
import { changeProdiuctView } from './CustomHook'



export default function Products() {
  const baseUrl = "https://fakestoreapi.com"; 
  // const baseUrl = "https://dummyjson.com"
  const productsUrl = "/products";
  const cartUrl = "/carts";
  const [loader, setloader] = useState(true);
  const [allproduct, setAllProduct] = useState([]);
  const location = useLocation();

  

  const [SliderHeading, setSliderHeading] = useState("Choose Your Favourite");
  const [productView, setProductView] = useState(true)
 const [cartLength, setCartLength] = useState(0)
 const [initalCartQty, setInitalCartQty] = useState(1)


  function getProducts(baseUrl, productsUrl) {
    const getProductsUrl = baseUrl + productsUrl;
    console.log("Product url",getProductsUrl)
    fetch(getProductsUrl)
      .then((response) => {
        setloader(false);
        console.log("response", response);
        return response.json();
      })
      .then((result) => {
        // console.log("products product.js", result);
        console.log("products product.js", result);
        setAllProduct(result);
      });
  }    
  useEffect(() => {
    getProducts(baseUrl, productsUrl);
  }, []);

  function addToCart(productName,productPrice,ProductImage,productid) {
    console.log("set Cart");
   let usercartarr = JSON.parse(localStorage.getItem("usercart") || "[]");
   let usercart = {    
    productName: productName,
    productImage: ProductImage,
    productPrice: productPrice,
    productid:productid,
    productQuanity: initalCartQty,
  };
 
console.log(usercartarr)
 
  let existingProduct = usercartarr.find((curElement)=>{
  return  productid === curElement.productid
  })
  console.log("existing product",existingProduct)


  if(existingProduct){
      let modifiedProducts = usercartarr.map((product) =>
      product.productid === existingProduct.productid
        ? { ...product, productQuanity: product.productQuanity + 1 }
        : product
    );

    console.log("modified products", modifiedProducts);

    setCartLength((prevLength) => prevLength + 1);
    localStorage.setItem("usercart", JSON.stringify(modifiedProducts));



}else{

  console.log("addtocart", usercart)

  let pusharr = usercartarr.push(usercart);
    setCartLength(pusharr)
    localStorage.setItem("usercart", JSON.stringify(usercartarr));       
 
  }



    document.getElementById('userCartContainer').classList.add('show_cart_container')
    toast.success("Your Product has been added !");
    document.body.style.overflowY = "hidden"
    
  }



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
      <span id="cartLength">{cartLength}</span>
        <div className="container text-left mt-74">
      <Alert position="bottom-center"> </Alert>

<div style={{display:"flex", justifyContent:"space-between", alignItems:"center",  marginBottom: "20px"}} className="app_product_headline">
      <div
            style={{
              fontSize: "25px",
              fontWeight: "700"
             
            }}
          >
            Flash Products
          </div>
          <i className={`fa-solid fa-list-ul product_view_icon grid_view`} onClick={toggleView} id="listType"></i>
          </div>
         {
          (productView === true) ?           
          
              <>
              <div className="row" id="ProductContainer">
            {/* Columns Started Here */}
            {allproduct.map((product) => {
              const formatter = new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
              });
              console.log("product map json", product.images)

              return (
                <div className="col-md-3 col-sm-12 gallerycol" key={product.id} >
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
<ProductSlider heading={SliderHeading} class="d-flex flex-column"/>
      </>
    );
  }
}

function setCart(){
  
    let cartitem = JSON.parse(localStorage.getItem("usercart") || "[]");
    
    return cartitem
}
export {setCart}