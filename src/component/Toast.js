import React from 'react'
import { ToastContainer, toast } from "react-toastify";

const Toast = (props) => {
  return (
    <ToastContainer
    position={props.position}
    autoClose={3000}
    hideProgressBar={false}
    newestOnTop={false}
    closeOnClick
    rtl={false}
    pauseOnFocusLoss
    draggable
    pauseOnHover
    theme="dark"
    
    />
  )
}

export default Toast