import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import Loader from "./Loader";
import DialogBox from "./DialogBox";
import appLogoImage from '../appimages/images.png'
import EmptyCartImage from '../appimages/empty_cart.webp'
import Toast from "./Toast"
import { ToastContainer, toast } from "react-toastify";



export default function Navbar({trackCart}) {
  const [userName, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loader, setloader] = useState(false);
  const [userCart, setUserCart] = useState([]);
  const [totalCart, setTotalCart] = useState(0);
  const [cartitems, setcartitems] = useState()
  const [cartitemsindex, setcartitemsindex] = useState()
  const [cartQuantity, setCartQuantity] = useState(1)

  const [url, seturl] = useState("");
  const locations = useLocation();

  useEffect(() => {
    //console.log("This is a pathname", locations.pathname);
    seturl(locations.pathname);
  }, [locations]);

  // const [getuserCart, setgetuserCart] = useState([]);

  function closeCart() {
    document
      .getElementById("userCartContainer")
      .classList.remove("show_cart_container");
    document.body.style.overflowY = "visible"
      
  }
  function closeConfirmBox() {
    document
      .getElementById("confirmDialogBox")
      .classList.remove("dialog_container_fluid_show");
    document
      .getElementById("userCartContainer")
      .classList.add("show_cart_container");
  }
  function openCart(event) {
    document.getElementById("userCartContainer").classList.add("show_cart_container");
    document.body.style.overflowY = "hidden"

    document.getElementById("userCartContainer").addEventListener("click", (event) => {
        if (event.target === document.getElementById("userCartContainer")) {
          closeCart();

        } else {

        }
      });
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
//   const getUserCart = () => {
//     let cartitem = JSON.parse(localStorage.getItem("usercart") || "[]")
   
   

//     return cartitem 
//   };
//   const prevUserCartRef = useRef(userCart);

//  useEffect(() => {
//   console.log("useeffect ****", prevUserCartRef.current)
//   // setUserCart(cartitem);
//   // setTotalCart(cartitem.length);
//   const prevUserCart = prevUserCartRef.current;
//   const newCart = getUserCart();

//   // Update only if userCart has changed
//   if (prevUserCart !== newCart) {
//     setUserCart(newCart);
//     setTotalCart(newCart.length);
//     prevUserCartRef.current = newCart; // Update the previous userCart
//   }
 
  
//   }, [userCart]);

const getUserCart = () => {
  let cartitem = JSON.parse(localStorage.getItem("usercart") || "[]");
  setUserCart(cartitem);
  setTotalCart(cartitem.length);

  return cartitem;
};
useEffect(() => {  
   getUserCart();    
  
}, [userCart]); //userCart

  function clearCart() {
    document.getElementById("confirmDialogBox").classList.add("dialog_container_fluid_show")
    document.getElementById("confirmDialogBox").addEventListener("click", (event) => {
      if (event.target === document.getElementById("confirmDialogBox")) {
        closeConfirmBox();
      } else if (event.target === document.getElementById("yesDialogBtn")){

localStorage.clear()
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
navbarContent.addEventListener("click", (event)=>{

  if(event.target.id === "media" || event.target.id === "hastags" || event.target.id === "home" || event.target.id === "cartarea" || event.target.id === "cartText" || event.target.id === "carticon" || event.target.id === "cartcount" || event.target.id === "appBlogs" ){
    console.log("condition inside closeNavbar")
    document.getElementById('navbarSupportedContent').classList.remove('active_navbar')
  }

})



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
  
        <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top">
          <div className="container">
            <Link className="navbar-brand" to="/">
            <i class="fa-solid fa-shop"></i>
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
              onClick={(event)=> OpenMobileNavbar(event)}>
              <span className="navbar-toggler-icon"></span>
            </button>

            <div
              className="collapse navbar-collapse"
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
                      url === "/blogs" ? "nav-link active" : "nav-link"
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
              <div
                className="icon_area"
                onClick={(event) => {
                  openCart(event);
                }}
               id="cartarea">
                <i className="fa-solid fa-cart-shopping mr-1" id="carticon"></i>
                <span id="cartText">Cart</span>
                <sup id="cartcount">{totalCart}</sup>
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
              <div class="row cart_row w-100">
                <div className="cart_header">
                  <div style={{fontSize: "20px", fontWeight:700}}>Your Cart Products</div>
                  <i
                    class="fa-solid fa-xmark"
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

                    <div className="col-12 position-relative cart_seter">
                      <div className="cart_total cart_footer">
                        <div className="col-4 position-relative cart_set_fixed_width">
                          <div className="cart_button d-flex justify-space-between">
                            <div className="btn btn-primary cart_continue_btn">
                              Continue <i class="fa-solid fa-angle-right"></i>
                            </div>
                            <div
                              className="btn btn-danger cart_continue_btn"
                              onClick={clearCart}
                            >
                              Clear{" "}
                              <i class="fa-solid fa-trash-can-arrow-up"></i>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </cart>
    {/* <Toast position="bottom-center"/> */}
        <DialogBox />
      </>
    );
  }
}
