import { useEffect, useState } from "react";
import React from "react";
import Loader from "./Loader";
import defaultBlogImage from "../defaultBlog.jpg";
import axios from "axios";
import { json, useParams } from 'react-router-dom';

const BlogDetail = () => {
  console.log("blog Details Page");

  const [loader, setloader] = useState(true);
  const [blogDetail, setBlogDetail] = useState([]);
 
  const blogId = useParams();


  function getBlogDetails(){
    
    console.log("blogId", blogId)
 let getBlogUrl = `https://dev.to/api/articles/${blogId.blogId}`;
    axios.get(getBlogUrl).then((bDetails) => {
      setloader(false);
      // setBlogDetail(bDetails.data);
      blogDetail.push(bDetails.data)
      console.log("blog Details response", bDetails.data);
      setTimeout(()=>{
        setStyleCode()
      }, 1000)
    });

    // axios.get(`http://localhost:8000/getuser`).then((userData) => {  
    //   console.log("my apies user data", userData);
    // }).catch((err)=> console.log("api api not resloved", err));
  }
  function setStyleCode(){
   let blogDetails = document.querySelector('.blog_detail_full_content').querySelector('#textToSpeak').querySelectorAll('.gallerytitle')
   console.log("blogDetails", blogDetails)
   Array.from(blogDetails).forEach((item)=>{
    console.log("items...",item.children)

    Array.from(item.children).forEach((itemChildren)=>{
          if(itemChildren.classList.contains('highlight')){
            itemChildren.classList.add('custom-code-style')
          }
          Array.from(itemChildren.children).forEach((items)=>{
            Array.from(items.children).forEach((itemsItems)=>{
                if(itemsItems.classList.contains('highlight')){
                itemsItems.classList.add('custom-code-style')
              }
            })

          })
    
    })
   })

  }
  useEffect(()=>{
         
    getBlogDetails() 

  }, [])
// const readBlog = ()=>{

//       const text = document.getElementById('textToSpeak').innerText;

//       // Create a new instance of SpeechSynthesisUtterance
//       const utterance = new SpeechSynthesisUtterance(text);

//       // Set the voice (optional)
//       const voices = window.speechSynthesis.getVoices();
//       utterance.voice = voices.find(voice => voice.lang === 'en-US');

//       // Set additional options like pitch, rate, and volume (optional)
//       utterance.pitch = 1; // 0 to 2
//       utterance.rate = 1;  // 0.1 to 10
//       utterance.volume = 1; // 0 to 1

//       // Speak the text
//       window.speechSynthesis.speak(utterance);
    
// }
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
              <img src={
                        blogDetail[0].cover_image && blogDetail[0].cover_image.length > 0
                          ? blogDetail[0].cover_image
                          : defaultBlogImage
                      } className="img-fluid blog_detail_top_image w-100" height="500px"alt="" />
             {/* <div className="position-absolute d-flex align-items-center justify-content-between blog_detail_header_icon">            
            <i class="fa-solid fa-circle-play" onClick={readBlog}></i>
            </div> */}
            </div>
          <h2  style={{
            fontSize: "25px",
            fontWeight: "700",
            
            lineHeight: "30px"
           
          }}  > {blogDetail[0].title} </h2>
          
            <div id="textToSpeak" >
            <span className="gallerytitle productname productdiscripation blog_detail_content_img" dangerouslySetInnerHTML={{ __html: blogDetail[0].body_markdown }}  />
            <span className="gallerytitle productname productdiscripation blog_detail_content_img" dangerouslySetInnerHTML={{ __html: blogDetail[0].body_html}}  />
            <span className="gallerytitle productname productdiscripation blog_detail_content_img" dangerouslySetInnerHTML={{ __html: blogDetail[0].descripation}}  />
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

export default BlogDetail;
