import { useState, useEffect, useRef  } from "react";
import React from "react";
import Loader from "./Loader";
import Alert from "./Alert";
import { Link, useLocation, useParams } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import defaultBlogImage from "../defaultBlog.jpg";
import SearchBlogs from "./SearchBlogs";
import desktopicon from '../appimages/desktopicon.png'
import ScrollTag from "./ScrollTag";

const Blogs = () => {
  const [loader, setloader] = useState(true);
  const [blogs, setBlogs] = useState([]);
  const [searchText, setSearchText] = useState("")
  const [blogView, setBlogView] = useState(true);
  const location = useLocation();
  const[destktopSearch, setDesktopSearch] = useState(undefined)
  const [searchPageString, setSearchPageString] = useState(undefined);
  
  
  const getBlogs = (forSearch = false, forSearchQuery = "") => {
    let getBlogUrl
    // let loader = document.querySelector(".loader")
    // loader.classList.add('margin_top_setzero')
    setloader(true);
    if(forSearch){
      console.log("checking search text", forSearchQuery)
      getBlogUrl = `https://dev.to/api/articles?tag=${forSearchQuery}`
      
      let tags = document.querySelectorAll(".app_blog_tag_text")
      tags.forEach((tag)=>{
        if(tag === forSearchQuery){
          tag.classList.add("highlight_tag")
        }
      })
     
    }else{

       getBlogUrl = "https://dev.to/api/articles";
    }
  
    console.log("manageing blogs", getBlogUrl, forSearchQuery)
    axios.get(getBlogUrl).then((blog) => {
      setloader(false);
      // console.log("blog response", blog.data);
      setBlogs(blog.data);
    });
  };
  
  // function displayDynamicBlogs(){
  //   let tagNames = document.querySelectorAll('.app_blog_tag_text')
     
  //   tagNames.forEach((tag) => {
  //     tag.classList.remove('highlight_tag')
  //   })
 
  //   tagNames.forEach((tag)=>{  
  //     tag.addEventListener("click", (e)=>{
  //      console.log("clicked on tags...", tag, e.target)
  //      e.target.classList.add("highlight_tag")
  //           getBlogs(true, tag.innerText)
            

  //     })
    

  //   })
  // }
  function displayDynamicBlogs() {
    let tagNames = document.querySelectorAll('.app_blog_tag_text');
  
    tagNames.forEach((tag) => {
      tag.replaceWith(tag.cloneNode(true)); // Clone the tag to remove all listeners
    });
  
    tagNames = document.querySelectorAll('.app_blog_tag_text'); // Re-query after replacing elements
  
    tagNames.forEach((tag) => {
      tag.addEventListener("click", (e) => {
        
        tagNames.forEach((tag) => tag.classList.remove('highlight_tag'));     
     
    
        e.target.classList.add("highlight_tag");          
        getBlogs(true, tag.innerText);
      
      const newUrl = `/blogs/suggest?query=${encodeURIComponent(tag.innerText)}`;
        
       
        // Call the getBlogs function
        window.history.pushState({ path: newUrl }, '', newUrl);
    
      });
    });
  }



  useEffect(() => {
    document.title = "Market-Shops Tech Blogs"
    getBlogs();
    displayDynamicBlogs()
  }, []);
  
  // it is for every page render operations 
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const searchText = urlParams.get('query');
    console.log("checking search", searchText)
    if(searchText){
      setSearchText(searchText)
    }

  });

  useEffect(()=>{
    const urlParams = new URLSearchParams(window.location.search);
    const searchText = urlParams.get('query');
    const tags = document.querySelectorAll('.app_blog_tag_text')
    
    if(location.pathname === "/blogs/suggest"){
      getBlogs(true, searchText)
      tags.forEach((tag)=>{
        if(tag.innerText === searchText){
          tag.classList.add('highlight_tag')
        }
      })
      
    }
   
  }, [])

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
   console.log("first..")
   
    // console.log("Populate blogs", location.pathname, userSearchQuery, searchParams, location.search)   
    if(location.pathname === "/blogs/search"){
      const userSearchQuery = searchParams.get("query");
      
      getBlogs(true, userSearchQuery)

    }
    // else if(location.pathname === "/blogs/suggest"){
    //   const userSearchQuery = searchParams.get("query");
    //   getBlogs(true, userSearchQuery)

    // }


  }, [location.search]); // Run this effect whenever the search part of the URL changes


  function setUrl(url){
    const newUrl = url;
    window.history.pushState({ path: newUrl }, '', newUrl);
  }
  function showBlog() {    
    setUrl("/blogs")

    const tags = document.querySelectorAll('.app_blog_tag_text')
    tags.forEach((tag)=>{
      if(tag.classList.contains("highlight_tag")){
        tag.classList.remove("highlight_tag")
      }
    })
    setSearchPageString("Search blog by tagnames...")
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
    <div className="container text-left mt-ps90 app_container">
      <Alert position="bottom-center"> </Alert>
<SearchBlogs setBlogs={setBlogs} setloader={setloader}  />
<ScrollTag />
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
          <Loader setPropClass="margin_top_setzero" />
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
                    <span id="productprice" className="productprice w-100">
                     <date> {blog.readable_publish_date}, {blog.published_at.split("-")[0]} </date>

                      {/* <i class="fa-solid fa-play  product_like"></i> */}
                    </span>
                  </div>
                  <div className="mediacontent d-inline-block app_blog_text_content_cover">
                    <p className="mb-1 totalgal">Public reactions :- {blog.public_reactions_count}</p>
                    <h4 className="gallerytitle productname" id="productname" style={{color: "black", fontWeight: 700, lineHeight: "20px"}}>
                      {(blog.title.length > 30) ? blog.title.slice(0, 30)+ '...' : blog.title}
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
