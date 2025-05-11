import React, { useState } from 'react'

const DialogBox = ({cartProcess}) => {
    // console.log("cartProcess", cartProcess)
 
  return (
  
    <>
    
    <div className="container-fluid dialog_container_fluid" id="confirmDialogBox">
        <div className="row dialog_row">
            <div className="col-12 dilaog_col">
            <div className="dialog_heading">Are You Sure Want To Delete?</div>
            <div className="dialog_action_btn d-flex align-items-center">
            <button className="btn btn-sm btn-primary" id="yesDialogBtn">Yes</button>
            <button className="btn btn-sm btn-danger" id="noDialogBtn">No</button>

            </div>
            </div>
        </div>
    </div>

    <div className="container-fluid dialog_container_fluid" id="confirmOrderBox">
        <div className="row dialog_row">
            <div className="col-12 dilaog_col text-center">
      <div className="dialog_heading">Stay Tuned</div>
            <div className="gallerytitle productname productdiscripation" id="productname">
               We will take the orders as soon as possible...
            </div>
            <div className="dialog_action_btn d-flex align-items-center justify-content-center">
            {/* {(cartProcess) ? <div className="cart_continue_loader" /> : <> <button className="btn btn-sm btn-primary app_order_button  position-relative" id="okOrder">OK</button> </>  } */}
            <button className="btn btn-sm btn-primary app_order_button position-relative" style={{ color: cartProcess ? "black" : "white" }} id="okOrder">{(cartProcess) ?  <div className="cart_continue_loader" /> : "OK"}</button>

            </div>
          
            </div>
        </div>
    </div>


    </>
  )
}

export default DialogBox