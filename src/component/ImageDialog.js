import React, {useState} from 'react'
import "./ImageDialog.css";

const ImageDialog = (props) => {
    const [scale, setScale] = useState(1); // zoom scale
      const [activeButton, setActiveButton] = useState(null); // track which button is pressed
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
        }, 200)
          setScale(1); // reset zoom when closing
    }
    }
      // Zoom in function
  function zoomIn() {
    setScale(prev => Math.min(prev + 1, 5)); // limit to max scale(5)
  }

  // Zoom out function
  function zoomOut() {
    setScale(prev => Math.max(prev - 1, 1)); // limit to min scale(1)
  }
  return (
    <div className="container-fluid main_image_dialog" id="imageDialog">
        <div className='container image_dialog_container position-relative'>
            <i class="fa-solid fa-xmark close_button_image_largeview"  role="button" 
  tabIndex="0"  onClick={CloseOpenView} 
     onKeyDown={(e) => {
    if (e.key === 'Escape') {
      CloseOpenView();
    }
  }}
  />

            <div className='image_wrapper' id="imageWrapper">
<img src={props.imageUrl} alt={props.heading}
style={{ transform: `scale(${scale})`, transition: "transform 0.2s ease-in-out" }}
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
            ></i>
            <i 
            // class="fa-solid fa-minus" 
               className={`fa-solid fa-minus ${scale <= 1 ? 'disabled' : ''} ${activeButton === 'out' ? 'active-red' : ''}`}
            role="button" onClick={zoomOut} tabIndex="0"
            onMouseDown={() => setActiveButton('out')}
            onMouseUp={() => setActiveButton(null)}
            onMouseLeave={() => setActiveButton(null)}
            ></i>

            </div>
        </div>
    </div>
  )
}

export default ImageDialog