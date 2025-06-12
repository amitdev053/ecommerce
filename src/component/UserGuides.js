import { React, useEffect, useState, useRef } from "react";
import { createPortal } from "react-dom";
import "./UserGuides.css";

const UserGuides = (props) => {
  console.log("UserGuides", props);
  // for the initial loading
  const [touchStart, setTouchStart] = useState(0);
  useEffect(() => {
    const timer = setTimeout(() => {
      props.loadingF(false);
    }, 1000);
    return () => clearTimeout(timer); 
  }, [props.isLoadingGuides]);
  // for the initial loading


    const [startY, setStartY] = useState(null);
  const [currentY, setCurrentY] = useState(null);
  const modalRef = useRef();

  // Cleanup loader timer
  useEffect(() => {
    const timer = setTimeout(() => {
      props.loadingF(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [props.isLoadingGuides]);

  // Touch Handlers
  function handleTouchStart(e) {
    setStartY(e.touches[0].clientY);
  }

  function handleTouchMove(e) {
    if (startY === null) return;
    const y = e.touches[0].clientY;
    setCurrentY(y);

    // Translate the modal while dragging
    const diffY = y - startY;
    if (diffY > 0) {
      modalRef.current.style.transform = `translateY(${diffY}px)`;
    }
  }

  function handleTouchEnd() {
    let body = document.getElementById("appbody");
    if (!startY || !currentY) return;

    const diffY = currentY - startY;

    if (diffY > 100) {
      // Slide out and close
      modalRef.current.style.transition = 'transform 0.3s ease-out';
      modalRef.current.style.transform = 'translateY(100%)';
      body.style.overflowY = 'auto'; 
      body.style.position = ''; 
      // After animation, remove modal
      setTimeout(() => {
        props.loadingF(false); // or a dedicated close method
      }, 300);
    } else {
      // Restore position
      modalRef.current.style.transition = 'transform 0.3s ease-out';
      modalRef.current.style.transform = 'translateY(0)';
   
      
    }

    setStartY(null);
    setCurrentY(null);
  }

  

  return createPortal(
    <div
      className="container-fluid dialog_container_fluid user_guides_container_fluid"
      id="UserGuides"
       ref={modalRef}
      guides="true"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div className="row dialog_row user_guides_row">
        <div className="col-12 dilaog_col text-center p-0">
          <div className="dialog_heading user_guide_heading" 
       
          >{props.title}</div>

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
              {/* {props.buttonText} */}
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.getElementsByTagName("body")[0]
  );
};

export default UserGuides;
