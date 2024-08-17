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
      console.log("blog Details response", bDetails.data, blogDetail);
    });

    axios.get("https://market-shops.vercel.app/backend/getuser").then((userData) => {  
      console.log("my apies user data", userData);
    });
  }
  useEffect(()=>{
      // let fullTitle = blogId.blogTitle.substring(1
    
    getBlogDetails()
setTimeout(()=>{
      
      let fullTitle = blogDetail[0].title.substring(1)  
          document.title = blogId.blogTitle.split("")[0].toUpperCase() + fullTitle
      }, 2000)

  }, [])

  if (loader === true) {
    return (
      <>
        <Loader></Loader>
      </>
    );
  } else {
  return (
    <>
      <div className="app_detail_blog_container container mt-ps90 ">
      <div class="row p-0 w-100 d-flex align-items-center overflow-hidden">
    

          {/* blog user action  starts Here*/}
          <div className="col-1 blog_user_action">
            {/* <div className="user_action d-flex flex-columns">
              <div className="action">
              <svg   xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  role="img"
                  aria-hidden="true"
                  class="crayons-icon"
                >
                  <g clip-path="url(#clip0_988_3276)">
                    <path
                      d="M19 14V17H22V19H18.999L19 22H17L16.999 19H14V17H17V14H19ZM20.243 4.75698C22.505 7.02498 22.583 10.637 20.479 12.992L19.059 11.574C20.39 10.05 20.32 7.65998 18.827 6.16998C17.324 4.67098 14.907 4.60698 13.337 6.01698L12.002 7.21498L10.666 6.01798C9.09103 4.60598 6.67503 4.66798 5.17203 6.17198C3.68203 7.66198 3.60703 10.047 4.98003 11.623L13.412 20.069L12 21.485L3.52003 12.993C1.41603 10.637 1.49503 7.01898 3.75603 4.75698C6.02103 2.49298 9.64403 2.41698 12 4.52898C14.349 2.41998 17.979 2.48998 20.242 4.75698H20.243Z"
                      fill="#525252"
                    ></path>
                  </g>
                  <defs>
                    <clipPath id="clip0_988_3276">
                      <rect width="24" height="24" fill="white"></rect>
                    </clipPath>
                  </defs>
                </svg>
<span>Like count</span>
              </div>
              <div className="action">
              <svg   xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  role="img"
                  aria-hidden="true"
                  class="crayons-icon"
                >
                  <g clip-path="url(#clip0_988_3276)">
                    <path
                      d="M19 14V17H22V19H18.999L19 22H17L16.999 19H14V17H17V14H19ZM20.243 4.75698C22.505 7.02498 22.583 10.637 20.479 12.992L19.059 11.574C20.39 10.05 20.32 7.65998 18.827 6.16998C17.324 4.67098 14.907 4.60698 13.337 6.01698L12.002 7.21498L10.666 6.01798C9.09103 4.60598 6.67503 4.66798 5.17203 6.17198C3.68203 7.66198 3.60703 10.047 4.98003 11.623L13.412 20.069L12 21.485L3.52003 12.993C1.41603 10.637 1.49503 7.01898 3.75603 4.75698C6.02103 2.49298 9.64403 2.41698 12 4.52898C14.349 2.41998 17.979 2.48998 20.242 4.75698H20.243Z"
                      fill="#525252"
                    ></path>
                  </g>
                  <defs>
                    <clipPath id="clip0_988_3276">
                      <rect width="24" height="24" fill="white"></rect>
                    </clipPath>
                  </defs>
                </svg>
<span>Comment</span>
                
              </div>
              <div className="action">   <svg   xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  role="img"
                  aria-hidden="true"
                  class="crayons-icon"
                >
                  <g clip-path="url(#clip0_988_3276)">
                    <path
                      d="M19 14V17H22V19H18.999L19 22H17L16.999 19H14V17H17V14H19ZM20.243 4.75698C22.505 7.02498 22.583 10.637 20.479 12.992L19.059 11.574C20.39 10.05 20.32 7.65998 18.827 6.16998C17.324 4.67098 14.907 4.60698 13.337 6.01698L12.002 7.21498L10.666 6.01798C9.09103 4.60598 6.67503 4.66798 5.17203 6.17198C3.68203 7.66198 3.60703 10.047 4.98003 11.623L13.412 20.069L12 21.485L3.52003 12.993C1.41603 10.637 1.49503 7.01898 3.75603 4.75698C6.02103 2.49298 9.64403 2.41698 12 4.52898C14.349 2.41998 17.979 2.48998 20.242 4.75698H20.243Z"
                      fill="#525252"
                    ></path>
                  </g>
                  <defs>
                    <clipPath id="clip0_988_3276">
                      <rect width="24" height="24" fill="white"></rect>
                    </clipPath>
                  </defs>
                </svg>
<span>More</span>


              </div>

        
            </div> */}
          </div>
          {/* blog user action  end Here*/}
          {/* blog details appear starts Here*/}
          <div className="col-10 blog_user_action w-100 blog_detail_full_content">
          <h2  style={{
            fontSize: "25px",
            fontWeight: "700",
            
            lineHeight: "30px"
           
          }}> {blogDetail[0].title}</h2>
            <div className="blog_content_top_img w-100">
              <img src={
                        blogDetail[0].cover_image && blogDetail[0].cover_image.length > 0
                          ? blogDetail[0].cover_image
                          : defaultBlogImage
                      } className="img-fluid blog_detail_top_image w-100" height="500px"alt="" />
            </div>
            
            <span className="gallerytitle productname productdiscripation blog_detail_content_img" dangerouslySetInnerHTML={{ __html: blogDetail[0].body_markdown }}  />
            <span className="gallerytitle productname productdiscripation blog_detail_content_img" dangerouslySetInnerHTML={{ __html: blogDetail[0].body_html}}  />
            <span className="gallerytitle productname productdiscripation blog_detail_content_img" dangerouslySetInnerHTML={{ __html: blogDetail[0].descripation}}  />

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
