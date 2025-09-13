import React, { useEffect, useState, useContext } from "react";
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
import { CartContext } from './CartContext';
import Hammer from 'hammerjs';
import LazyLoad from 'react-lazy-load';
import { handleShare, ShareButton } from "./HandleShare";
import "./Products.css"


export default function Products(props) {
  // const baseUrl = "https://fakestoreapi.com"; 
  const baseUrl = "https://mysticmoda.in/"; 
  
  // const productsUrl = "/products";
  const productsUrl = "/products.json";
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
  // const [isFavorite, setIsFavorite] = useState(false);
  const [favoriteIds, setFavoriteIds] = useState(() => {
  const stored = localStorage.getItem("userLike");
  return stored ? JSON.parse(stored).map(item => item.productid) : [];
});
   const [dynamicStyle, setDynamicStyle] = useState(true)
   const [changedPhoto, setChangedPhoto] = useState(false)
  
  function isProductFavorite(id) {
  return favoriteIds.includes(id);
}

function setupDynamicLikeIconsStyles(){
   let productLikeElements = document.querySelectorAll(".product_like")  
      if(dynamicStyle){
        Array.from(productLikeElements).forEach((element) => {
          // console.log("element like", element)
          element.style.background = '#f8f9fa'; // Change text color to blue
          element.style.padding = '8px 8px 6px 8px'; // Change font size to 18px
          element.style.borderRadius = '50%'; // Change font size to 18px
        
        });
      }else{
        Array.from(productLikeElements).forEach((element) => {
          element.style.removeProperty("background")
          element.style.removeProperty("padding")
          element.style.removeProperty("border-radius")
        
        });
      
      }
}
 
   useEffect(()=>{
      setupDynamicLikeIconsStyles() 
    
  })
 

 const handleImageLoad = () => {
  setImageLoaded(true);
  const img = document.getElementById('productimg');
  const icon = document.getElementById('productLike');

  if (img && icon) {
    // // console.log("use color theif", img.src)
    // colorThief.getColorFromUrl(img.src)
    // .then((color) => {
    //   // // console.log("color-theif-color", color)
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
    // // console.log("Product url",getProductsUrl)
    
    fetch(getProductsUrl)
      .then((response) => {
        
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
        // // console.log("response", response);
        return response.json();
      })
      .then((result) => {
        setloader(false);
        // // // console.log("products product.js", result);
        // // console.log("products product.js", result);
        if(props.componentFrom === "home"){
          // // console.log("routes run in home c")
          console.log("yes product fetch for home component", result)
          setAllProduct(result.products.splice(0, 8));
          
          }else{
            console.log("yes product fetch for products component", result)
        setAllProduct(result.products);
          }
      }).catch((error) => {
    setloader(true);
    console.error("Product fetching error:", error.message || error);
  });
   
  }    
  useEffect(() => {
    // document.title = "Market-Shops Best Product Market"
    // document.title = ""
    document.title = "BrowseNext — Products"
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
    // // console.log("set Cart");
   
   let usercartarr = JSON.parse(localStorage.getItem("userLike") || "[]");
   let usercart = {    
    productName: productName,
    productImage: ProductImage,
    productPrice: productPrice,
    productid:productid,
    productQuanity: initalCartQty,
  };
 
  let existingProduct = usercartarr.find((curElement)=>{
  return  productid === curElement.productid
  })
  // // console.log("existing product",existingProduct)


  if(existingProduct){
     // If the product is already in the favorites, remove it
     animateLikeHeaderIcon(true)
    //  setIsFavorite(false)
     setFavoriteIds(prev => prev.filter(id => id !== productid));
     usercartarr = usercartarr.filter((curElement) => curElement.productid !== productid);
     localStorage.setItem("userLike", JSON.stringify(usercartarr)); 
    toast.success("Product removed to the Favourite")
  }else{
  setAddTrackCart(true)
  // setIsFavorite(true)
  setFavoriteIds(prev => [...prev, productid]);
  animateLikeHeaderIcon()
  // // console.log("addtocart", usercart)

  let pusharr = usercartarr.push(usercart);
    setCartLength(pusharr)
    localStorage.setItem("userLike", JSON.stringify(usercartarr));       
    toast.success("Product saved to the  Favourite");
  }

    
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
  

 
 function productShare(productTitle, productDesc, productImage) {
  // // console.log("Attempting to share content:", productTitle, productDesc, productImage);

  handleShare(productTitle, productDesc, productImage, "product")

};


const handleZoomImage = ()=>{
  let images = document.querySelectorAll(".productImages")
 
  let currentScale = 1; // Store the current scale
  let pinchCenter = { x: 0, y: 0 }; // To track the center of pinch
  
  Array.from(images).forEach((image)=>{
    const hammer = new Hammer(image);

    hammer.get('pinch').set({ enable: true });
    
    // Set transform origin to the center of the image to keep zooming centered
    image.style.transformOrigin = 'center center';
    
    // When the pinch starts, capture the center point
    hammer.on('pinchstart', (event) => {
      pinchCenter = { x: event.center.x, y: event.center.y };
    });

    // Handle pinch zooming
    hammer.on('pinch', (event) => {
      // console.log("pinch event", event)
      const newScale = currentScale * event.scale;
      image.style.transform = `scale(${newScale})`; // Apply zoom
      image.style.transition = 'none'; // Disable smooth transitions during pinch
    });

    // When pinch ends, update the current scale
    hammer.on('pinchend', (event) => {
      currentScale *= event.scale; // Update the scale factor
      image.style.transition = 'transform 0.2s ease-out'; // Re-enable smooth transitions
    });
  

  })

}
function hoverOnImage(){
  let productRow = document.getElementById('ProductContainer')
  if(productRow){
   productRow.addEventListener('mouseover', (e) => {
    // console.log("mouse over ", e.target)
    const product = e.target.closest(".gallerycol")
    if (product) {
      setChangedPhoto(true)
      console.log('mouse over product');
    }
  });

   productRow.addEventListener('mouseout', (e) => {
    // console.log("mouse out ", e.target.closest(".gallerycol"))
    const product = e.target.closest(".gallerycol")
    if (product) {
setChangedPhoto(false)
      console.log('mouse out product');

    }
  });
  }
}
// useEffect(()=>{
//   handleZoomImage()
//   hoverOnImage()
// }, [])


function ProductImageComponent({product}){
  
  return (
    <LazyLoad height={250} offset={100}>
       <img src={product.image} id="productimg" className="productImages" alt="" onLoad={handleImageLoad} />
    </LazyLoad>
  )
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
      {/* <span id="cartLength">{cartLength}</span> */}
      
        <div  className={props.componentFrom === "home" ? 'container text-left app_container p-0' : 'container text-left mt-ps90 app_container padding_left_20'}>
      <Alert position="bottom-center"> </Alert>
{/* "app_product_headline app_new_productsetup" */}
<div  className={props.componentFrom === "home" ? 'app_product_headline' : 'app_product_headline app_new_productsetup'} style={props.componentFrom === "home" ? {margin: "0px auto 20px auto"} : {margin: ""}}>
          {(props.componentFrom === "home")  ?  (
 <div
            style={{
              fontSize: "25px",
              fontWeight: "700",
              margin: "0px",             
            }}
          >
            Flash Products
          </div>
          ): (
 <h1
            style={{
              fontSize: "25px",
              fontWeight: "700",
              margin: "0px",             
            }}
          >
            Flash Products
          </h1>
          )
          }
           <i className={`fa-solid fa-list-ul product_view_icon_mmda grid_view new_p_icon `} onClick={toggleView} id="listType"></i>
          
          </div>
         {
          (productView === true) ?           
          
              <>
              <div className="row" id="ProductContainer" style={props.componentFrom === "home" ? {margin: "0px auto"} : {margin: ""}}>
            {/* Columns Started Here */}
            {allproduct.map((product) => {
              const formatter = new Intl.NumberFormat("en-IN", {
                style: "currency",
                currency: "INR",
                minimumFractionDigits: 0,
                maximumFractionDigits: 0,

              });
              // // console.log("product map json", product.images)
              const favoriteProducts =  JSON.parse(localStorage.getItem("userLike") || "[]")
              const isFavorite = favoriteProducts.some((fav) => fav.productid === product.id);
              

              return (
                <div className="col-md-3 col-sm-12 gallerycol" key={product.id} >
                <div className="products_mmd_container">
                  <div className="galleryimg position-relative">
                   {/* <ProductImageComponent product={product} /> */}
                   <img src={!changedPhoto ? product.images[0].src : product.images[1].src} id="productimg" className="productImages" alt="" onLoad={handleImageLoad} />
                    <div id="productprice" className="productprice w-100" style={{opacity:isProductFavorite(product.id) ? "100%" : "0"}}>
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
                    </div>
                  </div>
                  <div className="mediacontent d-inline-block">
                    <p className="mb-1 totalgal">
                      Rating: {product?.rating?.rate || "4.0"}
                    </p>
                    <h4 className="gallerytitle productname" id="productname">
                      {product.title.slice(0, 37)}...
                    </h4>
                    <span className="gallerytitle productname productdiscripation" id="productname">
                      {/* {product.description.slice(0, 100)}... */}
                      {/* {product.body_html.slice(0, 100)}... */}

                        {product.body_html
    ? product.body_html.replace(/<[^>]+>/g, "").slice(0, 100) + "..."
    : ""}
                    </span>
         
                    
                    <div class="p_btns mt-3">
                      <button
                        className="btn btn-sm btn-primary p_s_btn  mr-1 brand_button"
                        onClick={() => {
                          clickToCart(
                            product.title,
                              product.variants[0].price,
                            product.images[0].src,
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
                      {/* <button className="btn btn-sm btn-primary p_s_btn brand_button " >
                        Share 
                        {/* <i class="fa-solid fa-share-nodes icon_margin"></i> 
                        <i class="fa-regular fa-share-from-square icon_margin"></i>
                        
                      </button> */}
                      <ShareButton  productTitle={product.title} productDesc={product.body_html} productImage={product.images[0].src}/>
                    </div>
                  </div>
                  </div>
                </div>
              );
            })}
            {/* Columns End Upon the div Here */}
          </div>
          </>          
          :
          <ProductListView  addToFavourite={addToFavourite} favoriteIds={favoriteIds} DynamicLikeStyles={setupDynamicLikeIconsStyles} isFavorite={isProductFavorite(allproduct.id)} componentFrom={props.componentFrom} />
         
         }
        </div>
{/* <ProductSlider heading={SliderHeading} class="d-flex flex-column"/> */}
      </>
    );
  }
}
