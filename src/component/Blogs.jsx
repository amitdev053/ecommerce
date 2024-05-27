import { useState, useEffect } from "react";
import React from "react";
import Loader from "./Loader";
import Alert from "./Alert";
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
import defaultBlogImage from '../defaultBlog.jpg'


const Blogs = () => {
  const [loader, setloader] = useState(true);
  const [blogs, setBlogs] = useState([])
const [blogView, setBlogView] = useState(true)


  const getBlogs= ()=>{
    let getBlogUrl = "https://dev.to/api/articles"
    axios.get(getBlogUrl).then((blog)=>{
      setloader(false)
        console.log("blog response", blog)
        setBlogs(blog.data)

    })

  }

 
  useEffect(()=>{
    getBlogs()   
   
  }, [])


  function  toggleBlog(){
    
    
    if(blogView === true){
     
      // blogs.reverse()
      // setBlogView(false)
      setloader(true)

      setTimeout(()=>{
        blogs.reverse()
      
        setBlogView(false)
        setloader(false)
      
      }, 2000)
      document.getElementById('blogFilterBtn').style.backgroundColor = "black"
      document.getElementById('blogFilterBtn').style.color = "white"
    }else{
      setloader(true)

setTimeout(()=>{
  blogs.reverse()

  setBlogView(true)
  setloader(false)

}, 2000)

    document.getElementById('blogFilterBtn').style.backgroundColor = "#eee"
    document.getElementById('blogFilterBtn').style.color = "black"   
  
    }

  }


  // if (loader === true) {
  //   return (
  //     <>
  //       <Loader></Loader>
  //     </>
  //   );
  // } else {
    return (
      // <>
        <div className="container text-left mt-74">
          <Alert position="bottom-center"> </Alert>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
            className="app_product_headline"
          >
            <div
              style={{
                fontSize: "25px",
                fontWeight: "700",
                marginBottom: "20px",
              }}
            >
              Flash Blogs
            </div>
            <i
              className={`fa-solid fa-arrow-up-short-wide product_view_icon grid_view`}
              id="blogFilterBtn" onClick={toggleBlog}
            ></i>
          </div>

          <div className="row" id="ProductContainer">
            {/* Blog Columns Start Here */}

         { (loader === true) ? <Loader />  : blogs.length > 1 && blogs.map((blog, i)=>{
          
            console.log("enter in blogs map function", blog)
            return(
                <>
                <div className="col-md-3 col-sm-12 gallerycol" key={blog.id}>
              <div className="galleryimg position-relative">
                <img
                  src={(blog.cover_image && blog.cover_image.length > 0 ? blog.cover_image : defaultBlogImage)}
                  id="productimg"
                  alt=""
                />
                <span id="productprice" className="productprice">
                  Blog Date
                </span>
              </div>
              <div className="mediacontent d-inline-block">
                <p className="mb-1 totalgal">Blogs Rating</p>
                <h4 className="gallerytitle productname" id="productname">
                    {blog.title }                 
                </h4>
                <div
                  className="gallerytitle productname productdiscripation"
                  id="productname"
                >
                {blog.description.slice(0, 100)}...
                </div>
              </div>
            </div>
                </>
            )
         })}
            {/* Blog Columns End Here */}


          </div>
        </div>
      // </>
    );
  // }
};

export default Blogs;
