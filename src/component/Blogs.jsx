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
import AppPagesHeading from "./AppPagesHeading";
import { Helmet } from 'react-helmet';
// react
let topic = "angular"
let originalTopic = "angular"
let title = `Explore ${topic.split('')[0].toUpperCase() + topic.split('').slice(1, topic.length).join("")}: | Market Shops`;
const description = `ngrok provides a secure and easy-to-use solution for exposing your local API to the world. Whether you're developing a web application, testing APIs, or integrating with third-party services, ngrok has got you covered.`;
const keywords = 'ngrok | API Gateway, IoT Device Gateway, Secure Tunnels for Containers, Apps & APIs';

const Blogs = (props) => {
  const [loader, setloader] = useState(true);
  const [blogs, setBlogs] = useState([]);
  const [searchText, setSearchText] = useState("")
  const [blogView, setBlogView] = useState(true);
  const location = useLocation();
  // const[destktopSearch, setDesktopSearch] = useState(undefined)
  const [searchPageString, setSearchPageString] = useState(undefined);
  const [heading, setHeading] = useState(null)
  
 
  const getBlogs = (forSearch = false, forSearchQuery = "") => {
    let getBlogUrl
    console.log("blog page function", topic)
    setloader(true);
    if(forSearch){
      setHeading(forSearchQuery)
      topic = forSearchQuery;
      console.log("checking search text", topic)
      getBlogUrl = `https://dev.to/api/articles?tag=${forSearchQuery}`
      
      let tags = document.querySelectorAll(".app_blog_tag_text")
      Array.from(tags).forEach((tag)=>{
        if(tag === forSearchQuery){
          tag.classList.add("highlight_tag")
        }
      })
     
    }else{
      setHeading(topic)
       getBlogUrl = `https://dev.to/api/articles?tag=${topic}`;
    }
  
    // console.log("manageing blogs", getBlogUrl, forSearchQuery)
    axios.get(getBlogUrl).then((blog) => {
      setloader(false);    
      if(props.componentFrom === "home"){
        // console.log("routes run in home c")
        setBlogs(blog.data.splice(0, 8));
        
        }else{  
      setBlogs(blog.data);
        }
    });
  };
  function highlightTopicAfterRefresh(){
    console.log("hightMobile text")
    let mobileTopics = document.querySelector('.mobile_suggest_topics').children
    
      Array.from(mobileTopics).forEach((topic)=>{
        if(topic){
          topic.classList.remove('active_search_pointer');
        }
      })
   }
  

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
    if(topic === ""){
      document.title = `Explore Blogs: | Market Shops`
    }else{
      document.title = `Explore ${topic.split('')[0].toUpperCase() + topic.split('').slice(1, topic.length).join("")}: | Market Shops`
    }
    // document.title = "Market-Shops Tech Blogs"
    const urlParams = new URLSearchParams(window.location.search);
    const searchText = urlParams.get('query');
    
    // console.log("initalload data", urlParams,searchText)
if(urlParams.size > 0){

getBlogs(true, searchText)

}else{

  getBlogs();
}
console.log("on every time")
    // displayDynamicBlogs()
  }, []);

  useEffect(() => {
    if(topic === ""){
      document.title = `Explore Blogs: | Market Shops`

    }else{
      document.title = `Explore ${topic.split('')[0].toUpperCase() + topic.split('').slice(1, topic.length).join("")}: | Market Shops`
    }

  }, [topic]);

  // this usefffect for every page render operations 
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const searchText = urlParams.get('query');
    // console.log("checking search", searchText)
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

    Array.from(tags).forEach((scrollTag)=>{
          scrollTag.onClick = displayDynamicBlogs()
    })
   
  }, [])

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
   // console.log("first..")
   
    // // console.log("Populate blogs", location.pathname, userSearchQuery, searchParams, location.search)   
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
    setSearchPageString("noSearch")
    // setHeading(originalTopic)
    topic = "angular"
    getBlogs()
    if(document.getElementById('searchTagText')){
      console.log("input placeholder changed")
      // setSearchFillText("Search blogs by tagnames...")
    document.getElementById('searchTagText').value = "" 
    highlightTopicAfterRefresh()

    }
    
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

let tagList = [
  "JavaScript",
  "React",
  "React Native",
  "Programming Languages",
  "Python",
  "Java",
  "Ruby",
  "C#",
  "Go",
  "Rust",
  "TypeScript",

  "Web Development",
  "Frontend",
  "Backend",
  "Fullstack",
  "HTML",
  "CSS",
  "Angular",
  "Vue.js",
  "Node.js",

  "Mobile Development",
  "iOS",
  "Android",
  "Flutter",
  "Swift",
  "Kotlin",
  "Job Hunting",
  "Interviewing",
  "Career Development",
  "Resume Writing",
  "Freelancing",
  "Remote Work",
  "Tech Industry",
  "Open Source",
  "Contributing",
  "Projects",
  "GitHub",
  "Licensing",
  "Hacktoberfest",
  "Community",
  "Security",
  "Cybersecurity",
  "Encryption",
  "Penetration Testing",
  "OWASP",
  "Authentication",
  "SSL/TLS",
  "Vulnerability Management",

  "Tools & Software",
  "VS Code",
  "Git",
  "Command Line",
  "Cloud & DevOps",
  "AWS",
  "Azure",
  "Google Cloud",
  "Docker",
  "Kubernetes",
  "CI/CD",
  "Serverless",
  "Terraform",

  "Data Science & AI",
  "Machine Learning",
  "Data Analysis",
  "Artificial Intelligence",
  "Deep Learning",
  "TensorFlow",
  "Pandas",
  "R",

  "Databases",
  "SQL",
  "NoSQL",
  "MongoDB",
  "PostgreSQL",
  "MySQL",
  "Redis",
  "Elasticsearch",
  "Firebase",
];

  // if (loader === true) {
  //   return (
  //     <>
  //       <Loader></Loader>
  //     </>
  //   );
  // } else {
  return (
    
    <>
    {
      (props.componentFrom !== "home") && 
     <Helmet>
          <title>{title}</title>
          <meta name="description" content={description} />
          <meta name="keywords" content={keywords} />
    </Helmet>
  }
   
    <div className={props.componentFrom === "home"? `container text-left mt-10 app_container p-0`:`container text-left mt-ps90 app_container`}>
      <Alert position="bottom-center"> </Alert>
      {props.componentFrom != "home" &&
      <>
       <SearchBlogs setBlogs={setBlogs} setHeading={setHeading} setloader={setloader} BackBlogHomes={searchPageString}  searchText={searchText} showBlog={showBlog} />
      <ScrollTag tagList={tagList} showBlog={showBlog} />
      
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
    {/* <div
      style={{
        fontSize: "25px",
        fontWeight: "700"
       
      }}
    >
      Flash Blogs
    </div> */}

    <AppPagesHeading heading={(heading) && "Explore "+heading.split('')[0].toUpperCase() + heading.split('').slice(1, heading.length).join("")}   />
    <i
      className={`fa-solid fa-arrow-up-short-wide product_view_icon grid_view`}
      id="blogFilterBtn"
      onClick={toggleBlog}
    ></i>
  </div>
      </>
      }




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
           {/* // console.log("enter in blogs map function", blog); */}
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
                    <h4 className="gallerytitle productname" id="productname" style={{color: "black", fontWeight: 700, lineHeight: "20px"}} title={blog.title}>
                      {(blog.title.length > 29) ? blog.title.slice(0, 29)+ '...' : blog.title}
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
    </>
    
  );
  // }
};

export default Blogs;
