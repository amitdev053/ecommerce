import  { useEffect, useState, useRef, useContext } from "react";
import React from "react";
import Loader from "./Loader";
import defaultBlogImage from "../defaultBlog.jpg";
import axios from "axios";
import { json, useParams, useNavigate, useLocation } from "react-router-dom";
import { handleShare } from "./HandleShare";
import { BlogAudioContext } from "./BlogAudioContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Alert from "./Alert";
import {Helmet} from "react-helmet"
import ImageDialog from "./ImageDialog";
import Tooltip from "./Tooltip";
import { getImageColors } from "./GetImageColors";
let blogTitile = "";
// let droppedSrc = ""
function BlogBack(props) {
  const { isPlaying, isPaused, setIsPaused ,playBlog,  samePage } = useContext(BlogAudioContext);
  const [heading, setHeading] = useState("");
  const [imageSrcForExploreNext, setImageSrcForExploreNext] = useState("");
  const [downloadedPixabayUrl, setDowonloadPixabayUrl] = useState(null)
  const [clickImageObject, setClickImageObject] = useState("")
  const navigate = useNavigate();
  // const utterance = useRef(null); 
  const playIcon = useRef(null);
  const shareIcon = useRef(null);
  const [readBlogs, setReadBlogs] = useState(isPlaying);
  const params = useParams()
  const [imageHeader, setImagesHeader] = useState(false)         // to track the image header type like image/blogdetail
  const location = useLocation()
  const [droppedImageSize , setDropperImageSize] = useState({})
  const [userCommingFrom, setUserCommingFrom ] = useState(true)     // comming from website or other platefroms if false it mean comming from others
  const [imageColor, setImageColor] = useState("#ffff")
  
  
//   useEffect(()=>{

// console.log("imageLoad imageSrc", imageSrcForExploreNext)
//   }, [imageSrcForExploreNext])

  
 async function setHeaderHeading() {
    // let blogTitle = document.querySelector(".blog_title");
    // if (blogTitle !== "" && blogTitle) {
    //   setHeading(blogTitle);
    // }
    //   if (blogTitile !== "") {
    //   setHeading(blogTitile);
    // }else{
    //   console.log("window location", url)
      
    // }
    const url = window.location.href.split("/")[5]
    const titleHeading = decodeURIComponent(url.replace(/-/g, ' ')).replace(/\w\S*/g, (word) => word.charAt(0).toUpperCase() + word.substring(1).toLowerCase());
    const title = titleHeading.charAt(0).toUpperCase() + titleHeading.slice(1).toLowerCase();
    const imageData = location.state?.imageData
    setHeading(title);
    if(!imageData){
      console.log("yes image sets here")
      setUserCommingFrom(false)
    setTimeout(()=>{
      let imageContainer = document.querySelector('.pinterest-layout')
      if(imageContainer){
          let children = Array.from(imageContainer.children)
        let lastChild = children[children.length - 2]
        console.log("last children", lastChild)
        setDropperImageSize({width: lastChild?.offsetWidth, height: lastChild?.offsetHeight})
        let imageSrc = lastChild.querySelector('img').src
        lastChild.style.setProperty("border", "2px solid black", "important")
        console.log("Lat image", imageSrc)        
        setImageSrcForExploreNext(imageSrc)
setDowonloadPixabayUrl(false)
        


      }

    }, 20000)  
      
    }else{
      setUserCommingFrom(true)


    // set the header image color when user comming from explore
  // const getColor = await getImageColors(clickImageObject.largeImageURL);  
  // setImageColor(getColor[0])
  // console.log("image colors", getColor)

  // set the header image src when user comming from explore
  // setTimeout(()=>{

    setImageSrcForExploreNext(imageData.webformatURL)
    setDowonloadPixabayUrl(imageData.largeImageURL)
      setClickImageObject(imageData)
  // }, 300)

    }

    
    console.log("setup heading", imageData, title)
  }

 
  
 useEffect(() => {
    // setTimeout(() => {
      setHeaderHeading();
      console.log("props ", props)
      const exploreNextPage = props?.componentFrom?.params?.hasOwnProperty("type")
      const blogDetailPage  = props.componentFrom.params.hasOwnProperty("blogId")
      
      if(exploreNextPage){
        console.log("explore next page header", exploreNextPage, props?.componentFrom?.params)
        setImagesHeader(true)
         const tag = props?.componentFrom?.params?.imageTag || "Explore";
      setHeading(tag.charAt(0).toUpperCase() + tag.slice(1));
      }else{
        setImagesHeader(false)
        console.log("comming from blogs")

      }
  console.log("blogs header props", props.componentFrom?.params)
    // }, 200);
    // console.log("setHeaderHeading", blogTitile)
  }, [props.componentFrom?.params]);
  
  
  function handleBack(event) {
    removeClickFeed(event)
    setTimeout(()=>{
//       if(window?.history.length > 0){
// console.log("comminf if")
//         navigate(-1);
//       }else{
//         console.log("comminf else")
//         if(imageHeader){
// console.log("comminf else inside if imageHeader")
//           navigate("/explore");
//         }else{
//           console.log("comminf else inside else imageHeader")
//           navigate("/blogs");

//         }

//         if(!userCommingFrom){
//         navigate("/explore");
//         }
//       }
if(!userCommingFrom){
  navigate("/explore");
}else{
  navigate(-1)
}

if(imageHeader){
   navigate("/explore");
}else{
  navigate("/blogs")
}


      console.log("backheader", window?.history.length)

      

  
    }, 100)
   
  }

  function shareBlogs(event) {
    let pageTitle , pageUrl;
    // animateIcon(shareIcon.current)
    // (productTitle, productDesc, productImage , fromWhere)
    if(imageHeader){
 const imageData = location.state?.imageData
      pageTitle = document.querySelector("#exploreTagImage").innerText    
       pageUrl = imageData.webformatURL
       

    }else{

       pageTitle = document.querySelector("#blogDtailTitle").innerText    
       pageUrl = document.getElementById('blogTopImage').src
    }
    console.log("share on explore next page", pageTitle, pageUrl)
    handleShare(pageTitle, "", pageUrl, "blogDetail")
    // console.log("event", event, imageUrl, blogTitle);
  }

  function readBlog() {
    // console.log("set blogs")
    const textElement = document.getElementById("textToSpeak");
    let blogId = document.getElementById("blogIdDetails").innerText
    console.log("textElement", blogId);
  playBlog(blogId ,heading, textElement)


  }
  function sendClickFeed(event){    
    let shareButton = event.target;
    if(shareButton){
      shareButton.style.backgroundColor = "white";
      shareButton.style.color = "black";
      
   
    }
    
  }
  function removeClickFeed(event){    
    let shareButton = event.target;
    if(shareButton){
      shareButton.style.backgroundColor = "white";
      shareButton.style.color = "";     
      orignalElement(event)
    }
    
  }
  function orignalElement(event){
    let shareButton = event?.target;
    if(shareButton){
      shareButton.style.backgroundColor = "#eee";
      shareButton.style.color = "";         
    }    
  }

  


  useEffect(() => {
  if(isPaused){
    setReadBlogs(true)
  }else{
    setReadBlogs(false)

  }
  
  }, [isPaused]);
  function animateIcon(navbarIcon){
    navbarIcon.style.setProperty('font-size', "13px")
    setTimeout(()=>{
      navbarIcon.style.removeProperty('font-size', "14px") 

    }, 100)
  }

  useEffect(() => {
   if(!isPlaying){
    setReadBlogs(false)
  }  
  }, [isPlaying]);

function buttonEnable(element, type){
  const playButton = element
if(playButton){
  // console.log("playButton", playButton)
  playButton.disabled = type
}
}
  useEffect(()=>{
    if(isPlaying){  
      // when user navigate the pages
      if(samePage){
        // console.log("enable true", samePage)
        buttonEnable(playIcon.current, false)
      }else{
       buttonEnable(playIcon.current, true)
        // console.log("enable false", samePage)
        }
    } 
    // when user stop the blog playing
    if(!isPlaying){
      buttonEnable(playIcon.current, false)
    }
  }, [samePage, isPlaying])

  function downlodImage(event, imageUrl) {
      // Extract extension from the image URL
      console.log("download clicked image ", imageUrl, "huu")
      if(!imageUrl) return
       // Create a hidden download link
      
      

  const urlParts = imageUrl.split(".");
  console.log("imageurl", imageUrl)
  const extension = urlParts[urlParts.length - 1].split("?")[0]; 
  

   const img = new Image();
  img.crossOrigin = "anonymous"; // try CORS
  img.src = imageUrl;

  img.onload = () => {
    const canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;
    const ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0);
    canvas.toBlob((blob) => {
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = heading + `.${extension}`;
      link.click();
      URL.revokeObjectURL(url);
      // toast.success("Image download successful.");
      toast.success("Image downloaded");
    });
  };

  img.onerror = () => {
    toast.error("Sorry... image could'nt downloaded now... try again later");
  };
  }

  function SeeMoreDetails(event, clickedImage){
    console.log("see More Details", clickedImage)
  }
  
