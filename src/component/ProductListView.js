import React, { useEffect, useState, useContext } from "react";
import Loader from "./Loader";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from "react-toastify";
import ProductSlider from "./ProductSlider";
import { CartContext } from './CartContext';

export default function ProductListView({addToFavourite, isFavorite, componentFrom, favoriteIds, DynamicLikeStyles}) {
  // const baseUrl = "https://fakestoreapi.com";
  // const productsUrl = "/products";
  const baseUrl = "https://mysticmoda.in/";   
  // const productsUrl = "/products";
  const productsUrl = "/products.json";

  const cartUrl = "/carts";
  const [loader, setloader] = useState(true);
  const [allproduct, setAllProduct] = useState([]); 
  const [SliderHeading, setSliderHeading] = useState("Choose Your Favourite");
  const [cartLength, setCartLength] = useState(0)
  const { addToCart, toggleLike, likeItems } = useContext(CartContext);
 const [initalCartQty, setInitalCartQty] = useState(1)

 useEffect(()=>{
    DynamicLikeStyles()
 })

  function isProductFavorite(id) {
  // return favoriteIds.includes(id);
  return likeItems.some(item => item.productid === id);
}

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
        if(componentFrom === "home"){
          // console.log("routes run in home c")
          setAllProduct(result.products.splice(0, 8));
          
          }else{
        setAllProduct(result.products);
          }
      });
  }
  function UseCart(productName,productPrice,ProductImage,productid) {
    // console.log("set Cart");
   addToCart(productName, productPrice, ProductImage, productid)
  }

  useEffect(() => {
    getProducts(baseUrl, productsUrl);
    // let ProductListView = document.getElementsByClassName("mobile_list_view");
    // // if(Array.from(ProductListView).length > 0) {
    //   Array.from(ProductListView).forEach((element) => {
    //     if (element) {
    //       element.firstElementChild.style.height = element.offsetWidth + "px";

    //     }
    //   })

    // }
  }, []);
  
 
 const handleShare = async (productTitle, productDesc, productImage) => {
  // console.log("Attempting to share content:", productTitle, productDesc, productImage);

  if (navigator.canShare && navigator.canShare({ files: [new File([""], "test.jpg", { type: "image/jpeg" })] })) {
    try {
      const response = await fetch(productImage);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const blob = await response.blob();
      // console.log("Image fetched successfully, creating file...");

      const file = new File([blob], 'image.jpg', { type: 'image/jpeg' });
      // console.log("File created successfully:", file);
// console.log("Attempting to share content:",file, [file], URL.createObjectURL(file))
      await navigator.share({
        title: productTitle,
        text: productDesc,
        url: window.location.href,
        files: [file],
      });

      // console.log('Content shared successfully');
    } catch (error) {
      console.error('Error sharing content:', error);
    }
  } else {
    alert('Web Share API is not supported in your browser or the current device cannot share files.');
  }
};

  if (loader === true) {
    return (
      <>
        <Loader></Loader>
      </>
    );
  } else {
    return (
      <>
        <div className="container text-left mt-1 list_view_container" >
      
  <div className="row flex-column" id="ProductListView">
            {/* Columns Started Here */}
            {allproduct.map((product, i) => {
              const formatter = new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
              });

              return (
                <div className="col-12  gallerycol list_view_cols mobile_list_view " key={product.id+ i}>
                  <div className="galleryimg position-relative list_view_product_image">
                    <img src={product.images[0].src} id="productimg" alt="" />
                    <span id="productprice" className="productprice w-100" style={{opacity: isProductFavorite(product.id) ? "100%" : "0"}}>
                    <strong>  {formatter.format(product.variants[0].price)} </strong>

                      <i 
                      className={`fa-${isProductFavorite(product.id) ? 'solid' : 'regular'} fa-heart product_like`}
                      onClick={() => {
                          addToFavourite(
                             product.title,
                            product.variants[0].price,
                            product.images[0].src,
                            product.id
                          );
                        }}
                      ></i>
                    </span>
                  </div>
                  <div className="mediacontent d-inline-block list_view_detail_content">
                    
                    <h4 className="gallerytitle productname" id="productname">
                      {product.title}
                    </h4>
                    
                    <div className="gallerytitle productname productdiscripation" id="productname">
                      {/* {product.body_html} */}
                      {/* dangerouslySetInnerHTML={{ __html: product.body_html }} */}
                    {
  product.body_html
    ? (
        window.innerWidth < 768
          ? product.body_html.replace(/<[^>]+>/g, "").slice(0, 350) + "..."
          : product.body_html.replace(/<[^>]+>/g, "")
      )
    : ""
}
                    </div>
                    <p className="mt-1 totalgal">
                      Rating: {product?.rating?.rate || "4.0"}
                    </p>
                    
                    <div class="p_btns mt-3 list_view_action_button">
                      <button
                        className="btn btn-sm btn-primary p_s_btn  mr-1 brand_button"
                        onClick={() => {
                          UseCart(
                            product.title,
                            product.variants[0].price,
                            product.images[0].src,
                            product.id,
                            baseUrl,
                            cartUrl
                          );
                        }}
                      >
                        Cart

                        <i class="fa-solid fa-cart-plus icon_margin"></i>
                      </button>
                      <button className="btn btn-sm btn-primary p_s_btn brand_button " onClick={()=>{handleShare(product.title, product.body_html.slice(0, 100),  product.images[0].src)}}>
                      Share <i class="fa-solid fa-share-nodes icon_margin"></i>
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
