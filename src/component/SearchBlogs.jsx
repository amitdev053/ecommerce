import { React, useState, useEffect, useRef  } from "react";
import axios from "axios";

const SearchBlogs = (props) => {
    const searchRef = useRef(null);
    const setSearch = useRef(null);
    const showSuggestedSearch = useRef(null);
    const [blogsCat, setBlogsCat] = useState([])
    const [firstCat, setfirstCat] = useState([])
    const [secoundCat, setSecoundCat] = useState([])
    const [searchBlogs, setSearchBlogs] = useState([]);
    const handleSearch = ()=>{
 
        searchRef.current.innerText = ""
         document.getElementById("root").addEventListener('click', (e)=>{
           console.log("handle search", e.target.className)
           if(e.target.id === "searchBar" || e.target ===  searchRef.current || e.target ===  showSuggestedSearch.current){
             searchRef.current.innerText = ""
             // setSearch = true
             showSuggestedSearch.current.classList.add('show_search')
             showSuggestedSearch.current.classList.remove('blog_search_suggected_content')
               setSearch.current.style.color = "black"
          
           }else if(e.target.className === "suggested_content_text"){

           }else{
            showSuggestedSearch.current.classList.remove('show_search')
            showSuggestedSearch.current.classList.add('blog_search_suggected_content')
             searchRef.current.innerText = "Search blog by category"
       
               setSearch.current.style.color = "#edf2fa"
           }
         })
       }
       function setBlogsSearchCategory(){
        let manageBlogsCatJson = {
            "categories": [
              {
                "name": "Programming Languages",
                "subcategories": [
                  "JavaScript",
                  "Python",
                  "Java",
                  "Ruby",
                  "C#",
                  "Go",
                  "Rust",
                  "TypeScript"
                ]
              },
              {
                "name": "Web Development",
                "subcategories": [
                  "Frontend",
                  "Backend",
                  "Fullstack",
                  "HTML",
                  "CSS",
                  "React",
                  "Angular",
                  "Vue.js",
                  "Node.js"
                ]
              },
              {
                "name": "Mobile Development",
                "subcategories": [
                  "iOS",
                  "Android",
                  "React Native",
                  "Flutter",
                  "Swift",
                  "Kotlin"
                ]
              },
              {
                "name": "Cloud & DevOps",
                "subcategories": [
                  "AWS",
                  "Azure",
                  "Google Cloud",
                  "Docker",
                  "Kubernetes",
                  "CI/CD",
                  "Serverless",
                  "Terraform"
                ]
              },
              {
                "name": "Data Science & AI",
                "subcategories": [
                  "Machine Learning",
                  "Data Analysis",
                  "Artificial Intelligence",
                  "Deep Learning",
                  "TensorFlow",
                  "Pandas",
                  "R"
                ]
              },
              {
                "name": "Databases",
                "subcategories": [
                  "SQL",
                  "NoSQL",
                  "MongoDB",
                  "PostgreSQL",
                  "MySQL",
                  "Redis",
                  "Elasticsearch",
                  "Firebase"
                ]
              },
              {
                "name": "Career Development",
                "subcategories": [
                  "Job Hunting",
                  "Interviewing",
                  "Resume Writing",
                  "Freelancing",
                  "Remote Work",
                  "Tech Industry"
                ]
              },
              {
                "name": "Open Source",
                "subcategories": [
                  "Contributing",
                  "Projects",
                  "GitHub",
                  "Licensing",
                  "Hacktoberfest",
                  "Community"
                ]
              },
              {
                "name": "Security",
                "subcategories": [
                  "Cybersecurity",
                  "Encryption",
                  "Penetration Testing",
                  "OWASP",
                  "Authentication",
                  "SSL/TLS",
                  "Vulnerability Management"
                ]
              },
              {
                "name": "Tools & Software",
                "subcategories": [
                  "VS Code",
                  "Git",
                  "Command Line",
                  "Productivity",
                  "Linux",
                  "IDEs",
                  "Browser Extensions"
                ]
              },
              {
                "name": "Other",
                "subcategories": [
                  "Tech News",
                  "Startups",
                  "Tech Culture",
                  "Programming Humor",
                  "Design",
                  "Ethics in Tech"
                ]
              }
            ]
          }
        let showCategory =   manageBlogsCatJson.categories.filter((content)=> content.name === "Programming Languages")
        let showCatByWeb =   manageBlogsCatJson.categories.filter((content)=> content.name === "Web Development")
        let showCatByMob =   manageBlogsCatJson.categories.filter((content)=> content.name === "Mobile Development")
  
         setBlogsCat(showCategory)
         setfirstCat(showCatByMob)
         setSecoundCat(showCatByWeb)
       }
       useEffect(()=>{
        setBlogsSearchCategory()
        }, [])
        const postSearchRequest = (content)=>{
            props.setloader(true)
            console.log("post seatch content", content)
              searchRef.current.innerText = content
            //   https://dev.to/api/articles?tag=javascript&top=1
            let getBlogUrl = `https://dev.to/api/articles?tag=${content}`;
    axios.get(getBlogUrl).then((searchDetails) => {
      props.setloader(false);
      // setBlogDetail(bDetails.data);
      setSearchBlogs(searchDetails.data)
      props.setBlogs(searchDetails.data)
    
      console.log("search Details response", searchDetails.data, searchDetails, getBlogUrl);
    });
        }

  return (
    <>
    <div className="blog_search_bar_container p-2">
    <div className="blog_search_start d-flex align-items-center" onClick={handleSearch} id="searchBar"> 
  <div className="search_content  d-flex align-items-center flex-grow-1">
  <i className="fa-solid fa-magnifying-glass mr-2 search_icon"></i>
  <div className="search_text_container outline-none" contentEditable="true" ref={searchRef}>Search blog by category</div>
  </div>
  
  
    <i className="fa-solid fa-circle-chevron-right app_search_goicon"  ref={setSearch}></i>
  
    </div>
  
    </div>
    {/* Recommended Categoryies */}
    <div className="blog_search_suggected_content " ref={showSuggestedSearch}>
 
    
    {blogsCat[0]?.subcategories.map((content, index)=>{
        console.log("suugested content", content)
        return(
            <>
<div className="suggested_content_text" key={index} onClick={()=>{postSearchRequest(content)}}>{content}</div>
                
            </>
        )
    })}
    {firstCat[0]?.subcategories.map((content, index)=>{
        console.log("suugested content", content)
        return(
            <>
<div className="suggested_content_text" key={index} onClick={()=>{postSearchRequest(content)}}>{content}</div>
                
            </>
        )
    })}
    {secoundCat[0]?.subcategories.map((content, index)=>{
        console.log("suugested content", content)
        return(
            <>
<div className="suggested_content_text" key={index} onClick={()=>{postSearchRequest(content)}}>{content}</div>
                
            </>
        )
    })}
    
    </div>
    </>

  )
}

export default SearchBlogs