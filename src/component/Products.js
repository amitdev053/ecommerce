import React, { useEffect, useState, useContext } from "react";
import Loader from "./Loader";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from "react-toastify";
import ProductSlider from "./ProductSlider";
import ProductListView from "./ProductListView";
import { json } from "react-router-dom";
import Alert from "./Alert"
import { useLocation, useParams} from 'react-router-dom'
import ColorThief from 'color-thief-react';
import 'react-toastify/dist/ReactToastify.css';
import { changeProdiuctView } from './CustomHook'
import { CartContext } from './CartContext';


export default function Products() {
  const baseUrl = "https://fakestoreapi.com"; 
  // const baseUrl = "https://dummyjson.com"
  const productsUrl = "/products";
  const cartUrl = "/carts";
  const [loader, setloader] = useState(true);
  const [refreshCart, setRefreshCart] = useState(1)
  const [addTrackCart, setAddTrackCart] = useState(false)
  const [allproduct, setAllProduct] = useState([]);
  const location = useLocation();
  const [SliderHeading, setSliderHeading] = useState("Choose Your Favourite");
  const [productView, setProductView] = useState(true)
  const [cartLength, setCartLength] = useState(0)
  const [initalCartQty, setInitalCartQty] = useState(1)
  const [imageLoaded, setImageLoaded] = useState(false);
  const { addToCart } = useContext(CartContext);
  const [isFavorite, setIsFavorite] = useState(false);

 

 const handleImageLoad = () => {
  setImageLoaded(true);
  const img = document.getElementById('productimg');
  const icon = document.getElementById('productLike');

  if (img && icon) {
    console.log("use color theif", img.src)
    // colorThief.getColorFromUrl(img.src)
    // .then((color) => {
    //   console.log("color-theif-color", color)
    //   const isDark = color[0] < 128 && color[1] < 128 && color[2] < 128;
    //   icon.style.color = isDark ? 'white' : 'black';
    // })
    // .catch((error) => {
    //   console.error('ColorThief error:', error);
    // });
  }
}
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
    document.title = "Market-Shops Best Product Market"
    getProducts(baseUrl, productsUrl);
  }, []);
  function clickToCart(productName,productPrice,ProductImage,productid){
    addToCart(productName, productPrice, ProductImage, productid)
  }

  function animateLikeHeaderIcon(isAnimate = true){

    let appHeaderLikeIcon = document.querySelectorAll('.animate_like_icon')
    if(isAnimate){
      Array.from(appHeaderLikeIcon).forEach((headerLikeIcon)=>{
        headerLikeIcon.classList.add('like_header_animation')
        setTimeout(()=>{
          headerLikeIcon.classList.remove('like_header_animation')
        }, 3000) 

      })
    }else{
      if(document.querySelector('.like_header_animation')){
        // appHeaderLikeIcon.classList.remove('like_header_animation')
        Array.from(appHeaderLikeIcon).forEach((headerLikeIcon)=>{
          headerLikeIcon.classList.remove('like_header_animation')
  
        })
      }
      
    }
  
  }

  function addToFavourite(productName,productPrice,ProductImage,productid) {
    console.log("set Cart");
   
   let usercartarr = JSON.parse(localStorage.getItem("userLike") || "[]");
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
     // If the product is already in the favorites, remove it
     animateLikeHeaderIcon(false)
     setIsFavorite(false)
     usercartarr = usercartarr.filter((curElement) => curElement.productid !== productid);
     localStorage.setItem("userLike", JSON.stringify(usercartarr)); 
    toast.success("Product removed to the Favourite")
  }else{
  setAddTrackCart(true)
  setIsFavorite(true)
  animateLikeHeaderIcon()
  console.log("addtocart", usercart)

  let pusharr = usercartarr.push(usercart);
    setCartLength(pusharr)
    localStorage.setItem("userLike", JSON.stringify(usercartarr));       
    toast.success("Product saved to the  Favourite");
  }



    // document.getElementById('userLikeContainer').classList.add('show_cart_container')

    // document.body.style.overflowY = "hidden"
    
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
  

 
 const handleShare = async (productTitle, productDesc, productImage) => {
  console.log("Attempting to share content:", productTitle, productDesc, productImage);

  if (navigator.canShare && navigator.canShare({ files: [new File([""], "test.jpg", { type: "image/jpeg" })] })) {
    try {
      const response = await fetch(productImage);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const blob = await response.blob();
      console.log("Image fetched successfully, creating file...");

      const file = new File([blob], 'image.jpg', { type: 'image/jpeg' });
      console.log("File created successfully:", file);
console.log("Attempting to share content:",file, [file], URL.createObjectURL(file))
      await navigator.share({
        title: productTitle,
        text: productDesc,
        url: window.location.href,
        files: [file],
      });

      console.log('Content shared successfully');
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
              const favoriteProducts =  JSON.parse(localStorage.getItem("userLike") || "[]")
              const isFavorite = favoriteProducts.some((fav) => fav.productid === product.id);
              

              return (
                <div className="col-md-3 col-sm-12 gallerycol" key={product.id} >
                  <div className="galleryimg position-relative">
                    <img src={product.image} id="productimg" alt="" onLoad={handleImageLoad} />
                    <div id="productprice" className="productprice w-100" style={{opacity: isFavorite ? "100%" : "0"}}>
                 <strong>  {formatter.format(product.price)} </strong>
                     
                      <i
                       className={`fa-${isFavorite ? 'solid' : 'regular'} fa-heart product_like`}
                        onClick={() => {
                          addToFavourite(
                            product.title,
                            product.price,
                            product.image,
                            product.id
                          );
                        }}
                      
                      ></i>
                    </div>
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
                          clickToCart(
                            product.title,
                            product.price,
                            product.image,
                            product.id,
                            baseUrl,
                            cartUrl, 
                            addTrackCart
                          );
                        }}
                      >
                       Cart <i className="fa-solid fa-cart-plus icon_margin"></i>
                      {/* {(addTrackCart) ? `Already in cart` :  `Cart

<i class="fa-solid fa-cart-plus icon_margin"></i>`} */}
{/* {addTrackCart ? (
          <>
          Checkout <i class="fa-solid fa-arrow-right-from-bracket"></i>
        </>
      ) : (
        <>
          Cart <i className="fa-solid fa-cart-plus icon_margin"></i>
        </>
      )} */}
                       
                      </button>
                      <button className="btn btn-sm btn-primary p_s_btn brand_button " onClick={()=>{handleShare(product.title, product.description.slice(0, 100),  product.image )}}>
                        Share <i class="fa-solid fa-share-nodes icon_margin"></i>
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
{/* <ProductSlider heading={SliderHeading} class="d-flex flex-column"/> */}
      </>
    );
  }
}
