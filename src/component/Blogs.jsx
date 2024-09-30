import { useState, useEffect, useRef  } from "react";
import React from "react";
import Loader from "./Loader";
import Alert from "./Alert";
import { Link, useLocation, useParams } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import defaultBlogImage from "../defaultBlog.jpg";
import SearchBlogs from "./SearchBlogs";

const Blogs = () => {
  const [loader, setloader] = useState(true);
  const [blogs, setBlogs] = useState([]);
  const [searchText, setSearchText] = useState("")
  const [blogView, setBlogView] = useState(true);
  const location = useLocation();
  
  
  const getBlogs = (forSearch = false, forSearchQuery = "") => {
    let getBlogUrl

    if(forSearch){
      getBlogUrl = `https://dev.to/api/articles?tag=${forSearchQuery}`
     
    }else{

       getBlogUrl = "https://dev.to/api/articles";
    }
  
    console.log("manageing blogs", getBlogUrl, forSearchQuery)
    axios.get(getBlogUrl).then((blog) => {
      setloader(false);
      console.log("blog response", blog.data);
      setBlogs(blog.data);
    });
  };
  // it is for one time operations 

  useEffect(() => {
    document.title = "Market-Shops Tech Blogs"
    getBlogs();
  }, []);
  
  // it is for every page render operations 
  useEffect(() => {
    let getSearchText = document.getElementById("searchTagText").innerText
    if(getSearchText){
      setSearchText(getSearchText)
    }
  });

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
   
   
    // console.log("Populate blogs", location.pathname, userSearchQuery, searchParams, location.search)   
    if(location.pathname === "/blogs/search"){
      const userSearchQuery = searchParams.get("query");
      
      getBlogs(true, userSearchQuery)

    }


  }, [location.search]); // Run this effect whenever the search part of the URL changes

  function setUrl(url){
    const newUrl = url;
    window.history.pushState({ path: newUrl }, '', newUrl);
  }
  function showBlog() {    
    setUrl("/blogs")
    getBlogs()
    
  }
  
  function toggleBlog() {
    if (blogView === true) {
      // blogs.reverse()
      // setBlogView(false)
      setloader(true);

      setTimeout(() => {
        blogs.reverse();

        setBlogView(false);
        setloader(false);
      }, 2000);
      document.getElementById("blogFilterBtn").style.backgroundColor = "black";
      document.getElementById("blogFilterBtn").style.color = "white";
    } else {
      setloader(true);

      setTimeout(() => {
        blogs.reverse();

        setBlogView(true);
        setloader(false);
      }, 2000);

      document.getElementById("blogFilterBtn").style.backgroundColor = "#eee";
      document.getElementById("blogFilterBtn").style.color = "black";
    }
  }
  
  const convertTextIntoUrl = (text) => {
    return text
        .toString()
        .toLowerCase()
        .replace(/\s+/g, '-')           // Replace spaces with -
        .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
        .replace(/\-\-+/g, '-')         // Replace multiple - with single -
        .replace(/^-+/, '')             // Trim - from start of text
        .replace(/-+$/, '');            // Trim - from end of text
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
    <div className="container text-left mt-ps90">
      <Alert position="bottom-center"> </Alert>
<SearchBlogs setBlogs={setBlogs} setloader={setloader}  />
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px",
          marginTop: "20px"
        }}
        className="app_product_headline"
      >
        <div
          style={{
            fontSize: "25px",
            fontWeight: "700"
           
          }}
        >
          Flash Blogs
        </div>
        <i
          className={`fa-solid fa-arrow-up-short-wide product_view_icon grid_view`}
          id="blogFilterBtn"
          onClick={toggleBlog}
        ></i>
      </div>

      <div className="row app_blog_main_container px-2" id="app-blog-Container">
        {/* Blog Columns Start Here */}

        {loader === true ? (
          <Loader />
        ) : (
          blogs.length <= 0 ? 
          (
            <>
            <div className="col-md-4 col-sm-12 col-lg-3 blog_content_border app_blogs no_blog_search">
                {/* <Link to={"/blog-detail/"+ blog.id  + "/"  + convertTextIntoUrl(blog.title)}> */}
                <span className="gallerytitle productname productdiscripation text-center">
                    Search for the <strong style={{color: "black"}}>"{searchText}"</strong> 
                    </span> 
                <div className="no_blog_image_found_insearch">
                    {/* <img
                      src="https://e7.pngegg.com/pngimages/65/205/png-clipart-google-s-computer-icons-reverse-search-search-miscellaneous-text-thumbnail.png"
                      id="productimg"
                      alt="" className="make_png"
                    /> */}
                    <i
                        className="fa-solid fa-magnifying-glass-plus f-70"
                     
                      ></i>
                    {/* <span id="productprice" className="productprice">
                      {blog.readable_publish_date}, {blog.published_at.split("-")[0]}
                    </span> */}
                
                  </div>
                  <span className="gallerytitle productname productdiscripation text-center">
                    Blog not available yet stay tuned please try after some time...
                    </span> 
                 
              
                <button className="btn btn-primary mr-1 brand_button search_not_found_button"  onClick={showBlog}>
                       View All Blog                   
                    </button>
                
                </div>
              </> 
          ) :
          blogs.map((blog, i) => {
           {/* console.log("enter in blogs map function", blog); */}
            return (
              <>
                <div className="col-md-4 col-sm-12 col-lg-3 blog_content_border app_blogs" key={blog.id + i}>
                <Link to={"/blog-detail/"+ blog.id  + "/"  + convertTextIntoUrl(blog.title)}>
                <div className="app_blog_cover_container ">
                <div className="galleryimg position-relative">
                    <img
                      src={
                        blog.cover_image && blog.cover_image.length > 0
                          ? blog.cover_image
                          : defaultBlogImage
                      }
                        onError={(e) =>{
                        e.target.src = defaultBlogImage;
                        e.target.alt = "Default image";
                      
                        }}
                      
                      id="productimg"
                      alt=""
                    />
                    <span id="productprice" className="productprice">
                      {blog.readable_publish_date}, {blog.published_at.split("-")[0]}
                    </span>
                  </div>
                  <div className="mediacontent d-inline-block app_blog_text_content_cover">
                    <p className="mb-1 totalgal">Public reactions :- {blog.public_reactions_count}</p>
                    <h4 className="gallerytitle productname" id="productname" style={{color: "black", fontWeight: 700, lineHeight: "20px"}}>
                      {blog.title}
                    </h4>
                    <div className="gallerytitle productname productdiscripation">
                      {blog.description.slice(0, 100)}...
                    </div>
                    <div className="app_blog_tag_container mt-1">
                    {blog.tag_list.map((tag) => (
                    <span className="blog_tags" key={blog.id}>#{tag}</span>
                     ))}
                  
                    </div>
                  </div>
                </div>
                </Link>
                
                </div>
              </>
            );
    
          })
        )}
        {/* Blog Columns End Here */}
      </div>
    </div>
    // </>
  );
  // }
};

export default Blogs;
