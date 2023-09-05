import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import Loader from "./Loader";
import DialogBox from "./DialogBox";
import Toast from "./Toast"
import { ToastContainer, toast } from "react-toastify";



export default function Navbar() {
  const [userName, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loader, setloader] = useState(false);
  const [userCart, setUserCart] = useState([]);
  const [totalCart, setTotalCart] = useState(0);
  const [cartitems, setcartitems] = useState()
  const [cartitemsindex, setcartitemsindex] = useState()
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
    document
      .getElementById("userCartContainer")
      .classList.add("show_cart_container");

    document
      .getElementById("userCartContainer")
      .addEventListener("click", (event) => {
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
  const getUserCart = () => {
    let cartitem = JSON.parse(localStorage.getItem("usercart") || "[]");
    // //console.log("getUserCart",cartitem.length)
    setUserCart(cartitem);
    setTotalCart(cartitem.length);
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
              Navbar
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
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
                      url === "/media" ? "nav-link active" : "nav-link"
                    }`}
                    to="/media"
                    id="media"
                  >
                    Media
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
                </li>
              </ul>
              <div
                className="icon_area"
                onClick={(event) => {
                  openCart(event);
                }}
              >
                <i className="fa-solid fa-cart-shopping mr-1"></i>
                <span>Cart</span>
                <sup>{totalCart}</sup>
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
                  <h1>Your Cart is Empty</h1>
                  <i
                    class="fa-solid fa-xmark"
                    id="cartclosebtn"
                    onClick={() => {
                      closeCart();
                    }}
                  ></i>
                </div>
                <div className="col-12 dividecartitem">
                  <div className="row p-0 align-items-center">
                    {userCart.map((cartitem, index) => {
                      return (
                        <>
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "center",
                            }}
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
                              <div className="decrementqty_btn">-</div>
                              <span className="cartqty_number">1</span>
                              <div className="decrementqty_btn">+</div>
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

                    <div className="col-12 position-relative">
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
