import { React, useEffect, useState, useRef } from "react";
import { createPortal } from "react-dom";
import "./UserGuides.css";

const UserGuides = (props) => {
  // console.log("UserGuides", props);
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
  const contentRef = useRef()

  // Cleanup loader timer
  useEffect(() => {
    const timer = setTimeout(() => {
      props.loadingF(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [props.isLoadingGuides]);

  // Touch Handlers
  function handleTouchStart(e) {
    console.log("touchStart", e.target, !contentRef.current.contains(e.target))
    //   let userGuideContent = contentRef.current
   
    if(!contentRef.current.contains(e.target)){
      setStartY(e.touches[0].clientY);
    }
  
    
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

  function handleTouchEnd(e) {
    let body = document.getElementById("appbody");
    if (!startY || !currentY) return;

    const diffY = currentY - startY;

    if (diffY > 100) {
     
      setupCLoseModelStyles(body)

    } else {
      // Restore position
      modalRef.current.style.transition = 'transform 0.3s ease-out';
      modalRef.current.style.transform = 'translateY(0)';
   
      
    }

    setStartY(null);
    setCurrentY(null);
  }

  function closeModel(event){
    let body = document.getElementById("appbody");
    //   console.log("yes onClick fire on userguide model")

    if(event.target === modalRef.current){    
     setupCLoseModelStyles(body)

      }
  }
  function setupCLoseModelStyles(body){

     modalRef.current.style.transition = 'transform 0.3s ease-out';
      modalRef.current.style.transform = 'translateY(100%)';
      body.style.overflowY = 'auto'; 
      body.style.position = ''; 
      document.getElementById("UserGuides").classList.remove("dialog_container_fluid_show")
      contentRef.current.style.height = "30dvh"
      setTimeout(() => {
        props.loadingF(false); 
      }, 300);

  }

  return createPortal(
    <div
      className="container-fluid dialog_container_fluid user_guides_container_fluid"
      id="UserGuides"
       ref={modalRef}
      guides="true"
       onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={(e)=>{handleTouchEnd(e)}}
      onClick={(e)=>{closeModel(e)}}
    >
      <div className="row dialog_row user_guides_row"
     
      >
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
              id="userGuideContent"
              dangerouslySetInnerHTML={{ __html: props.description }}
              ref={contentRef}
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
