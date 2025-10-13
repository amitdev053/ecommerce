import React, { useEffect, useState, useRef, useContext, useLayoutEffect } from "react";
import { Link, useNavigate, useLocation, useMatch } from "react-router-dom";
import axios from "axios";
import Loader from "./Loader";
import DialogBox from "./DialogBox";
import appLogoImage from '../appimages/images.png'
import EmptyCartImage from '../appimages/empty_cart.webp'
import Toast from "./Toast"
import { ToastContainer, toast } from "react-toastify";
import { CartContext } from './CartContext';
import { handleShare, ShareButton } from "./HandleShare";
// import browseNextLogo from "./image/newbrowsenext.png"
import browseNextLogo from "./image/browsenextDirectv2.png"
import "./Nav.css"
import Tooltip from "./Tooltip";
import {  generateCaption } from "./GetImageColors";




export default function Navbar({savedImages, imageSavedStates , fetchSavedImages, setSavedImageState}) {
  const [userName, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loader, setloader] = useState(false);
  const [userCart, setUserCart] = useState([]);
  const [totalCart, setTotalCart] = useState(0);
  const [userLike, setUserLike] = useState([]);
  const [totalLike, setTotalLike] = useState(0);
  const [cartitems, setcartitems] = useState()
  const [cartitemsindex, setcartitemsindex] = useState()
  const [cartQuantity, setCartQuantity] = useState(1)
  const [cartProcess , setCartProcess] = useState(false)
  const [modelDetector, setModelDetector] = useState(false)       // detect the mobilebar menu
  const [detectCartModel, setCartModel] = useState(false)         // detect the cart model 
  const [detectLikeModel, setLikeModel] = useState(false)
   const exploreNextRoute = useMatch("/explore-next/:type/:imageTag");
   const exploreRoute = useMatch("/explore");


  function setRowItemCenter(){
    let productRow = document.getElementById('ProductContainer')
    if(productRow){
      productRow.style.justifyContent = "center"
    }
  }


  const [url, seturl] = useState("");
  const locations = useLocation();
  const navigate = useNavigate()

  const { addToCart, toggleLike, likeItems, cartLength } = useContext(CartContext);
  function handleResize(){
    if(document.querySelector('.cart_header')){
      document.querySelector('.cart_header').style.width = document.querySelector('.cart_container').offsetWidth +"px"

    }
  }

  useEffect(()=>{
    handleResize()
    window.addEventListener('resize', handleResize);
  }, [])
  

  useEffect(() => {
    //// // console.log("This is a pathname", locations.pathname);
    seturl(locations.pathname);
  }, [locations]);

  // const [getuserCart, setgetuserCart] = useState([]);
  function restoreScrollPosition(appBody){
    let userLikeContainer = document.getElementById('userLikeContainer')
    if(!userLikeContainer.classList.contains('show_like_container')){

    
        const scrollY = document.body.dataset.scrollY || 0;
          appBody.style.position = '';
            appBody.style.top = ``;
            appBody.style.left = '';
            appBody.style.right = '';
            appBody.style.bottom = '';
            appBody.style.removeProperty('position', 'fixed', 'important');  
        
          // Disable scroll-behavior temporarily to avoid visual scroll
          const html = document.documentElement;
          const originalScrollBehavior = html.style.scrollBehavior;
          html.style.scrollBehavior = 'auto';
          // console.log("scroll behaviour", originalScrollBehavior)
        // Instantly restore scroll position without animation
        window.scrollTo(0, parseInt(scrollY));

        // Restore scroll-behavior after restoring position
        html.style.scrollBehavior = originalScrollBehavior || 'auto';
    }
  }

  function removeNavabrIcon(){
  if(document.getElementById("navbarSupportedContent").classList.contains("active_navbar")){
   document.querySelector('.toggle_outline_elemenet').style.removeProperty("background")  
    document.querySelector('.toggle_outline_elemenet').firstElementChild.style.removeProperty("color")  
  }
}

  function closeCart(action = undefined) {
    
    if(action === undefined || action === "userCart"){
   
      let mobileCartIcon = document.getElementById('cartmobileicon')
      let cartCounter = document.getElementById('cartmobileicon').firstElementChild
      document.getElementById("userCartContainer").classList.remove("show_cart_container");    
      let appBody = document.getElementById("appbody")
  
      if(appBody && mobileCartIcon && mobileCartIcon.classList.contains("active_cart_bg") && cartCounter){            
          restoreScrollPosition(appBody)

        mobileCartIcon.classList.remove('active_cart_bg')
        cartCounter.style.color = "black"
        
      }
        // window.scrollTo(0, parseInt(scrollY));
      setCartModel(false)
    }
    else if (action === "userLike"){
      
      window.history.back()
        
      document.getElementById("userLikeContainer").classList.remove("show_like_container");    
      document.getElementById("containUserLikes").classList.remove("show_like_container");    
      let appBody = document.getElementById("appbody")
      if(appBody){            
        // appBody.style.removeProperty('position', 'fixed', 'important');   
        setRowItemCenter()
        restoreScrollPosition(appBody)
      }
      let appHeaderContainsLikeIcon = document.querySelectorAll('.app_navbar_like_containericon')
      if(document.getElementById("userLikeContainer").classList.contains("show_like_container")){
        Array.from(appHeaderContainsLikeIcon).forEach((likeicon)=>{
          likeicon.style.background = "black"
          likeicon.style.color = "white"
        })
      }else{
        Array.from(appHeaderContainsLikeIcon).forEach((hlikeicon)=>{

          // hlikeicon.style.background = "white"
          // hlikeicon.style.color = "black"
          hlikeicon.style.removeProperty("background")
          hlikeicon.style.removeProperty("color")
        })
      }
       if(detectCartModel){
          openCart()
          // setCartModel(true)
        }
    }
    // to open or close mobileNavbarMenu
      if(modelDetector){
      OpenMobileNavbar()
    }
    
      
  }
  function closeConfirmBox(CallingForOrder = false) {
    // console.log("closeConfirmBox")
    document.getElementById("confirmDialogBox")
      .classList.remove("dialog_container_fluid_show");

      // if(!document.getElementById("confirmOrderBox").hasAttribute("fromInfo")){
    document
      .getElementById("userCartContainer")
      .classList.add("show_cart_container");
      // }
      if(CallingForOrder){
        document
        .getElementById("confirmOrderBox")
        .classList.remove("dialog_container_fluid_show");
        // document.getElementById("confirmOrderBox").removeAttribute("fromInfo")
      }
  }
  function disableScroll(appBody){
    
        const scrollY = window.scrollY;
      document.body.dataset.scrollY = scrollY;

    // Lock scroll
    appBody.style.position = 'fixed';
    appBody.style.top = `-${scrollY}px`;
    appBody.style.left = '0';
    appBody.style.right = '0';
    appBody.style.bottom = '0';
    appBody.style.setProperty('position', 'fixed', 'important');
    appBody.style.overflowY = 'scroll !important';
  
  }
  function openCart(event) {
    removeNavabrIcon()
    if(detectLikeModel){
         document.getElementById("userLikeContainer").style.zIndex = "1 "
    }
    setCartModel(true)
if(document.getElementById('navbarSupportedContent') && document.getElementById('navbarSupportedContent').classList.contains('active_navbar')){
  document.getElementById('navbarSupportedContent').classList.remove('active_navbar')    
}


let appBody = document.getElementById("appbody")
if(appBody){      
  // // console.log("appbody", appBody, event.currentTarget)
  disableScroll(appBody)
  
  const cartSeter = document.querySelector('.cart_container');
  const setCartStyleElement = document.querySelector('.cart_total');
  if (window.innerWidth < 999) {
    document.getElementById("userCartContainer").classList.add("show_cart_container");
    // let cartHeight = cartSeter.clientHeight - (setCartStyleElement.offsetHeight + 190)
    // setCartStyleElement.style.top = `${cartHeight}px`
    // setCartStyleElement.style.height = "fit-content"
    //  // // console.log("mobile devices", cartHeight)

    // if(mobileCartIcon.classList.contains('active_cart_bg')){
    //   mobileCartIcon.classList.remove('active_cart_bg');
    //   cartCounter.style.color = "black";
    // }else{
    //   mobileCartIcon.classList.add('active_cart_bg');
    //   cartCounter.style.color = "white";
    // }

  }else{
    document.getElementById("userCartContainer").classList.add("show_cart_container");

  }
 
    
    }
    let mobileCartIcon = document.getElementById('cartmobileicon')
    let cartCounter = document.getElementById('cartmobileicon').firstElementChild

    mobileCartIcon.classList.add('active_cart_bg');
    cartCounter.style.color = "white";
    document.getElementById("userCartContainer").addEventListener("click", (event) => {
      if (event.target === document.getElementById("userCartContainer")) {        
        closeCart("userCart");
        }
      });
      
      
      
          // if(mobileCartIcon.classList.contains('active_cart_bg') && event.currentTarget.id === "cartmobileicon" ){
          //   closeCart("userCart");
          // }
        
        
    
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
  useEffect(()=>{
if(window.location.pathname === "/saved"){
  window.history.back()
  openLikes()
}
  }, [])

  function openLikes() {
    removeNavabrIcon()
    setLikeModel(true)
    // to close the UserCart First
    if(detectCartModel){
      closeCart("userCart")
      setCartModel(true)
    }
    if(document.getElementById('navbarSupportedContent') && document.getElementById('navbarSupportedContent').classList.contains('active_navbar')){
      document.getElementById('navbarSupportedContent').classList.remove('active_navbar')    
    }

    let mobileLikeIcon = document.querySelector('.mobile_like_icon')
    if(mobileLikeIcon){
      mobileLikeIcon.classList.add('fs-14')
      setTimeout(()=>{
        mobileLikeIcon.classList.remove('fs-14')
        
      }, 100)
    }
    animateLikeHeaderIcon(false)
       
    if (window.location.pathname !== "/saved") {
  window.history.pushState({ path: "/saved" }, '', "/saved");
}
    // window.history.pushState({ path: "/saved" }, '', "/saved");
    document.getElementById("userLikeContainer").classList.toggle("show_like_container");
    document.getElementById("containUserLikes").classList.toggle("show_like_container");

    
    let appBody = document.getElementById("appbody")
    let appHeaderContainsLikeIcon = document.querySelectorAll('.app_navbar_like_containericon')
    let navbarHLikeIcon = document.getElementById('appLikeDIcon')
    if(document.getElementById("userLikeContainer").classList.contains("show_like_container") && appBody){
      // console.log("opening cart ")
      navbarHLikeIcon.classList.replace("fa-regular", "fa-solid")
      Array.from(appHeaderContainsLikeIcon).forEach((likeicon)=>{
        
        // likeicon.style.background = "black"
        // likeicon.style.color = "white"
        likeicon.style.setProperty("background", "black", "important")
        likeicon.style.setProperty("color", "white", "important")
        // appBody.style.setProperty('position', 'fixed', 'important');        
      })

      disableScroll(appBody)
    }
    else{   
      closeCart("userLike")
    if(detectCartModel){
      openCart()
      // setCartModel(true)
    }

    }
    
    document.getElementById("userLikeContainer").addEventListener("click", (event) => {
        if (event.target === document.getElementById("userLikeContainer")) {
          // closeCart("userLike");
          // animateContainers('containUserLikes')
          let closeLikeIcon = document.getElementById('closeLikeModelIcon')
          // closeLikeIcon.classList.add('blinking_aninmation')
          closeLikeIcon.style.setProperty("background", "red")
          setTimeout(()=>{
            
            closeLikeIcon.style.removeProperty("background", "red")
            
          }, 300)


        } 
      });

    
  }

  function animateContainers(element){
    let sacleElement = document.getElementById(element)
    sacleElement.classList.add('animate_container')
    setTimeout(()=>{
      sacleElement.classList.remove('animate_container')
    }, 3200)
    sacleElement.addEventListener('mouseover', ((e)=>{
      sacleElement.classList.remove('animate_container')

    }))
  }
 


const getUserCart = () => {
  let cartitem = JSON.parse(localStorage.getItem("usercart") || "[]");
  
  // setUserCart(cartitem);
  // setTotalCart(cartitem.length);

  return cartitem;
};
// useEffect(() => {  
//    getUserCart();    
//   console.log("checking cart context", addToCart)
// }, []); //userCart 
useEffect(() => {
  const cart = getUserCart();
  setUserCart(cart);
  setTotalCart(cartLength);
  console.log("checking cart context", addToCart);
}, [addToCart]);

const getUserLikes = () => {
  let likeItems = JSON.parse(localStorage.getItem("userLike") || "[]");
  // setUserLike(likeItems);
  // setTotalLike(likeItems.length);

  return likeItems;
};
useEffect(() => {  
   const likesProducts = getUserLikes();   
     setUserLike(likesProducts);
     console.log("likeProdcuts", likesProducts)
  setTotalLike(likesProducts.length); 
  
}, [toggleLike]); 


  function clearCart() {
    // console.log("close cart")
   
    document.getElementById("confirmDialogBox").classList.add("dialog_container_fluid_show")
    document.getElementById("confirmDialogBox").addEventListener("click", (event) => {
      if (event.target === document.getElementById("confirmDialogBox")) {
        closeConfirmBox();
      } else if (event.target === document.getElementById("yesDialogBtn")){

// localStorage.clear()
localStorage.removeItem("usercart")
closeConfirmBox();
closeCart()
// toast.success("Your cart has been cleared");
      }
      else if (event.target === document.getElementById("noDialogBtn")){

       
        closeConfirmBox();
       
        // toast.success("Your cart has been cleared");
       }       
      else {
      }
    });
    // clearUserCart()
  }

  function getOrders() {

    
    document.getElementById("confirmOrderBox").classList.add("dialog_container_fluid_show")
    document.getElementById("confirmOrderBox").addEventListener("click", (event) => {
      if(event.target === document.getElementById("okOrder")){
            setCartProcess(true)
    setTimeout(()=>{
      setCartProcess(false)
        closeConfirmBox(true);
        }, 1500)
      }

    })
  
 
  }

  const deleteCart = (cartitemid, index)=>{
    console.log("deleteCart", index, cartitemid)
    let cartitem = JSON.parse(localStorage.getItem("usercart") || "[]");
// // console.log("remainingcartitenm", cartitem)

let deletecartitem = delete(cartitem[index])
// // console.log(deletecartitem)

  const remainingitem =  cartitem.filter((localStorageitems) => {   
  return  localStorageitems !== index    
   })
   // // console.log("remainingitem", remainingitem)
    setUserCart(remainingitem)
    setTotalCart(remainingitem.length)
  // localStorage.setItem('usercart',JSON.stringify(remainingitem));

  }
function quantityDecrement(event, cartitem){
 
if(cartitem.productQuanity === 1){
  setCartQuantity(1)

}else{
  setCartQuantity(cartitem.productQuanity--)
  
}

updateCartItemQuantity(cartitem.productid,cartitem.productQuanity)
  
}
function updateCartItemQuantity(productId, newQuantity) {
  // Retrieve cart items from localStorage
  let cartItems = JSON.parse(localStorage.getItem("usercart")) || [];

  
  const index = cartItems.findIndex(item => item.productid === productId);

  if (index !== -1) {
    // Update the quantity of the product
    cartItems[index].productQuanity = newQuantity;

    // Save the updated cart items back to localStorage
    localStorage.setItem("usercart", JSON.stringify(cartItems));
  }
}
function quantityIncrement(event, cartitem){
  // // console.log(cartitem)
  setCartQuantity(cartitem.productQuanity++) 
  updateCartItemQuantity(cartitem.productid,cartitem.productQuanity)
  

}

function OpenMobileNavbar(event){
  //  // to close the UserCart First
  //   if(detectCartModel){
  //     closeCart("userCart")
  //     setCartModel(true)
  //   }
  let navbarContent = document.getElementById('navbarSupportedContent')
  navbarContent.classList.toggle('active_navbar')
let navbarIcon = document.querySelector('.toggle_outline_elemenet')

// // console.log("navbarIcon", navbarIcon)
navbarIcon.firstElementChild.style.setProperty('color', 'white', "important");
navbarIcon.style.setProperty('background', 'black', "important");
navbarIcon.firstElementChild.style.setProperty('font-size', "13px")
setTimeout(()=>{
  // navbarIcon.style.removeProperty('background', '#eee');
  navbarIcon.firstElementChild.style.removeProperty('font-size', "14px")
  

}, 100)
setModelDetector(true)
// console.log("navbar hit", navbarIcon)

navbarContent.addEventListener("click", (event)=>{

  if(event.target.id === "media" || event.target.id === "hastags" || event.target.id === "home" || event.target.id === "cartarea" || event.target.id === "cartText" || event.target.id === "carticon" || event.target.id === "cartcount" || event.target.id === "appBlogs" || event.target.id === "appexplore" || event.target.id === "appToolBar" || event.target.id === "navbarSupportedContent" ){
    // // console.log("condition inside closeNavbar")
    document.getElementById('navbarSupportedContent').classList.remove('active_navbar')  
    navbarIcon.style.removeProperty("background")  
    navbarIcon.firstElementChild.style.removeProperty("color")  
    setModelDetector(false)
  }
 

})
if(!document.getElementById("navbarSupportedContent").classList.contains("active_navbar")){
   document.querySelector('.toggle_outline_elemenet').style.removeProperty("background")  
    document.querySelector('.toggle_outline_elemenet').firstElementChild.style.removeProperty("color")  
    setModelDetector(false)
}



}

function hitCartinProducts(productName,productPrice,ProductImage,productid){
  // // console.log("hit cart from navbar.js", productName, productPrice, ProductImage, productid)
 addToCart(productName,productPrice,ProductImage,productid)
  
}
function RouteToLikeProducts(){
  // // console.log("Route Link Products")
  closeCart("userLike")
  navigate("/products")
}

function saveShare (productTitle, productDesc, productImage) {
  // // console.log("Attempting to share content:", productTitle, productDesc, productImage);
  handleShare(productTitle, productDesc, productImage)

//   if (navigator.canShare && navigator.canShare({ files: [new File([""], "test.jpg", { type: "image/jpeg" })] })) {
//     try {
//       const response = await fetch(productImage);
//       if (!response.ok) {
//         throw new Error('Network response was not ok');
//       }
//       const blob = await response.blob();
//       // // console.log("Image fetched successfully, creating file...");

//       const file = new File([blob], 'image.jpg', { type: 'image/jpeg' });
//       // // console.log("File created successfully:", file);
// // // console.log("Attempting to share content:",file, [file], URL.createObjectURL(file))
//       await navigator.share({
//         title: productTitle,
//         text: productDesc,
//         url: window.location.href,
//         files: [file],
//       });

//       // // console.log('Content shared successfully');
//     } catch (error) {
//       console.error('Error sharing content:', error);
//     }
//   } else {
//     alert('Web Share API is not supported in your browser or the current device cannot share files.');
//   }
};


function moveToCloseCart(){
  let startX = 0;
let endX = 0;






let userCart = document.getElementById('userCartContainer')
userCart.addEventListener('touchstart', (e) => {
  startX = e.touches[0].clientX;  
});

userCart.addEventListener('touchend', (e) => {
  endX = e.changedTouches[0].clientX;  
  if (startX <= 100 && endX > 0) {
    // // // console.log("right side movement")
    if(!e.target.classList.contains('decrementqty_btn'))
    closeCart(undefined)
  } else if (endX < startX) {
    // // // console.log('Left side movement');
  }
  // // console.log("startX and endX", startX, endX)

});

}
useEffect(()=>{
  moveToCloseCart()
  // const likeBtn = document.getElementById("AppHeaderLike");
  const mobileHeaderBtns = document.querySelectorAll(".mobile_cart");

  if (mobileHeaderBtns) {
mobileHeaderBtns.forEach((likeBtn)=>{
  likeBtn.addEventListener("touchstart", startShowingFeedBack);
  likeBtn.addEventListener("touchend", endShowingFeedBack);
  likeBtn.addEventListener("touchmove", moveShowingFeedBack);

})
  }

  // 🔑 Cleanup to avoid multiple bindings
  return () => {
    if (mobileHeaderBtns) {
    // if (likeBtn) {
    mobileHeaderBtns.forEach((likeBtn)=>{
      likeBtn.removeEventListener("touchstart", startShowingFeedBack);
      likeBtn.removeEventListener("touchend", endShowingFeedBack);
      likeBtn.removeEventListener("touchmove", moveShowingFeedBack);
    })
  
    }
  };
}, [])

const  startShowingFeedBack = (e)=>{
  
  let clickedElement = e.currentTarget
  // console.log("like Start Showing feedBack", clickedElement)
if(clickedElement){

  clickedElement.classList.add('mobile_feedback')
} 


}
function moveShowingFeedBack(e){

   let clickedElement = e.currentTarget 
  // console.log("like move Showing feedBack", clickedElement)
  if(clickedElement){

    clickedElement.classList.remove('mobile_feedback')
  }
}
function endShowingFeedBack(e){
 let clickedElement = e.currentTarget 
  // console.log("like end Showing feedBack", clickedElement)
  if(clickedElement){

    clickedElement.classList.remove('mobile_feedback')
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
  
        <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top p-0 adjust_padding">
          <div className="container navbar_container app_container p-0">
            <Link className={url !== "/blogs" && url !== "/explore" ? `navbar-brand navbar-brand-conditionally` : "navbar-brand"} to="/">
            {/* <i className="fa-solid fa-shop app_nav_logo"></i> */}
            <i class="fa-solid fa-location-arrow app_nav_logo"></i>
            {/* <img src={browseNextLogo} className="img-fluid"/> */}
            </Link>
            <div className="mobile_header_action_icon">
            <div className="app_navbar_like_containericon mobile_cart" id="AppHeaderLike"  onClick={(event) => {openLikes(event)}}>            
              <i className="fa-solid fa-heart animate_like_icon mobile_like_icon mob_like"  id="appLikeIcon"></i>            
            </div>
            <div className="icon_area position-relative mobile_cart" id="cartmobileicon" style={(exploreNextRoute || exploreRoute) && {padding : "0px 16px"}}  onClick={(event) => {openCart(event)}}>
            {exploreRoute || exploreNextRoute ?  
            <>
              <i class="fa-solid fa-bookmark" style={{marginRight: "0px"}}></i>
            </>

            :
            <>

              <i className="fa-solid fa-cart-shopping mobile_like_icon "  id="carticon"></i>
              <sup className="cart_mobile_position cartmobileicon">{totalCart}</sup>

            </>
            
            }
            </div>
    {/* <div className="icon_area" onClick={(event) => {openCart(event)}} id="cartarea">
                <i className="fa-solid fa-cart-shopping mr-1" id="carticon"></i>
                <span id="cartText">Cart</span>
                <sup id="cartcount">{totalCart}</sup>
              </div> */}
            <button
              className="toggle_outline_elemenet mobile_cart"
              type="button"
              data-toggle="collapse"
              data-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
              onClick={(event)=> OpenMobileNavbar(event)}>
              {/* <span className="navbar-toggler-icon"></span> */}
              <i className="fa-solid fa-bars navbar_toggle_icon"></i>
            </button>
            </div>

            <div
              className="collapse navbar-collapse app_header_main_content"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav mr-auto navul">
                <li className="nav-item">
                  <Link
                    className={`${
                      url === "/" ? "nav-link active" : "nav-link"
                    }`}
                    to="/"
                    id="home"
                  >
                    Home
                  </Link>
                </li>
                {/* <li className="nav-item">
                  <Link
                    className={`${
                      url === "/Hastags" ? "nav-link active" : "nav-link"
                    }`}
                    to="/Hastags"
                    id="hastags"
                  >
                    Hastags
                  </Link>
                </li> */}
               
                <li className="nav-item">
                  <Link
                    className={`${
                      url === "/products" ? "nav-link active" : "nav-link"
                    }`}
                    to="/products"
                    id="media"
                  >
                    Products
                  </Link>
                </li>

                 <li className="nav-item">
                  <Link
                    className={`${
                      url === "/explore" ? "nav-link active" : "nav-link"
                    }`}
                    to="/explore"
                    id="appexplore"
                  >
                    Explore
                  </Link>
                </li>

                <li className="nav-item">
                  <Link
                    className={`${
                      url === "/blogs" || url === "/blogs/suggest" || url === "/blogs/search" ? "nav-link active" : "nav-link"
                    }`}
                    to="/blogs"
                    id="appBlogs"
                  >
                    Blogs
                  </Link>
                </li>               

                <li className="nav-item">
                  <Link
                    className={`${
                      url === "/tools" ? "nav-link active" : "nav-link"
                    }`}
                    to="/tools"
                    id="appToolBar"
                  >
                    Tools
                  </Link>
                </li>

                {/* <li className="nav-item">
                  <Link
                    className={`${
                      url === "/services" ? "nav-link active" : "nav-link"
                    }`}
                    to="/services"
                    id="appToolBar"
                  >
                    Services
                  </Link>
                </li> */}

                {/* <li className="nav-item">
                  <Link className="nav-link " to="/contact" id="contact">
                    Contact
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link " to="/services" id="service">
                    Services
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link " to="/download" id="service">
                    Download
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link " to="/login" id="service">
                    Login
                  </Link>
                </li> */}
              </ul>
              <div className="contains_likes_carts d-flex">
              {/* <Tooltip text="Saved Products" position="bottom"> */}
              {/* {
                !exploreRoute &&  */}

                <>
 <div className="app_navbar_like_containericon hide_in_mobile_devices desktop_feedback" id="AppHeaderLike"  onClick={(event) => {openLikes(event)}} >
              <i className="fa-solid fa-heart animate_like_icon"  id="appLikeDIcon"></i>
              </div>
                </>
              {/* } */}
        
              {/* </Tooltip> */}

              <div className="icon_area hide_in_mobile_devices" style={{padding: "9px 15px", marginLeft: "5px"}} onClick={(event) => {openCart(event)}} id="cartarea">
              {exploreRoute || exploreNextRoute ?  
              <>
                <i class="fa-solid fa-bookmark"></i>
                <span id="cartText">Saved</span>
              </>
              :
<>
  <i className="fa-solid fa-cart-shopping mr-1" id="carticon"></i>
                <span id="cartText">Cart</span>
               {(userCart.length !== 0 ) && (<sup id="cartcount">{totalCart}</sup>)} 
</>
              
              }
                
              </div>

              </div>

            </div>
          </div>
        </nav>

        <cart>
          <div
            className="container-fluid cart_container_fluid"
            id="userCartContainer"
          >
            <div className="container cart_container" style={{overflowX : "hidden"}}>
            {exploreRoute || exploreNextRoute ?
            <div className="row cart_row w-100 saved_rows">
             <div className="cart_header">
                  <div style={{fontSize: "20px", fontWeight:700}}>Saved Photos</div>
                  <i
                    className="fa-solid fa-xmark"
                    id="cartclosebtn"
                    onClick={() => {
                      closeCart();
                    }}
                  ></i>
                </div>
                <SavedImages 
                setSavedImageState={setSavedImageState}
                 savedImages={savedImages}
        imageSavedStates={imageSavedStates}
                fetchSavedImages={fetchSavedImages} 

                />

            </div>

            :
            <>
              <div className="row cart_row w-100">
                <div className="cart_header">
                  <div style={{fontSize: "20px", fontWeight:700}}>Your Cart Products</div>
                  <i
                    className="fa-solid fa-xmark"
                    id="cartclosebtn"
                    onClick={() => {
                      closeCart();
                    }}
                  ></i>
                </div>
                <div className={(userCart.length === 0 ) ? "col-12 mt-ps100" : "col-12 dividecartitem"} style={{paddingBottom: "40px"}}>
                  <div className="row p-0 align-items-center">
                  {userCart.length <= 0 ? 
                (
                  <>
                 <div className="empty_cart_container">
                  <span style={{color: "black", fontWeight: 700, fontSize: "25px"}}>Your cart is empty</span>
                  <img src={EmptyCartImage} alt="empty_cart" width="100%"/>
                  <span className="productdiscripation gallerytitle ">Ready to Shop? Your Cart is Empty</span>
                  <Link to={(locations.pathname === "/" ? "/" : "/products")} style={{textDecoration:"none"}}>
                  <span className="brand_button" style={{color: "white", width: "fit-content", padding: "10px 40px 14px 40px", cursor: "pointer"}} onClick={() => {
                      closeCart();
                    }}>Explore Now</span>
                  </Link>

                 </div>
                 </>
                 )
                 
                  : userCart.map((cartitem, index) => {
                      return (
                        <>
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "center",
                            }}
                            key={cartitem.id}
                          >
                            <div className="col-4 d-flex align-items-center">
                              <img
                                src={cartitem.productImage}
                                className="user_cart_img"
                                alt=""
                              />
                            </div>
                            <div className="col-8">
                              <div className="cartitemname">
                                <div className="cartitemname">
                                  {cartitem.productName.slice(0, 20)}...
                                </div>
                                <div className="cartitemprice">
                                  Item price: ${cartitem.productPrice}
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="cart_action_button my-2 cart_divide">
                            <div className="cart_action_qty_button cart_action_button set_width">
                              <div className="decrementqty_btn" onClick={(event)=>quantityDecrement(event, cartitem)}>-</div>
                              <span className="cartqty_number" >{cartitem.productQuanity}</span>
                              <div className="decrementqty_btn" onClick={(event)=>quantityIncrement(event, cartitem)}>+</div>
                            </div>
                            <i
                              className="fa-solid fa-trash"
                              style={{ cursor: "pointer" }}
                              onClick={() => {
                                deleteCart(cartitem.productid, index);
                              }}
                            ></i>
                          </div>
                        </>
                      );
                    })}                    

                   {(userCart.length > 0) && <div className="col-12 position-relative cart_seter">
                      <div className="cart_total cart_footer">
                        <div className="col-4 position-relative cart_set_fixed_width">
                          <div className="cart_button d-flex justify-space-between">
                            <div className="btn btn-primary cart_continue_btn position-relative" onClick={getOrders}>
                          {/* {(cartProcess) ? <div className="cart_continue_loader" /> : <> Continue <i className="fa-solid fa-angle-right"></i> </>  } */}
                          Continue <i className="fa-solid fa-angle-right"></i>
                            </div>
                            <div
                              className="btn btn-danger cart_continue_btn"
                              onClick={clearCart}
                            >
                              Clear
                              <i className="fa-solid fa-trash-can-arrow-up"></i>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>}
                  </div>
                </div>
              </div>
            </>
            
            }
              

            </div>
          </div>
        </cart>
        <like>
          <div
            className="container-fluid cart_container_fluid like_container_fluid"
            id="userLikeContainer"
          >
           <div className="container dialog_row like_inside_container" id="containUserLikes">
                  <div className="row">
                  <div className="col-12 user_like_header" 
                  style={{
              fontSize: "20px",
              fontWeight: "700",
              display: "flex",
              justifyContent : "space-between",
              alignItems: "center",
              padding: "10px",             
            }}
                  >
                      Liked Products

                      <i
                    className="fa-solid fa-xmark app_cross_icon"
                    id="closeLikeModelIcon"
                    onClick={() => {
                      closeCart("userLike");
                    }}
                  ></i>
                  </div>
               
           <div className="user_likes_columns">
           {userLike.length <= 0 ? 
            (
              <>
             
              <div className="empty_like_container" onClick={()=>{ RouteToLikeProducts()}}>
              <span className="text-center" style={{color: "black", fontWeight: 700, fontSize: "25px"}}>Your Collection empty now !</span>
              <img src={EmptyCartImage} alt="empty_cart" width="70%"/>
             
              <span className="productdiscripation gallerytitle text-center"> Add products to your favourite list <br/> that will appear here.</span>
              <span className="brand_button" style={{color: "white", width: "fit-content", padding: "10px 40px 14px 40px", cursor: "pointer"}} onClick={() => {
                  closeCart();
                }}>Add Now</span>
              
              </div>
              
              </>
              )
            
            :userLike.map((likeItems, i)=>{
              return(
                <>
  
   
     {/* first Columns ------------ */}
     
   <div  className="col-md-3 col-sm-12 gallerycol user_favourite_items">
                  <div className="galleryimg user_favourite_image position-relative">
                    <img src={likeItems.ProductImage} id="productimg" alt=""  />                  
                  </div>
                  <div className="mediacontent d-inline-block">
                    <h4 className="gallerytitle productname" id="productname">
                      {(likeItems.productName.length > 25) ? likeItems.productName.substring(0, 25) + "..." : likeItems.productName}
                    </h4>
                   
                    
                    <div class="p_btns mt-3">
                      <button
                        className="btn btn-sm btn-primary p_s_btn  mr-1 brand_button"
                        onClick={() => {
                          hitCartinProducts(
                            likeItems.productName,
                            likeItems.productPrice,
                            likeItems.productImage,
                            likeItems.productid,
                          );
                        }}
                      >
                       Cart <i className="fa-solid fa-cart-plus icon_margin"></i>
                       
                      </button>
                    
                      <ShareButton  productTitle={likeItems.productName} productDesc={likeItems.description} productImage={likeItems.image} />
                    </div>
                  </div>
           </div>
           {/* first Columns End  ------------ */}
          



                </>
              )
             })}
           </div>
               
                  
      
                  </div>

           </div>
         
          </div>
        </like>
    {/* <Toast position="bottom-center"/> */}
        <DialogBox cartProcess={cartProcess} />
      </>
    );
  }
}

