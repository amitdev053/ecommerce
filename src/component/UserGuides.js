import { React, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import "./UserGuides.css";

const UserGuides = (props) => {
  console.log("UserGuides", props);
  

  useEffect(() => {
    const timer = setTimeout(() => {
      props.loadingF(false);
    }, 1000);

    return () => clearTimeout(timer); 
  }, [props.isLoadingGuides]);

  return createPortal(
    <div
      className="container-fluid dialog_container_fluid user_guides_container_fluid"
      id="UserGuides"
      guides="true"
    >
      <div className="row dialog_row user_guides_row">
        <div className="col-12 dilaog_col text-center p-0">
          <div className="dialog_heading user_guide_heading">{props.title}</div>

          {props.isLoadingGuides ? (
            <div className="app_loader_container">
              <div className="cart_continue_loader user_guide_app" />
            </div>
          ) : (
            <div
              className="gallerytitle productname productdiscripation"
              id="productname"
              dangerouslySetInnerHTML={{ __html: props.description }}
              
            >
               {/* {props.description}  */}
              
            </div>
          )}
          <div className="dialog_action_btn d-flex align-items-center justify-content-center">
            <button
              className="btn btn-sm btn-primary app_order_button position-relative guides_button"
              style={{ color: props.guides ? "black" : "white" }}
              id="okGuides"
            >
              {
                props.guides ? (
                <div className="cart_continue_loader" />
              ) : (
                props.buttonText
              )
              }
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.getElementsByTagName("body")[0]
  );
};

export default UserGuides;
