import { React, useState, useEffect, useRef } from "react";
import axios from "axios";
import { useLocation, useParams } from 'react-router-dom';

const SearchBlogs = (props) => {
            const searchRef = useRef(null);
            const goSearchIcon = useRef(null);
            const showSuggestedSearch = useRef(null);
            const searchField = useRef(null);
            const searchIcon = useRef(null);
            const [blogsCat, setBlogsCat] = useState([]);
            const [firstCat, setfirstCat] = useState([]);
            const [secoundCat, setSecoundCat] = useState([]);
            const [searchBlogs, setSearchBlogs] = useState([]);
            const location = useLocation();
            const [searchString, setSearchString] = useState("Search blogs by tagnames...");
            const [searchHandleEvent, setSearchHandleEvent] = useState(false);
        

            function refreshSearchString(){
              const searchParams = new URLSearchParams(location.search);
      const userSearchQuery = searchParams.get("query");
      if(location.pathname === "/blogs/search"){
        // setSearchString(userSearchQuery)
        searchRef.current.value = userSearchQuery
        setTimeout(()=>{
          highlightTopicAfterRefresh(userSearchQuery)
        }, 400)
      }
      // setSearchString(props.searchQuery || "Search blog by tagnames...")
      // console.log("search terms",searchParams, searchString)
            }
     useEffect(()=>{
      refreshSearchString()
      console.log("now refresh")
     }, [location.search])
   
     function highlightTopicAfterRefresh(searchText){
      console.log("hightMobile text", searchText)
      let mobileTopics = document.querySelector('.mobile_suggest_topics').children
        Array.from(mobileTopics).forEach((topic)=>{
          if(topic){

            topic.classList.remove('active_search_pointer');
              if(topic.innerText === searchText){
                topic.classList.add('active_search_pointer');
              }
          }
        })
     }
            function setBlogsSearchCategory() {
              let manageBlogsCatJson = {
                categories: [
                  {
                    name: "Programming Languages",
                    subcategories: [
                      "JavaScript",
                      "Python",
                      "Java",
                      "Ruby",
                      "C#",
                      "Go",
                      "Rust",
                      "TypeScript",
                    ],
                  },
                  {
                    name: "Web Development",
                    subcategories: [
                      "Frontend",
                      "Backend",
                      "Fullstack",
                      "HTML",
                      "CSS",
                      "React",
                      "Angular",
                      "Vuejs",
                      "Nodejs",
                    ],
                  },
                  {
                    name: "Mobile Development",
                    subcategories: [
                      "iOS",
                      "Android",
                      "React Native",
                      "Flutter",
                      "Swift",
                      "Kotlin",
                    ],
                  },
                  {
                    name: "Cloud & DevOps",
                    subcategories: [
                      "AWS",
                      "Azure",
                      "Google Cloud",
                      "Docker",
                      "Kubernetes",
                      "CI/CD",
                      "Serverless",
                      "Terraform",
                    ],
                  },
                  {
                    name: "Data Science & AI",
                    subcategories: [
                      "Machine Learning",
                      "Data Analysis",
                      "Artificial Intelligence",
                      "Deep Learning",
                      "TensorFlow",
                      "Pandas",
                      "R",
                    ],
                  },
                  {
                    name: "Databases",
                    subcategories: [
                      "SQL",
                      "NoSQL",
                      "MongoDB",
                      "PostgreSQL",
                      "MySQL",
                      "Redis",
                      "Elasticsearch",
                      "Firebase",
                    ],
                  },
                  {
                    name: "Career Development",
                    subcategories: [
                      "Job Hunting",
                      "Interviewing",
                      "Resume Writing",
                      "Freelancing",
                      "Remote Work",
                      "Tech Industry",
                    ],
                  },
                  {
                    name: "Open Source",
                    subcategories: [
                      "Contributing",
                      "Projects",
                      "GitHub",
                      "Licensing",
                      "Hacktoberfest",
                      "Community",
                    ],
                  },
                  {
                    name: "Security",
                    subcategories: [
                      "Cybersecurity",
                      "Encryption",
                      "Penetration Testing",
                      "OWASP",
                      "Authentication",
                      "SSL/TLS",
                      "Vulnerability Management",
                    ],
                  },
                  {
                    name: "Tools & Software",
                    subcategories: [
                      "VS Code",
                      "Git",
                      "Command Line",
                      "Productivity",
                      "Linux",
                      "IDEs",
                      "Browser Extensions",
                    ],
                  },
                  {
                    name: "Other",
                    subcategories: [
                      "Tech News",
                      "Startups",
                      "Tech Culture",
                      "Programming Humor",
                      "Design",
                      "Ethics in Tech",
                    ],
                  },
                ],
              };
              let showCategory = manageBlogsCatJson.categories.filter(
                (content) => content.name === "Programming Languages"
              );
              let showCatByWeb = manageBlogsCatJson.categories.filter(
                (content) => content.name === "Web Development"
              );
              let showCatByMob = manageBlogsCatJson.categories.filter(
                (content) => content.name === "Mobile Development"
              );

              setBlogsCat(showCategory);
              setfirstCat(showCatByMob);
              setSecoundCat(showCatByWeb);
            }
            useEffect(() => {
              setBlogsSearchCategory();
            }, []);

            function hideSearch() {
              // Outside search field
              // console.log("hideSearch", searchString)
              searchRef.current.blur();
              showSuggestedSearch.current?.classList?.remove("show_search");
              searchField.current?.classList?.remove("active_search");
              showSuggestedSearch.current.classList.add("blog_search_suggected_content");
              // searchRef.current.value =  (searchRef.current.value === "Search blogs by tagnames..." || searchRef.current.value === "") ? searchRef.current.value = "Search blog by tagnames..." : searchRef.current.value;
              searchIcon.current.className = "fa-solid fa-magnifying-glass mr-2 search_icon";
              searchIcon.current.setAttribute("info", "search");
              goSearchIcon.current.style.color = "#edf2fa";                     
              setSearchString(searchString)
             
            
            }
            const handleSearch = () => {
             
              if(!searchHandleEvent &&   searchField.current &&  showSuggestedSearch.current){
                setSearchHandleEvent(true)              
              document.body.addEventListener("click", (e) => {
                      // e.preventDefault();
                      if (e.target.getAttribute("info") === "exitSearch") {
                        hideSearch();
                      }
                      else if (searchField?.current?.contains(e.target) || showSuggestedSearch?.current?.contains(e.target)) {
                        // console.log("click on the search box", e.target)
                       perfromSearch(e)
                      } else {
                        hideSearch();
                      }
              });
            }
            };

            function perfromSearch(event){
              
               if(searchRef.current.value === "Search blogs by tagnames..."){
                 searchRef.current.value = "";             
               }
               searchIcon.current.className = "fa-solid fa-arrow-left mr-2 search_icon";
               searchIcon.current.setAttribute("info", "exitSearch");
               showSuggestedSearch.current.classList.add("show_search");
               searchField.current.classList.add("active_search");
               showSuggestedSearch.current.classList.remove(
                 "blog_search_suggected_content"
               );
               goSearchIcon.current.style.color = "black";
            }
           
            const postSearchRequest = (content, clickedElement,  showSearch) => {
              console.log("caught parameter", content, clickedElement, showSearch)
              let blogHomeIcon = document.querySelectorAll('.blog_home')
              Array.from(blogHomeIcon).forEach((icon)=>{
               icon.style.backgroundColor = "#ffffff"
              })
              document.querySelectorAll('.suggested_content_text').forEach(el => {
                el.classList.remove('active_search_pointer'); // Remove active class from all elements
              });
              if(clickedElement){

                clickedElement?.classList?.add('active_search_pointer'); // Add active class to the clicked element
              }

              searchRef.current.value = content;
              props.setloader(true);
              props.setHeading(content)
              
              const newSearchValue = content.replace(/\s+/g, '');
              let searchText = encodeURIComponent(newSearchValue);
              // console.log("checking content", content);
              //   https://dev.to/api/articles?tag=javascript&top=1
              let getBlogUrl = `https://dev.to/api/articles?tag=${newSearchValue}`;
              // console.log("getBlogUrl", getBlogUrl);
              axios.get(getBlogUrl).then((searchDetails) => {
                props.setloader(false);
                // searchRef.current.blur();
                // searchRef.current.focus();
                searchIcon.current.className = "fa-solid fa-arrow-left mr-2 search_icon";
                searchRef.current.value = showSearch || content;
                // setBlogDetail(bDetails.data);
                setSearchBlogs(searchDetails.data);
                props.setBlogs(searchDetails.data);
                showSuggestedSearch.current.classList.remove("show_search");
                showSuggestedSearch.current.classList.add(
                  "blog_search_suggected_content"
                );
                // console.log(
                //   "search Details response",
                //   searchDetails.data,
                //   searchDetails,
                //   getBlogUrl
                // );
                    // Change the URL without reloading the page
    const newUrl = `/blogs/search?query=${encodeURIComponent(content)}`;
    window.history.pushState({ path: newUrl }, '', newUrl);
    searchRef.current.blur();       // reset the focuse event from the search box

              });
            };
            const handleSearchRequest = () => {
              let searchKey = searchRef.current.value;
              let getUrlKey = searchKey.trim();
              let searchText = encodeURIComponent(getUrlKey);
              // console.log("post seatch content", goSearchIcon);
              if(searchText !== ""){
              console.log("handleSearch request", searchText)
              postSearchRequest(getUrlKey, getUrlKey);
              }
            };
                     
            // useEffect(()=>{
            //   if(props.BackBlogHomes === "noSearch"){
            //         // setSearchString("Search blogs by tagnames...")
            //         searchRef.current.placeholder = "Search blogs by tagnames..."
            //   }
            // }, [])
            function sendClickFeed(event){    
              let shareButton = event.target;
              if(shareButton){
                shareButton.style.backgroundColor = "rgba(43, 52, 69, 0.1)";
                // shareButton.firstElementChild.style.color = "white";
                shareButton.style.transform = "scale(0.9)";
                
                // shareButton.firstElementChild.style.backgroundColor = "white";
              }
              
            }
            function removeClickFeed(event){    
              let shareButton = event?.target;
              if(shareButton){
                shareButton.style.backgroundColor = "#ffffff";
                shareButton.style.transform = "scale(1)";
             
                    props.showBlog();
                    showSuggestedSearch.current.classList.remove("show_search");
                    showSuggestedSearch.current.classList.add(
                      "blog_search_suggected_content"
                    );
                    searchRef.current.blur();       // reset the focuse event from the search box
                
              }
              
            }
            function orignalElement(event){
              let shareButton = event?.target;
              if(shareButton){
                shareButton.style.backgroundColor = "#ffffff";
                shareButton.style.transform = "scale(1)";
                // shareButton.firstElementChild.style.color = "";         
              }    
            }
 

            return (
              <>
                <div className="blog_search_bar_container" ref={searchField}>
                  <div
                    className="blog_search_start d-flex align-items-center"
                    onClick={handleSearch}
                    id="searchBar"
                  >
                    <div className="search_content  d-flex align-items-center flex-grow-1">
                      <i
                        className="fa-solid fa-magnifying-glass mr-2 search_icon"
                        info="search"
                        ref={searchIcon}
                      ></i>
                      <input
                        className="search_text_container outline-none app_search_input_style"
                        spellCheck="false" id="searchTagText"
                        ref={searchRef}
                        placeholder={searchString}
                        autoComplete="off"

                      />
                        {/* {searchString} */}
                      
                    </div>

                    <i
                      className="fa-solid fa-circle-chevron-right app_search_goicon f-16"
                      onClick={handleSearchRequest}
                      ref={goSearchIcon}
                    ></i>
                  </div>
                </div>
                {/* Recommended Categoryies */}
                <div className="blog_search_suggected_content mobile_suggest_topics" ref={showSuggestedSearch}>
                <span className="d-flex" ><i className="fa-solid fa-house blog_mobile_home blog_home" onTouchStart={sendClickFeed} onTouchEnd={removeClickFeed} ></i></span>
                  {blogsCat[0]?.subcategories.map((content, index) => {
                    return (
                      <>
                        <div
                          className="suggested_content_text"
                          key={index}
                          onClick={(event) => {
                            postSearchRequest(content, event.currentTarget);
                          }}
                        >
                          {content}
                        </div>
                      </>
                    );
                  })}
                  {firstCat[0]?.subcategories.map((content, index) => {
                    return (
                      <>
                        <div
                          className="suggested_content_text"
                          key={index}
                          onClick={(event) => {
                            postSearchRequest(content, event.currentTarget);
                          }}
                        >
                          {content}
                        </div>
                      </>
                    );
                  })}
                  {secoundCat[0]?.subcategories.map((content, index) => {
                    
                    return (
                      <>
                        <div
                          className="suggested_content_text"
                          key={index}
                          onClick={(event) => {
                            postSearchRequest(content, event.currentTarget);
                          }}
                        >
                          {content}
                        </div>
                      </>
                    );
                  })}
                </div>


              </>

              
            );
};

export default SearchBlogs;