function SavedImages({savedImages, imageSavedStates , fetchSavedImages, setSavedImageState}){
  
  // useEffect(()=>{
  //     if (savedImages.length > 0) {
  //   fetchImages();
  // }
  // }, [savedImages])

//   useEffect(() => {
    
// fetchImages();

    
    
//   }, []);

useLayoutEffect(()=>{
  fetchSavedImages()
}, [])
  function downloadSavedImage(event, imageUrl){

      const urlParts = imageUrl.split(".");
  console.log("imageurl", imageUrl)
  const extension = urlParts[urlParts.length - 1].split("?")[0]; 


     const img = new Image();
      img.crossOrigin = "anonymous"; // try CORS
      img.src = imageUrl;
    
      img.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0);
        canvas.toBlob((blob) => {
          const url = URL.createObjectURL(blob);
          const link = document.createElement("a");
          link.href = url;
          link.download = "BrowseNext" + `.${extension}`;
          link.click();
          URL.revokeObjectURL(url);
          // toast.success("Image download successful.");
          toast.success("Image downloaded");
        });
      };
    
      img.onerror = () => {
        toast.error("Sorry... image could'nt downloaded now... try again later");
      };
  }

  return(
     <div  className={`container pinterest-layout saved_container`} >
 
      {savedImages.map((image, index) => {
        if (!imageSavedStates[index]) return null; 
        const { loaded } = imageSavedStates[index];
        
        const location = window.location.href.split("/")
        const imageTagText = location[location.length - 1]

         let firstTag = image.tags.split(",")[0]?.trim().toLowerCase();
  let secondTag = image.tags.split(",")[1]?.trim().toLowerCase();

  // check if last URL segment matches the first tag
  let useSecond = imageTagText === firstTag;

  let targetTag = (useSecond ? secondTag : firstTag)?.replace(/\s+/g, "-");
        
{/* // console.log("image colors", image.imageColor) */}
           {/* onClick={() => updateInteractionScore(image._category, 2)} key={image.id} */}
          
        return (
          <div
          
            className={"column position-relative explore_image"}
            key={image.id}
            style={{
              backgroundColor: image.imageColor, // ✅ Correct location
              // width: image.webformatWidth,
              "--image-color": image.imageColor,
              // height: image.webformatHeight
            }}
            // onClick={(event)=> exploreSimilarImages(event, image)}
          >
            <Link
              class="explore_image_link"
              to={`/explore-next/${image.type}/${targetTag}`}
              state={{ imageData: image }}
              onClick={(e) => {
                e.stopPropagation();
                //  handleImageClick(image, index)
              }}
            >
              {/* <div
                className="image-wrapper"
                style={{
                  width: "100%",
                  aspectRatio: `${image.webformatWidth} / ${image.webformatHeight}`,
                  overflow: "hidden",
                  position: "relative",
                  height: "100%",
                }}
              >
                <img
                  className="explore-image"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    display: "block",
                  }}
                  src={image.largeImageURL}
                  srcSet={`
    ${image.largeImageURL} 150w,
    ${image.largeImageURL} 640w,
    ${image.largeImageURL} 1280w
  `}
                  sizes="(max-width: 600px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  loading="lazy"
                  onContextMenu={(e) => {
                    if (window.innerWidth < 576) {
                      e.preventDefault();
                    }
                  }}
                  onLoad={(e) => {
                    // handle cached + freshly loaded images
                    setSavedImageState((prev) => {
                      const newState = [...prev];
                      newState[index] = { loaded: true };
                      return newState;
                    });
                  }}
                  // onError={(e) =>{
                  // const originalUrl = image.webformatURL;
                  // e.target.src = originalUrl;
                  // e.target.srcset = `
                  //   ${image.previewURL} 150w,
                  //   ${image.webformatURL} 640w,
                  //   ${image.largeImageURL} 1280w
                  // `;
                  //         //  e.target.style.display = "none";
                  //           }}

                  alt={generateCaption(image)}
                />

                {!imageSavedStates[index]?.loaded && (
                  <div className="skeleton" />
                )}
              </div> */}

<div className="image-wrapper" style={{
  width: '100%',
  aspectRatio: `${image.webformatWidth} / ${image.webformatHeight}`,
  overflow: 'hidden',
  position: 'relative',
  height: "100%"
}}>
  {/* Low-res blurred placeholder */}
  <img
    src={image.previewURL} // small/low-res image
    style={{
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      filter: 'blur(20px)',
      position: 'absolute',
      top: 0,
      left: 0,
      transition: 'opacity 0.5s ease',
      opacity: imageSavedStates[index]?.loaded ? 0 : 1
    }}
    alt={generateCaption(image)}
  />

  {/* Full-resolution image */}
  <img
    className="explore-image"
    src={image.largeImageURL}
    style={{
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      display: 'block',
      transition: 'opacity 0.5s ease',
      opacity: imageSavedStates[index]?.loaded ? 1 : 0
    }}
    onLoad={() => {
      setSavedImageState(prev => {
        const newState = [...prev];
        newState[index] = { loaded: true };
        return newState;
      });
    }}
    alt={generateCaption(image)}
  />
</div>

            </Link>
            {/* {!loaded && <div className="app_loader" />} */}

            <div
              className="explore_icons position-absolute "
              onClick={(e) => e.stopPropagation()}
            >
              <div className="explore_like_content d-flex align-items-center">
                <i className="fa-solid fa-heart"></i>
                <span className="explore_fonts mx-1">{image.likes}</span>
              </div>
              <div className="explore_like_content d-flex align-items-center">
                <i class="fa-regular fa-eye"></i>
                <span className="explore_fonts mx-1">{image.views}</span>
              </div>
              <div className="explore_like_content d-flex align-items-center">
                <i class="fa-solid fa-download"></i>
                <span className="explore_fonts mx-1">{image.downloads}</span>
              </div>
            </div>

            {/* <div className="explore_like_content d-flex align-items-center position-absolute explore_images_share adjust_right"
            //  onTouchStart={sendClickFeed} onTouchEnd={(event)=>{removeClickFeed(event, image.webformatURL)}}onMouseUp={(event)=> {removeClickFeed(event, image.webformatURL)} } onMouseDown={sendClickFeed} onMouseOut={orignalElement} 

             onClick={(event) => {
      event.stopPropagation();
      event.preventDefault();
      removeClickFeed(event, image.webformatURL, "share", image.id);
    }}
    onMouseDown={(event) => {
      event.stopPropagation();
      event.preventDefault();
      sendClickFeed(event);
    }}
    onTouchStart={(event) => {
      event.stopPropagation();
      event.preventDefault();
      sendClickFeed(event);
    }}
    onTouchEnd={(event) => {
      event.stopPropagation();
      event.preventDefault();
      removeClickFeed(event, image.webformatURL, "share", image.id);
    }}
    onMouseOut={orignalElement}

          
                >
            <i class="fa-solid fa-share explore_image_share_icon"></i>
            
            </div>     */}

            <div
              className="explore_like_content d-flex align-items-center position-absolute explore_images_share"
              //          onClick={(event) => {
              //   event.stopPropagation();
              //   event.preventDefault();
              //   removeClickFeed(event, image, "option", image.id);
              // }}
              // onMouseDown={(event) => {
              //   event.stopPropagation();
              //   event.preventDefault();
              //   sendClickFeed(event);
              // }}
              // onTouchStart={(event) => {
              //   event.stopPropagation();
              //   event.preventDefault();
              //   sendClickFeed(event);
              // }}
              // onTouchEnd={(event) => {
              //   event.stopPropagation();
              //   event.preventDefault();
              //   removeClickFeed(event, image, "option", image.id);
              // }}
              // onMouseOut={orignalElement}

              onClick={(e) => {
                downloadSavedImage(e, image.largeImageURL);
              }}
            >
              <i class="fa-solid fa-download explore_image_share_icon"></i>
            </div>
          </div>
        );
          {/* </Link> */}
      })}
    {/* {props.componentFrom === "home" ? <ExploreLinkButton /> : null} */}
    </div>
  )

}
