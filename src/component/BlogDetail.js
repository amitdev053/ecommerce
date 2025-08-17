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

let blogTitile = "";

function BlogBack(props) {
  const { isPlaying, isPaused, setIsPaused ,playBlog,  samePage } = useContext(BlogAudioContext);
  const [heading, setHeading] = useState("");
  const [imageSrcForExploreNext, setImageSrcForExploreNext] = useState("");
  const navigate = useNavigate();
  // const utterance = useRef(null); 
  const playIcon = useRef(null);
  const shareIcon = useRef(null);
  const [readBlogs, setReadBlogs] = useState(isPlaying);
  const params = useParams()
  const [imageHeader, setImagesHeader] = useState(false)         // to track the image header type like image/blogdetail
  const location = useLocation()
  

  
  function setHeaderHeading() {
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
    if(imageData){
      setImageSrcForExploreNext(imageData)

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
        console.log("explore next page header", exploreNextPage)
        setImagesHeader(true)
         const tag = props?.componentFrom?.params?.imageTag || "Explore";
      setHeading(tag.charAt(0).toUpperCase() + tag.slice(1));
      }else{
        setImagesHeader(false)

      }
  
    // }, 200);
    // console.log("setHeaderHeading", blogTitile)
  }, [props.componentFrom?.params]);
  
  function handleBack(event) {
    removeClickFeed(event)
    setTimeout(()=>{
      navigate(-1);

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
  const urlParts = imageUrl.split(".");
  const extension = urlParts[urlParts.length - 1].split("?")[0]; // Handles query params
  // Fetch the image as a blob
  fetch(imageUrl, { mode: 'cors' })
    .then(response => response.blob())
    .then(blob => {
      const url = URL.createObjectURL(blob);

      // Create a hidden download link
      const link = document.createElement('a');
      link.href = url;
      link.download = heading + `.${extension}`; // Use the heading as the filename
      document.body.appendChild(link);
      link.click();

      // Cleanup
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      toast.success("Image downloaded successfully")
    })
    .catch(err => {
      console.error("Image download failed", err);
      toast.error("Image download failed. Please try again later.");
    });
  }
  
  function openViewImage() {
    let imageDialog = document.getElementById("imageDialog");
    let imageWrapper = document.getElementById("imageWrapper");
    let img = imageWrapper.querySelector("img");

    if (imageDialog && img) {
        // imageDialog.style.opacity = "1";
        // imageDialog.style.zIndex = "9999";
        imageDialog.classList.add('open_main_image_dialog')
        imageWrapper.classList.add('open_image_wrapper')
     
        

        

       
        // imageWrapper.style.width = `${imageSrcForExploreNext.webformatWidth}px`
        // imageWrapper.style.height = `${imageSrcForExploreNext.webformatHeight}px`
        imageWrapper.style.setProperty("width", `${imageSrcForExploreNext.webformatWidth}px`, "important" )
        imageWrapper.style.setProperty("height", `${imageSrcForExploreNext.webformatHeight}px`,  "important")
console.log("webFormatWidth and ehgith", imageSrcForExploreNext.webformatHeight, imageSrcForExploreNext.webformatWidth)
        

       
    }
}

  
    
  

  return (
    <>
    <Alert position="bottom-center"> </Alert>
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
           {imageHeader && (
  <>
    {window.innerWidth > 768 ? ( // Desktop only
      <Tooltip text="Click to Expand image" position="bottom">
        <div
          className="image_backview_container"
          style={{ background: imageSrcForExploreNext?.imageColor }}
          onClick={openViewImage}
        >
          <img
            src={imageSrcForExploreNext?.webformatURL}
            alt={`${heading}'s Photo`}
          />
        </div>
      </Tooltip>
    ) : ( 
      <div
        className="image_backview_container"
        style={{ background: imageSrcForExploreNext?.imageColor }}
        onClick={openViewImage}
      >
        <img
          src={imageSrcForExploreNext?.webformatURL}
          alt={`${heading}'s Photo`}
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
                        // console.log("running first ")
                        window.responsiveVoice.pause();
                        
                        setIsPaused(false)
                      } else {
                        // console.log("running else first ", prev)
                        if (speechSynthesis.speaking && speechSynthesis.paused) {              
                          window.responsiveVoice.resume();
                          setIsPaused(true)
                          // console.log("running else inside if first ")
                        } else {
                          readBlog();
                          // console.log("running else inside else ")
                        }

                      }

                      return !prev;
                    });
                  
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
  <button className="app_blog_detail_icon download_icon_button" onClick={(e) =>{downlodImage(e, imageSrcForExploreNext?.largeImageURL)}}>
      <i className="fa-solid fa-download"></i>
    </button>

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
      <ImageDialog imageUrl={imageSrcForExploreNext?.webformatURL} heading={heading} />
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
      blogTitile = bDetails.data.title;
      
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
  {/* <meta property="og:url" content="https://market-shops.vercel.app/blogs" /> */}
  <meta property="og:image" content="https://market-shops.vercel.app/favicons.png" />
  {/* <link rel="canonical" href="https://market-shops.vercel.app/blogs" /> */}
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
