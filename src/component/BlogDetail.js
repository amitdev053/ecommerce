import { useEffect, useState, useRef, useContext } from "react";
import React from "react";
import Loader from "./Loader";
import defaultBlogImage from "../defaultBlog.jpg";
import axios from "axios";
import { json, useParams, useNavigate } from "react-router-dom";
import { handleShare } from "./HandleShare";
import { BlogAudioContext } from "./BlogAudioContext";
import { toast } from "react-toastify";

let blogTitile = "";
function BlogBack() {
  const [heading, setHeading] = useState("");
  const navigate = useNavigate();
  const utterance = useRef(null); 
  const { isPlaying, isPaused, setIsPaused ,playBlog, togglePlayPause } = useContext(BlogAudioContext);
  const [readBlogs, setReadBlogs] = useState(isPlaying);
  
  
  function setHeaderHeading() {
    // let blogTitle = document.querySelector(".blog_title");
    // if (blogTitle !== "" && blogTitle) {
    //   setHeading(blogTitle);
    // }
      if (blogTitile !== "") {
      setHeading(blogTitile);
    }

  }
  function handleBack(event) {
    removeClickFeed(event)
    setTimeout(()=>{
      navigate(-1);

    }, 500)
   
  }

  function shareBlogs(event) {
    // (productTitle, productDesc, productImage , fromWhere)
    let blogTitle = document.querySelector("#blogDtailTitle").innerText    
    let imageUrl = document.getElementById('blogTopImage').src
    handleShare(blogTitle, "", imageUrl, "blogDetail")
    console.log("event", event, imageUrl, blogTitle);
  }

  function readBlog() {
    const textElement = document.getElementById("textToSpeak");
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
if(isMobile){
  toast.info("Switch on the desktop to enjoy this feature")

}else{

  playBlog(heading, textElement)
}

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
    setTimeout(() => {
      setHeaderHeading();
    }, 500);
  });

  useEffect(() => {
  if(isPaused){
    setReadBlogs(true)
  }else{
    setReadBlogs(false)

  }
  
  }, [isPaused]);

  useEffect(() => {
   if(!isPlaying){
    setReadBlogs(false)
  }  
  }, [isPlaying]);
  return (
    <>
      <div className="back_header fixed-top">
        <div className="container  app_blog_back_header app_container">
          <div className="row d-flex align-items-center p-0 app_blog_detail_row ">
            <div className="col-8 d-flex align-items-center app_blog_detail_action_first">
            {/* onClick={handleBack} */}
              <i
                className="fa-solid fa-arrow-left app_blog_detail_icon app_blog_detail_back_icon"  onClick={(event)=>{handleBack(event)}}
                 onTouchStart={sendClickFeed} onTouchEnd={(event)=>{removeClickFeed(event)}} onMouseUp={(event)=>{removeClickFeed(event)}} onMouseDown={sendClickFeed} onMouseOut={orignalElement}
              ></i>
              <span className="blog_back_heading "> {heading} </span>
            </div>
            <div className="col-4 d-flex align-items-center justify-content-end app_blog_detail_action_secound">
               <i
                className={`${
                 readBlogs ? "fa-solid fa-pause" : "fa-solid fa-play"
                } app_blog_detail_icon`}
                onClick={() => {
                  
                  setReadBlogs((prev) => {
                      if (prev) {
                        window.responsiveVoice.pause();
                        
                        setIsPaused(false)
                      } else {
                        if (speechSynthesis.speaking && speechSynthesis.paused) {              
                          window.responsiveVoice.resume();
                          setIsPaused(true)
                        } else {
                          readBlog();
                        }
                      }
                      return !prev;
                    });
                  
                }}
              ></i>
             {/* {(!readBlog) && <button className="app_blog_detail_icon border-none px-3"> <i class="fa-solid fa-stop "></i> </button> } */}
              <i
                className="fa-solid fa-share-nodes app_blog_detail_icon"
                onClick={(e) => shareBlogs(e)}
              ></i>
            </div>
          </div>
        </div>
      </div>
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
      blogTitile = blogDetail[0].title;
      // console.log("blog Details response", bDetails.data);
      setTimeout(() => {
        setStyleCode();
      }, 1000);
    });
  }
  function setStyleCode() {
    let blogDetails = document
      .querySelector(".blog_detail_full_content")
      .querySelector("#textToSpeak")
      .querySelectorAll(".gallerytitle");
    Array.from(blogDetails).forEach((item) => {
      Array.from(item.children).forEach((itemChildren) => {
        if (itemChildren.classList.contains("highlight")) {
          itemChildren.classList.add("custom-code-style");
        }
        Array.from(itemChildren.children).forEach((items) => {
          Array.from(items.children).forEach((itemsItems) => {
            if (itemsItems.classList.contains("highlight")) {
              itemsItems.classList.add("custom-code-style");
            }
          });
        });
      });
    });
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
        <div className="app_detail_blog_container container mt-ps90 app_container ">
          <div className="row p-0 w-100 d-flex align-items-center overflow-hidden">
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
                className="blog_title"
                id="blogDtailTitle"
              >
                {" "}
                {blogDetail[0].title}
              </h1>

              <div id="textToSpeak">
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
            <div className="col-1 app_advertise_content"></div>
            {/* blog details appear starts Here*/}
          </div>
        </div>
      </>
    );
  }
};

export { BlogDetail, BlogBack };
