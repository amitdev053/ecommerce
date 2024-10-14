import React, { createContext, useState } from 'react';
import { toast } from 'react-toastify';
// Create a Context for the cart
export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  // State to hold the cart items
  const [cartItems, setCartItems] = useState(JSON.parse(localStorage.getItem('usercart') || '[]'));
  const [cartLength, setCartLength] = useState(cartItems.length);
  const [addTrackCart, setAddTrackCart] = useState(false);

  // Function to add items to the cart
  const addToCart = (productName, productPrice, ProductImage, productid) => {
    console.log("set Cart");

    let initalCartQty = 1;
    
    
    let usercartarr = JSON.parse(localStorage.getItem("usercart") || "[]")
    let usercart = {
      productName: productName,
      productImage: ProductImage,
      productPrice: productPrice,
      productid: productid,
      productQuanity: initalCartQty,
    };

    let existingProduct = usercartarr.find((curElement) => curElement.productid === productid);
    console.log("existing product", existingProduct);

    if (existingProduct) {
      let modifiedProducts = usercartarr.map((product) =>
        product.productid === existingProduct.productid
          ? { ...product, productQuanity: product.productQuanity + 1 }
          : product
      );

      console.log("modified products", modifiedProducts);

      setCartItems(modifiedProducts);
      setCartLength(modifiedProducts.length);
      localStorage.setItem("usercart", JSON.stringify(modifiedProducts));
      setAddTrackCart(true);
    } else {
      console.log("addtocart", usercart);
      usercartarr.push(usercart);
      setCartItems(usercartarr);
      setCartLength(usercartarr.length);
      localStorage.setItem("usercart", JSON.stringify(usercartarr));
      setAddTrackCart(true);
    }

    // Show the cart and prevent scrolling on the page
    document.getElementById("userCartContainer").classList.add("show_cart_container");
    toast.success("Your Product has been added!");

    // Disable page scroll
    document.body.style.overflowY = "hidden";
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        cartLength,
        addToCart,
        addTrackCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
