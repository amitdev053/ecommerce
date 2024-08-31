import { React, useState, useEffect, useRef } from "react";
import axios from "axios";

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
            const [searchHandleEvent, setSearchHandleEvent] = useState(false);

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
                      "Vue.js",
                      "Node.js",
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
              searchRef.current.blur();
              showSuggestedSearch.current?.classList?.remove("show_search");
              searchField.current?.classList?.remove("active_search");
              showSuggestedSearch.current.classList.add("blog_search_suggected_content");
              searchRef.current.innerText = "Search blog by category";
              searchIcon.current.className = "fa-solid fa-magnifying-glass mr-2 search_icon";
              searchIcon.current.setAttribute("info", "search");
              goSearchIcon.current.style.color = "#edf2fa";
            }
            const handleSearch = () => {
             
              if(!searchHandleEvent &&   searchField.current &&  showSuggestedSearch.current){
                setSearchHandleEvent(true)              
              document.body.addEventListener("click", (e) => {
                      // e.preventDefault();
                      if (e.target.getAttribute("info") === "exitSearch") {
                        hideSearch();
                      } else if (searchField.current.contains(e.target) || showSuggestedSearch.current.contains(e.target)) {
                        // Inside search field or its children
                        searchRef.current.focus();
                        searchRef.current.innerText = "Search";
                        searchIcon.current.className = "fa-solid fa-arrow-left mr-2 search_icon";
                        searchIcon.current.setAttribute("info", "exitSearch");
                        showSuggestedSearch.current.classList.add("show_search");
                        searchField.current.classList.add("active_search");
                        showSuggestedSearch.current.classList.remove(
                          "blog_search_suggected_content"
                        );
                        goSearchIcon.current.style.color = "black";
                      } else {
                        hideSearch();
                      }
              });
            }
            };

           
            const postSearchRequest = (content, showSearch) => {
              props.setloader(true);
              searchRef.current.blur();
              searchRef.current.innerText = content;
              console.log("checking content", content);
              //   https://dev.to/api/articles?tag=javascript&top=1
              let getBlogUrl = `https://dev.to/api/articles?tag=${content}`;
              console.log("getBlogUrl", getBlogUrl);
              axios.get(getBlogUrl).then((searchDetails) => {
                props.setloader(false);
                searchIcon.current.className = "fa-solid fa-arrow-left mr-2 search_icon";
                searchRef.current.innerText = showSearch || content;
                // setBlogDetail(bDetails.data);
                setSearchBlogs(searchDetails.data);
                props.setBlogs(searchDetails.data);
                showSuggestedSearch.current.classList.remove("show_search");
                showSuggestedSearch.current.classList.add(
                  "blog_search_suggected_content"
                );
                console.log(
                  "search Details response",
                  searchDetails.data,
                  searchDetails,
                  getBlogUrl
                );
              });
            };
            const handleSearchRequest = () => {
              let searchKey = searchRef.current.innerText;
              let getUrlKey = searchKey.trim();
              let goSearchIcon = encodeURIComponent(getUrlKey);
              console.log("post seatch content", goSearchIcon);

              postSearchRequest(goSearchIcon, getUrlKey);
            };

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
                      <div
                        className="search_text_container outline-none"
                        contentEditable="true"
                        ref={searchRef}
                      >
                        Search blog by category
                      </div>
                    </div>

                    <i
                      className="fa-solid fa-circle-chevron-right app_search_goicon"
                      onClick={handleSearchRequest}
                      ref={goSearchIcon}
                    ></i>
                  </div>
                </div>
                {/* Recommended Categoryies */}
                <div className="blog_search_suggected_content " ref={showSuggestedSearch}>
                  {blogsCat[0]?.subcategories.map((content, index) => {
                    return (
                      <>
                        <div
                          className="suggested_content_text"
                          key={index}
                          onClick={() => {
                            postSearchRequest(content);
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
                          onClick={() => {
                            postSearchRequest(content);
                          }}
                        >
                          {content}
                        </div>
                      </>
                    );
                  })}
                  {secoundCat[0]?.subcategories.map((content, index) => {
                    console.log("suugested content", content);
                    return (
                      <>
                        <div
                          className="suggested_content_text"
                          key={index}
                          onClick={() => {
                            postSearchRequest(content);
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