//   function openViewImage() {
//     let imageDialog = document.getElementById("imageDialog");
//     let imageWrapper = document.getElementById("imageWrapper");
//     let img = imageWrapper.querySelector("img");

//     if (imageDialog && img) {
//         // imageDialog.style.opacity = "1";
//         // imageDialog.style.zIndex = "9999";
//         imageDialog.classList.add('open_main_image_dialog')
//         imageWrapper.classList.add('open_image_wrapper')
     
        

        

       
//         // imageWrapper.style.width = `${imageSrcForExploreNext.webformatWidth}px`
//         // imageWrapper.style.height = `${imageSrcForExploreNext.webformatHeight}px`
//         if(window.innerWidth <= 480 && window.innerHeight < clickImageObject.webformatHeight){
//               imageWrapper.style.setProperty("width", `${clickImageObject.webformatWidth || droppedImageSize?.width}px`, "important" )
//           imageWrapper.style.setProperty("height", `${400 || 400}px`,  "important")
//           // imageWrapper.style.setProperty("border-radius", `50px`,  "important")
//           // img.style.setProperty("border-radius", `50px`,  "important")
          
//           // console.log("image height is grater then window height", )

//         }else{

//           imageWrapper.style.setProperty("width", `${clickImageObject.webformatWidth || droppedImageSize?.width}px`, "important" )
//           imageWrapper.style.setProperty("height", `${clickImageObject.webformatHeight || droppedImageSize?.height}px`,  "important")
//         }

        

       
//     }
// }

