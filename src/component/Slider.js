import React, { useEffect, useState } from "react";

const Slider = () => {
    const baseUrl = "https://fakestoreapi.com";
    const productsUrl = "/products";
    const cartUrl = "/carts";
  
    const [allproduct, setAllProduct] = useState([]);
  
    function getProducts(baseUrl, productsUrl) {
      const getProductsUrl = baseUrl + productsUrl;
      fetch(getProductsUrl)
        .then((response) => {
          // console.log("response", response);
          return response.json();
        })
        .then((result) => {
          // console.log("products Result", result);
          setAllProduct(result);
        });
    }
    function addToCart(baseUrl, cartUrl) {
      // console.log("set Cart");
      const cartapi = baseUrl + cartUrl;
    }
  
    
    useEffect(() => {
      getProducts(baseUrl, productsUrl);
    }, []);
  return (
   <>
     <div class="slider-container contrainer-fluid">
        <div class="cards-slider" id="card-slider">
        {allproduct.map((product) => {
            return(
            <div class="card">
                <img src={product.image} alt="Product 1" />
                <div class="card-info">
                    <h3>Product 1</h3>
                    <p>Description of product 1</p>
                </div>
            </div>
            )
        })
        }
         
        </div>
        <button id="prev-btn"><i class="fa-solid fa-angle-left"></i></button>
        <button id="next-btn"><i class="fa-solid fa-angle-right"></i></button>
    </div>
   </>
  )
}

export default Slider
