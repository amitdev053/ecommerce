import React, {useState, useEffect, useRef} from 'react'
import "./ImageDialog.css";


const ImageDialog = (props) => {
    let [scale, setScale] = useState(1); // zoom scale
      const [activeButton, setActiveButton] = useState(null); // track which button is pressed
      const [isHovering, setIsHovering] = React.useState(false);
      const previewImageRef = useRef(null)
  const modalRef = useRef(null);
  
    function CloseOpenView(){
           let imageDialog = document.getElementById("imageDialog");
    let imageWrapper = document.getElementById("imageWrapper");
    let img = imageWrapper.querySelector("img");

    if (imageDialog && img) {
             imageWrapper.style.width = `${50}px`
        imageWrapper.style.height = `${50}px`
        imageWrapper.classList.remove('open_image_wrapper')
        setTimeout(()=>{
            imageDialog.classList.remove('open_main_image_dialog')
            // imageDialog.remove()
            // setTimeout(()=>{
            //   document.body.appendChild(imageDialog)
            //   imageDialog.classList.remove('open_main_image_dialog')
            // }, 500)
        }, 200)
          setScale(1); // reset zoom when closing
    }
    }
      // Zoom in function
  function zoomIn() {
    // setScale(prev => Math.min(prev + 1, 5));
    let img = previewImageRef.current
    if(img){
    setScale(prev => {
      const newScale = Math.min(prev + 1, 5);
      img.style.transform = `scale(${newScale})`; // use new value immediately
      return newScale;
    });

    }
  }

  // Zoom out function
  function zoomOut() {
    // setScale(prev => Math.max(prev - 1, 1));
      let img = previewImageRef.current
    if(img){
    setScale(prev => {
      const newScale = Math.max(prev - 1, 1);
      img.style.transform = `scale(${newScale})`; // use new value immediately
      return newScale;
    });
            

    }
  }

  // Close on scroll (desktop & mobile)
  // useEffect(() => {
    
  //   const handleScroll = (e) => {
  //     console.log("scroll hover", isHovering)
      
  //       CloseOpenView();

      
  //     // handleClickOutside(e)
  //   };

  //   window.addEventListener("wheel", handleScroll, { passive: true });
  //   window.addEventListener("touchmove", handleScroll, { passive: true });

  //   return () => {
  //     window.removeEventListener("wheel", handleScroll);
  //     window.removeEventListener("touchmove", handleScroll);
  //   };
  // }, []);

 
function handleClickOutside(event) {
  console.log("cusor comes on image", event.target, isHovering)
  if (event.target.tagName === "IMG") {
    setIsHovering(true)
    
  }else{
    setIsHovering(false)
  }
}



  return (
    <div className="container-fluid main_image_dialog" id="imageDialog" 
     
    
  >
        <div className='container image_dialog_container position-relative'>
        
            <i class="fa-solid fa-xmark close_button_image_largeview"  role="button" 
  tabIndex="0"  onClick={CloseOpenView} 
     onKeyDown={(e) => {
    if (e.key === 'Escape') {
      CloseOpenView();
    }
  }}
  />
   

            <div className='image_wrapper' id="imageWrapper" ref={modalRef}
          
            >
<img src={props.imageUrl} alt={props.heading}
  // onMouseEnter={(e) =>{ setIsHovering(true)}}
  // onMouseLeave={(e) =>{ setIsHovering(false)}}
// style={{ transform: `scale(${scale})`, transition: "transform 0.2s ease-in-out" }}
ref={previewImageRef}
 />
            </div>
            <div className="image_zoom_in_out">
            <i 
            // class="fa-solid fa-plus" 
             className={`fa-solid fa-plus ${scale >= 5 ? 'disabled' : ''} ${activeButton === 'in' ? 'active-red' : ''}`}
            role="button" 
            onClick={zoomIn} tabIndex="0"
             onMouseDown={() => setActiveButton('in')}
            onMouseUp={() => setActiveButton(null)}
            onMouseLeave={() => setActiveButton(null)}

              // Mobile feedback
  onTouchStart={() => setActiveButton('in')}
  onTouchEnd={() => setActiveButton(null)}
  onTouchCancel={() => setActiveButton(null)}
            ></i>


            <i 
            // class="fa-solid fa-minus" 
               className={`fa-solid fa-minus ${scale <= 1 ? 'disabled' : ''} ${activeButton === 'out' ? 'active-red' : ''}`}
            role="button" onClick={zoomOut} tabIndex="0"
            onMouseDown={() => setActiveButton('out')}
            onMouseUp={() => setActiveButton(null)}
            onMouseLeave={() => setActiveButton(null)}

            // Mobile feedback
  onTouchStart={() => setActiveButton('out')}
  onTouchEnd={() => setActiveButton(null)}
  onTouchCancel={() => setActiveButton(null)}
            ></i>

            </div>
        </div>
    </div>
  )
}

export default ImageDialog