function openViewImage() {
  const imageDialog = document.getElementById("imageDialog");
  const imageWrapper = document.getElementById("imageWrapper");
  const img = imageWrapper.querySelector("img");

  if (!imageDialog || !img) return;

  // Defer UI activation until image is decoded
  img.decode().then(() => {
    requestAnimationFrame(() => {
      imageDialog.classList.add('open_main_image_dialog');
      imageWrapper.classList.add('open_image_wrapper');

      const width = clickImageObject.webformatWidth || droppedImageSize?.width;
      const height = clickImageObject.webformatHeight || droppedImageSize?.height;

      if (window.innerWidth <= 480 && window.innerHeight < height) {
        imageWrapper.style.setProperty("width", `${width}px`, "important");
        imageWrapper.style.setProperty("height", `400px`, "important");
      } else {
        imageWrapper.style.setProperty("width", `${width}px`, "important");
        imageWrapper.style.setProperty("height", `${height}px`, "important");
      }
    });
  }).catch(() => {
    // fallback if image decode fails
    imageDialog.classList.add('open_main_image_dialog');
    imageWrapper.classList.add('open_image_wrapper');
  });
}


  
    
  

  return (
    <>
    {/* <Alert position="bottom-center"> </Alert> */}
      <div className="back_header fixed-top">
        <div className="container  app_blog_back_header app_container">
          <div className="row d-flex align-items-center p-0 app_blog_detail_row ">
            <div className="col-8 d-flex align-items-center app_blog_detail_action_first">
            {/* onClick={handleBack} */}
              <button
                className="fa-solid fa-arrow-left app_blog_detail_icon app_blog_detail_back_icon"  onClick={(event)=>{handleBack(event)}}
                 onTouchStart={sendClickFeed}
                  
                   onTouchEnd={(event)=>{
                   
                  removeClickFeed(event)}} onMouseUp={(event)=>{removeClickFeed(event)}} onMouseDown={sendClickFeed} onMouseOut={orignalElement}
              ></button>
           {imageHeader && imageSrcForExploreNext && imageSrcForExploreNext !== "" && (
  <>
  {console.log("src set", imageSrcForExploreNext)}
    {window.innerWidth > 768 ? ( // Desktop only
      <Tooltip text="Click to Expand image" position="bottom">
        <div
          className="image_backview_container"
          style={{ background: imageColor }}
          onClick={openViewImage}
        >
          <img
            src={imageSrcForExploreNext}
            alt={`${heading}'s Photo`} className="back_header_image"
          
          />
        </div>
      </Tooltip>
    ) : ( 
      <div
        className="image_backview_container"
        style={{ background: imageColor }}
        onClick={openViewImage}
      >
        <img
          src={imageSrcForExploreNext}
          alt={`${heading}'s Photo`} className="back_header_image"
        />
      </div>
    )}
  </>
)}
              <span className="blog_back_heading " id="exploreTagImage"> {heading} </span>
            </div>
            <div className="col-4 d-flex align-items-center justify-content-end app_blog_detail_action_secound" >
            {/* blog speak button */}
            {(!imageHeader) ?                 
            
               <button
               ref={playIcon}
                className={`${
                 readBlogs ? "fa-solid fa-pause" : "fa-solid fa-play"
                } app_blog_detail_icon`}
                type="button"
                id="AppPlayIcon"
                style={{ padding: readBlogs ? "10px 13px" : "10px 12px"  }}
                onClick={(e) => {
                  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
                  if(isMobile){
                    animateIcon(playIcon.current)                  
                    setReadBlogs(false)
                    toast.info("Switch on the desktop to enjoy this feature")
                    // console.log("mobile devices", readBlogs, isPlaying)
                    return
                  }
                  
                setReadBlogs((prev) => {
  if (prev) {
    // ✅ If currently reading → pause it
    window.speechSynthesis.pause();
    setIsPaused(false);
  } else {
    // ▶️ If paused → resume speech, else start reading new blog
    if (window.speechSynthesis.paused) {
      window.speechSynthesis.resume();
      setIsPaused(true);
    } else {
      readBlog(); // your function that starts a new utterance
      setIsPaused(true);
    }
  }

  return !prev;
})
                  
                }}
              ></button>
              :
              <>
               {/* (
  window.innerWidth > 999 && (
    <button className="app_blog_detail_icon download_icon_button" onClick={(e) =>{downlodImage(e, imageSrcForExploreNext?.largeImageURL)}}>
      <i className="fa-solid fa-download"></i>
    </button>
  )
) */}

  {/* <button className="app_blog_detail_icon download_icon_button" style={{padding:" 8px 13px"}} onClick={(e) =>{SeeMoreDetails(e, clickImageObject)}}>
      
      <i class="fa-solid fa-angle-right"></i>
    </button> */}
    {userCommingFrom && 

    <>
      <button className="app_blog_detail_icon download_icon_button" onClick={(e) =>{downlodImage(e, imageSrcForExploreNext)}}>
      <i className="fa-solid fa-download"></i>
    </button>
    </>
    
    }

    </>          
             
              
            }
            {/* blog speak button End here */}
              <button
              ref={shareIcon}
                className="fa-solid fa-share-nodes app_blog_detail_icon"
                onClick={(e) =>                 
                shareBlogs(e)
                }
                
              ></button>
            </div>
          </div>
        </div>
      </div>
      <ImageDialog imageUrl={imageSrcForExploreNext} heading={heading} />
    </>
  );
}
const BlogDetail = () => {
  // console.log("blog Details Page");

  const [loader, setloader] = useState(true);
  const [blogDetail, setBlogDetail] = useState([]);
  const blogId = useParams();

  function getBlogDetails() {
    let getBlogUrl = `https://dev.to/api/articles/${blogId.blogId}`;
    axios.get(getBlogUrl).then((bDetails) => {
      setloader(false);
      // setBlogDetail(bDetails.data);
      blogDetail.push(bDetails.data);
      // blogTitile = blogDetail[0].title;
      blogTitile = bDetails.data.title ;
      
      console.log("blog Details response", bDetails.data.title);
      setTimeout(() => {
        setStyleCode();
      }, 1000);
    });
  }
  function setStyleCode() {
    if(!document.querySelector(".blog_detail_full_content")) return

    let blogDetails = document
      .querySelector(".blog_detail_full_content")
      .querySelector("#textToSpeak")
      .querySelectorAll(".gallerytitle");

  
if(blogDetails){


    Array.from(blogDetails).forEach((item) => {
         const codeElements = item.querySelectorAll("code");
         console.log("code element", codeElements)
      // console.log("code item", item)
      Array.from(item.children).forEach((itemChildren) => {
        if (itemChildren.classList.contains("highlight")) {
          itemChildren.classList.add("custom-code-style");
      const fullscreenAction = itemChildren.querySelector('.js-fullscreen-code-action')
      console.log("fullscreenAction ", fullscreenAction)
      if(fullscreenAction){
        fullscreenAction.remove()
      }
       let PreCreate = document.createElement("pre");
       let codeCreate = document.createElement("code");        

          const PrinsmHTMl = window.Prism.highlight(itemChildren.textContent.trim(), window.Prism.languages.javascript, 'javascript');
          codeCreate.innerHTML = PrinsmHTMl;
          PreCreate.appendChild(codeCreate);
          itemChildren.innerHTML = "";          
          itemChildren.appendChild(PreCreate);
       
        }
        Array.from(itemChildren.children).forEach((items) => {
            if(item.getElementsByTagName("code")){
            console.log("code item", items)
            }
    
          Array.from(items.children).forEach((itemsItems) => {
                
            if (itemsItems.classList.contains("highlight")) {
              itemsItems.classList.add("custom-code-style");
            }
          });
        });
      });
    });
  }
    // let codeElements =  document.querySelectorAll(".custom-code-style");
    // console.log("codeElements", codeElements)
    // Array.from(codeElements).forEach((item) => {
    //     const fullscreenAction = item.querySelector('.js-fullscreen-code-action')
    //       if (fullscreenAction) {
    //         console.log("Found fullscreen action:", fullscreenAction);
    //       }
     
    // });
  }
  useEffect(() => {
    getBlogDetails();
  }, []);

  if (loader === true) {
    return (
      <>
        <Loader></Loader>
      </>
    );
  } else {
    return (
      <>
         <Helmet>
      <title>
        {blogTitile}
      </title>
      <meta name="description" content="" />
      <meta name="keywords" content="" />

       <meta property="og:title" content={blogTitile} />
  <meta property="og:description" content="" />
  <meta property="og:type" content="website" />
  {/* <meta property="og:url" content="https://browsenext.today/blogs" /> */}
  <meta property="og:image" content="https://browsenext.today/favicons.png" />
  {/* <link rel="canonical" href="https://browsenext.today/blogs" /> */}
    </Helmet>
        <div className="app_detail_blog_container container mt-74 app_container ">
          <div className="row p-0 w-100 d-flex align-items-center overflow-hidden flex-row-reverse position-relative">
            {/* blog user action  end Here*/}
            {/* blog details appear starts Here*/}
            <div className="col-10 blog_user_action w-100 blog_detail_full_content">
              <div className="blog_content_top_img w-100 ">
                <img
                  src={
                    blogDetail[0].cover_image &&
                    blogDetail[0].cover_image.length > 0
                      ? blogDetail[0].cover_image
                      : defaultBlogImage
                  }
                  className="img-fluid blog_detail_top_image w-100"
                  height="500px"
                  id="blogTopImage"
                  alt=""
                />
                {/* <div className="position-absolute d-flex align-items-center justify-content-between blog_detail_header_icon">            
            <i class="fa-solid fa-circle-play" onClick={readBlog}></i>
            </div> */}
              </div>
              <h1
                style={{
                  fontSize: "25px",
                  fontWeight: "700",

                  lineHeight: "30px",
                }}
                className="blog_title text_left"
                id="blogDtailTitle"
              >
                {" "}
                {blogDetail[0].title}
              </h1>
<span style={{display: "none"}} id="blogIdDetails"> {blogDetail[0].id}</span>
              <div id="textToSpeak" style={{marginTop: "-10px"}}>
                <span
                  className="gallerytitle productname productdiscripation blog_detail_content_img"
                  dangerouslySetInnerHTML={{
                    __html: blogDetail[0].body_markdown,
                  }}
                />
                <span
                  className="gallerytitle productname productdiscripation blog_detail_content_img"
                  dangerouslySetInnerHTML={{ __html: blogDetail[0].body_html }}
                />
                <span
                  className="gallerytitle productname productdiscripation blog_detail_content_img"
                  dangerouslySetInnerHTML={{
                    __html: blogDetail[0].descripation,
                  }}
                />
              </div>
            </div>
            {/* blog details appear starts Here*/}

            {/* blog details appear starts Here*/}
            {/* <div className="col-2 app_advertise_content">
            here the blog heading keys

            </div> */}
            
            

            
          </div>
        </div>
      </>
    );
  }
};

export { BlogDetail, BlogBack };
