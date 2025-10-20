import React, { useEffect } from 'react'
import "./AppShareer.css"
const AppShareer = (props) => {

    function shareWhatsApp() {
        const title = document.title;
        const url = window.location.href;
        const imageUrl = "https://yourwebsite.com/images/services-banner.jpg";

        const message = `${title}\n${url}\n${imageUrl}`;
        window.open(`https://wa.me/?text=${encodeURIComponent(message)}`, '_blank');
}

useEffect(()=>{
console.log("props.loadingimages", props.loadingImages)
}, [])
let touchStartedInside = false;
  function sendClickFeed(event, deviceType = "desktop"){    
    event.stopPropagation()
    console.log("sendClickFeed", event.currentTarget, event.target)
    if(deviceType !== "dektop"){
      touchStartedInside = true

    }
    let shareButton = event?.currentTarget;
    if(shareButton){
      shareButton.style.backgroundColor = "#c5b7b733";
      shareButton.style.borderRadius = "10px";

      // shareButton.firstElementChild.style.color = "white";
      
      // shareButton.firstElementChild.style.backgroundColor = "white";
    }
    
  }

  function orignalElement(event){
    let shareButton = event?.currentTarget;
    if(shareButton){
      shareButton.style.backgroundColor = "";
      shareButton.style.borderRadius = "";
      touchStartedInside = false;
      console.log("originalFeed", touchStartedInside)
      // shareButton.firstElementChild.style.color = "";         
    }    
  }

  function removeClickFeed(event, type, deviceType = "desktop"){    
    event.stopPropagation()
    console.log("removeFeed")
    let shareButton = event?.currentTarget;
    if(shareButton){
      shareButton.style.backgroundColor = "";
      shareButton.style.borderRadius = "";
      // shareButton.style.color = "";
 console.log("tocuhStartedInside", touchStartedInside, deviceType)
    if (!touchStartedInside) {
      console.log("Touch ended outside — cancel download");
      return;
    }

      
      if(type === "Download"){
        // shareImage(imageUrl)
        console.log("now downloading")
        props.onDownload()
      }else if(type === "Suggested" ){
        // openMoreOptions(event, type, imageId, imageUrl)
        props.onSuggested()
      }else if(type === "Save"){
        props.onSave() 

      }else if(type === "Hide"){
        props.onHide()

      }else if(type === "notInterested"){
        props.onDislike()
        

      }
      
    }    
  }

 
  return (
    <div  className={props.componentFrom === "explore" ? 'app_sharer_container app_explore_option_box' : "app_sharer_container"}>
    {(props.componentFrom === "services") ?
<>
         <i class="fa-brands fa-whatsapp whatsapp_icon"></i>
        <i class="fa-brands fa-facebook facebook_icon"></i>
        <i class="fa-brands fa-twitter twitter_icon"></i>
        <i class="fa-brands fa-instagram instgram_icon"></i>
        <i class="fa-brands fa-linkedin linkedin_icon"></i>
        <i class="fa-solid fa-comment-sms sms_icon"></i>
        <i class="fa-regular fa-copy copy_icon"></i>
</>
: 
<>
{/* !props.loadingImages &&  */}
{console.log("props.loadingImages", props.loadingImages)}




<div class="options_container">



<div className='option_item' 
// onClick={props.onDownload}

 onClick={(event) => {
      event.stopPropagation();
      event.preventDefault();
      removeClickFeed(event,  "Download");
    }}
    onMouseDown={(event) => {
      event.stopPropagation();
      event.preventDefault();
      sendClickFeed(event);
            
    }}
    onTouchStart={(event) => {
      event.stopPropagation();
      event.preventDefault();
      sendClickFeed(event, "mobile");
    }}
    onTouchEnd={(event) => {
      event.stopPropagation();
      event.preventDefault();
      removeClickFeed(event, "Download", "mobile");
    }}
    onMouseOut={orignalElement}
    onTouchMove={orignalElement}

>
{/* <i class="fa-solid fa-download"></i>
<span>Download</span> */}

<i className={props.isDownloaded ? "fa-solid fa-check" : "fa-solid fa-download"}></i>
<span>{props.isDownloaded ? <span style={{ fontWeight: 700 }}>Downloaded</span>  : "Download"}</span>
</div>



<div className='option_item'

 onClick={(event) => {
      event.stopPropagation();
      event.preventDefault();
      removeClickFeed(event,  "Suggested");
    }}
    onMouseDown={(event) => {
      event.stopPropagation();
      event.preventDefault();
      sendClickFeed(event);
    }}
    onTouchStart={(event) => {
      event.stopPropagation();
      event.preventDefault();
      sendClickFeed(event, "mobile");
    }}
    onTouchEnd={(event) => {
      event.stopPropagation();
      event.preventDefault();
      removeClickFeed(event, "Suggested", "mobile");
    }}
    onMouseOut={orignalElement}
    onTouchMove={orignalElement}

>

{/* <i class="fa-regular fa-star"></i> */}

<i className={props.isSuggested ? "fa-solid fa-star" : "fa-regular fa-star"}></i>

<span>{props.isSuggested ? <span style={{ fontWeight: 700 }}>Recommendation Saved</span>  : "Suggest more like this"}</span>
</div>

<div className='option_item' 
// onClick={props.onHide}

 onClick={(event) => {
      event.stopPropagation();
      event.preventDefault();
      removeClickFeed(event,  "Hide");
    }}
    onMouseDown={(event) => {
      event.stopPropagation();
      event.preventDefault();
      sendClickFeed(event);
    }}
    onTouchStart={(event) => {
      event.stopPropagation();
      event.preventDefault();
      sendClickFeed(event, "mobile");
    }}
    onTouchEnd={(event) => {
      event.stopPropagation();
      event.preventDefault();
      removeClickFeed(event, "Hide", "mobile");
    }}
    onMouseOut={orignalElement}
    onTouchMove={orignalElement}

>
<i className={props.isHide ? "fa-solid fa-eye-slash" : "fa-regular fa-eye-slash"}></i>
<span>{props.isHide ? <span style={{ fontWeight: 700 }}>Hide</span>  : "Hide"}</span>
</div>

<div className='option_item' 
//  onClick={props.onSave}

 onClick={(event) => {
      event.stopPropagation();
      event.preventDefault();
      removeClickFeed(event,  "Save");
    }}
    onMouseDown={(event) => {
      event.stopPropagation();
      event.preventDefault();
      sendClickFeed(event);
    }}
    onTouchStart={(event) => {
      event.stopPropagation();
      event.preventDefault();
      sendClickFeed(event, "mobile");
    }}
    onTouchEnd={(event) => {
      event.stopPropagation();
      event.preventDefault();
      removeClickFeed(event, "Save", "mobile");
    }}
    onMouseOut={orignalElement}
    onTouchMove={orignalElement}
>
{/* <i class="fa-solid fa-bookmark"></i> */}
<i className={props.isImageSaved ? "fa-solid fa-bookmark" : "fa-regular fa-bookmark"}></i>
<span>{props.isImageSaved ? <span style={{ fontWeight: 700 }}>Saved</span>  : "Save"}</span>
</div>

<div className='option_item'
 onClick={(event) => {
      event.stopPropagation();
      event.preventDefault();
      removeClickFeed(event,  "notInterested");
    }}
    onMouseDown={(event) => {
      event.stopPropagation();
      event.preventDefault();
      sendClickFeed(event);
    }}
    onTouchStart={(event) => {
      event.stopPropagation();
      // event.preventDefault();
      sendClickFeed(event, "mobile");
    }}
    onTouchEnd={(event) => {
      event.stopPropagation();
      event.preventDefault();
      removeClickFeed(event, "notInterested", "mobile");
    }}
    onMouseOut={orignalElement}
    onTouchMove={orignalElement}
>
{/* <i class="fa-regular fa-thumbs-down"></i> */}
<i className={props.isDislike ? "fa-solid fa-thumbs-down" : "fa-regular fa-thumbs-down"}></i>
 {/* <i class="fa-solid fa-ban"></i> */}

<span>{props.isDislike ? <span style={{ fontWeight: 700 }}>Not interested</span>  : "Not interested"}</span>
</div>


</div>

</>




    
    
    }
       
    </div>
  )
}

export default AppShareer