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
!props.loadingImages && 

<>




<div class="options_container">



<div className='option_item' onClick={props.onDownload}>
{/* <i class="fa-solid fa-download"></i>
<span>Download</span> */}

<i className={props.isDownloaded ? "fa-solid fa-check" : "fa-solid fa-download"}></i>
<span>{props.isImageSaved ? <span style={{ fontWeight: 700 }}>Downloaded</span>  : "Download"}</span>
</div>



<div className='option_item'>
{/* <i class="fa-solid fa-thumbs-up"></i> */}
<i class="fa-regular fa-star"></i>
<span>Suggest more like this</span>
</div>

<div className='option_item' onClick={props.onHide}>
<i className={props.isHide ? "fa-solid fa-eye-slash" : "fa-regular fa-eye-slash"}></i>
{/* <i class="fa-solid fa-eye-slash"></i> */}
{/* <span>Hide</span> */}
<span>{props.isHide ? <span style={{ fontWeight: 700 }}>Hide</span>  : "Hide"}</span>
</div>

<div className='option_item'  onClick={props.onSave}>
{/* <i class="fa-solid fa-bookmark"></i> */}
<i className={props.isImageSaved ? "fa-solid fa-bookmark" : "fa-regular fa-bookmark"}></i>
<span>{props.isImageSaved ? <span style={{ fontWeight: 700 }}>Saved</span>  : "Save"}</span>
</div>

<div className='option_item'>
<i class="fa-regular fa-thumbs-down"></i>
 {/* <i class="fa-solid fa-ban"></i> */}
<span>Not interested</span>
</div>


</div>

</>




    
    
    }
       
    </div>
  )
}

export default AppShareer