import React, { useEffect, useState, useRef, useContext } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import Loader from "./Loader";
import DialogBox from "./DialogBox";
import appLogoImage from '../appimages/images.png'
import EmptyCartImage from '../appimages/empty_cart.webp'
import Toast from "./Toast"
import { ToastContainer, toast } from "react-toastify";
import { CartContext } from './CartContext';




export default function Navbar({trackCart}) {
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


  const [url, seturl] = useState("");
  const locations = useLocation();
  const navigate = useNavigate()

  const { addToCart } = useContext(CartContext);
  
  

  useEffect(() => {
    //console.log("This is a pathname", locations.pathname);
    seturl(locations.pathname);
  }, [locations]);

  // const [getuserCart, setgetuserCart] = useState([]);

  function closeCart(action = undefined) {
    if(action === undefined){

      document.getElementById("userCartContainer").classList.remove("show_cart_container");    
      let appBody = document.getElementById("appbody")
      if(appBody){            
        appBody.style.removeProperty('position', 'fixed', 'important');   
      }
    }else if(action === "userCart"){
      
      document.getElementById("userCartContainer").classList.remove("show_cart_container");    
      let appBody = document.getElementById("appbody")
      if(appBody){            
        appBody.style.removeProperty('position', 'fixed', 'important');   
      }
    }else if (action === "userLike"){
      
      window.history.back()
        
      document.getElementById("userLikeContainer").classList.remove("show_like_container");    
      document.getElementById("containUserLikes").classList.remove("show_like_container");    
      let appBody = document.getElementById("appbody")
      if(appBody){            
        appBody.style.removeProperty('position', 'fixed', 'important');   
      }
      let appHeaderContainsLikeIcon = document.querySelectorAll('.app_navbar_like_containericon')
      if(document.getElementById("userLikeContainer").classList.contains("show_like_container")){
        Array.from(appHeaderContainsLikeIcon).forEach((likeicon)=>{
          likeicon.style.background = "black"
          likeicon.style.color = "white"
        })
      }else{
        Array.from(appHeaderContainsLikeIcon).forEach((hlikeicon)=>{

          hlikeicon.style.background = "white"
          hlikeicon.style.color = "black"
        })
      }
    }
      
  }
  function closeConfirmBox(CallingForOrder = false) {
    document
      .getElementById("confirmDialogBox")
      .classList.remove("dialog_container_fluid_show");
    document
      .getElementById("userCartContainer")
      .classList.add("show_cart_container");

      if(CallingForOrder){
        document
        .getElementById("confirmOrderBox")
        .classList.remove("dialog_container_fluid_show");
      }
  }
  function openCart(event) {
    
    document.getElementById("userCartContainer").classList.add("show_cart_container");
    let appBody = document.getElementById("appbody")
    if(appBody){      
      console.log("appbody", appBody)
      appBody.style.setProperty('position', 'fixed', 'important');
    
    }

    document.getElementById("userCartContainer").addEventListener("click", (event) => {
        if (event.target === document.getElementById("userCartContainer")) {
          closeCart("userCart");

        } else {

        }
      });
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
    let mobileLikeIcon = document.querySelector('.mobile_like_icon')
    if(mobileLikeIcon){
      mobileLikeIcon.classList.add('fs-14')
      setTimeout(()=>{
        mobileLikeIcon.classList.remove('fs-14')
        
      }, 100)
    }
    animateLikeHeaderIcon(false)
       
    window.history.pushState({ path: "/saved" }, '', "/saved");
    document.getElementById("userLikeContainer").classList.toggle("show_like_container");
    document.getElementById("containUserLikes").classList.toggle("show_like_container");
    let appBody = document.getElementById("appbody")
    let appHeaderContainsLikeIcon = document.querySelectorAll('.app_navbar_like_containericon')
    let navbarHLikeIcon = document.getElementById('appLikeDIcon')
    if(document.getElementById("userLikeContainer").classList.contains("show_like_container") && appBody){
      navbarHLikeIcon.classList.replace("fa-regular", "fa-solid")
      Array.from(appHeaderContainsLikeIcon).forEach((likeicon)=>{
        
        likeicon.style.background = "black"
        likeicon.style.color = "white"
        appBody.style.setProperty('position', 'fixed', 'important');
        
      })
    }else{
      navbarHLikeIcon.classList.replace("fa-solid", "fa-regular")
    
      Array.from(appHeaderContainsLikeIcon).forEach((likeicon)=>{

        likeicon.style.background = "white"
        likeicon.style.color = "black"
        appBody.style.removeProperty('position', 'fixed', 'important');  
        window.history.back()
      })
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


        } else {

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
  function loginAuth(event) {
    setloader(true);

    event.preventDefault();
    let login = {
      username: userName,
      password: password,
    };

    axios
      .post("https://backend.babusiya.com/account/verify_user", login)
      .then((response) => setloader(false));
  }


const getUserCart = () => {
  let cartitem = JSON.parse(localStorage.getItem("usercart") || "[]");
  setUserCart(cartitem);
  setTotalCart(cartitem.length);

  return cartitem;
};
useEffect(() => {  
   getUserCart();    
  
}, [userCart]); //userCart

const getUserLikes = () => {
  let likeItems = JSON.parse(localStorage.getItem("userLike") || "[]");
  setUserLike(likeItems);
  setTotalLike(likeItems.length);

  return likeItems;
};
useEffect(() => {  
   getUserLikes();    
  
}, [userLike]); //userCart

  function clearCart() {
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
    
    let cartitem = JSON.parse(localStorage.getItem("usercart") || "[]");
console.log("remainingcartitenm", cartitem)

let deletecartitem = delete(cartitem[index])
console.log(deletecartitem)

  const remainingitem =  cartitem.filter((localStorageitems) => {   
  return  localStorageitems !== index    
   })
   console.log("remainingitem", remainingitem)
// setUserCart(remainingitem)
  localStorage.setItem('usercart',JSON.stringify(remainingitem));

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
  console.log(cartitem)
  setCartQuantity(cartitem.productQuanity++) 
  updateCartItemQuantity(cartitem.productid,cartitem.productQuanity)
  

}

function OpenMobileNavbar(event){
  let navbarContent = document.getElementById('navbarSupportedContent')
  navbarContent.classList.toggle('active_navbar')
let navbarIcon = document.querySelector('.toggle_outline_elemenet')

console.log("navbarIcon", navbarIcon)
navbarIcon.style.setProperty('background', '#eee');
navbarIcon.firstElementChild.style.setProperty('font-size', "14px")
setTimeout(()=>{
  navbarIcon.style.removeProperty('background', '#eee');
  navbarIcon.firstElementChild.style.removeProperty('font-size', "14px")
  

}, 100)



navbarContent.addEventListener("click", (event)=>{

  if(event.target.id === "media" || event.target.id === "hastags" || event.target.id === "home" || event.target.id === "cartarea" || event.target.id === "cartText" || event.target.id === "carticon" || event.target.id === "cartcount" || event.target.id === "appBlogs" || event.target.id === "navbarSupportedContent"){
    console.log("condition inside closeNavbar")
    document.getElementById('navbarSupportedContent').classList.remove('active_navbar')    
  }

})



}

function hitCartinProducts(productName,productPrice,ProductImage,productid){
  console.log("hit cart from navbar.js", productName, productPrice, ProductImage, productid)
 addToCart(productName,productPrice,ProductImage,productid)
  
}
function RouteToLikeProducts(){
  console.log("Route Link Products")
  closeCart("userLike")
  navigate("/products")
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
    // console.log("right side movement")
    closeCart(undefined)
  } else if (endX < startX) {
    // console.log('Left side movement');
  }
  console.log("startX and endX", startX, endX)
});
}
useEffect(()=>{
  moveToCloseCart()
}, [])
  
  if (loader === true) {
    return (
      <>
        <Loader></Loader>
      </>
    );
  } else {
    return (
      <>
  
        <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top">
          <div className="container">
            <Link className="navbar-brand" to="/">
            <i className="fa-solid fa-shop app_nav_logo"></i>
            </Link>
            <div className="mobile_header_action_icon">
            <div className="app_navbar_like_containericon" id="AppHeaderLike"  onClick={(event) => {openLikes(event)}}>
              <i className="fa-solid fa-heart animate_like_icon mobile_like_icon"  id="appLikeIcon"></i>
            </div>

            <button
              className="toggle_outline_elemenet"
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
                <li className="nav-item">
                  <Link
                    className={`${
                      url === "/Hastags" ? "nav-link active" : "nav-link"
                    }`}
                    to="/Hastags"
                    id="hastags"
                  >
                    Hastags
                  </Link>
                </li>
               
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
                      url === "/blogs" || url === "/blogs/suggest" || url === "/blogs/search" ? "nav-link active" : "nav-link"
                    }`}
                    to="/blogs"
                    id="appBlogs"
                  >
                    Blogs
                  </Link>
                </li>

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
              <div className="app_navbar_like_containericon hide_in_mobile_devices" id="AppHeaderLike"  onClick={(event) => {openLikes(event)}}>
              <i className="fa-regular fa-heart animate_like_icon"  id="appLikeDIcon"></i>
              </div>

              <div className="icon_area" onClick={(event) => {openCart(event)}} id="cartarea">
                <i className="fa-solid fa-cart-shopping mr-1" id="carticon"></i>
                <span id="cartText">Cart</span>
                <sup id="cartcount">{totalCart}</sup>
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
            <div className="container cart_container">
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
                <div className={(userCart.length === 0 ) ? "col-12 mt-ps100" : "col-12 dividecartitem"}>
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
                      Your Liked Products

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
                    <img src={likeItems.productImage} id="productimg" alt=""  />                  
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
                      <button className="btn btn-sm btn-primary p_s_btn brand_button " onClick={()=>{handleShare(likeItems.title, likeItems.description,  likeItems.image )}}>
                        Share <i class="fa-solid fa-share-nodes icon_margin"></i>
                      </button>
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
