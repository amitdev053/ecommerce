import React, { useRef, useState, useEffect } from "react";

const ScrollTag = ({whereFrom,  tagList, showBlog}) => {
  // Ref for the scrollable container
  const ScrollDivTags = useRef(null);
  const [isAtStart, setIsAtStart] = useState(true);
  function nextTag() {
    const container = ScrollDivTags.current;
    if (container) {
      container.scrollLeft += 1000; // Adjust the scroll amount as needed
      hideLeftArrow();
    }
  }
  const hideLeftArrow = () => {
    const container = ScrollDivTags.current;
    if (container) {
      setIsAtStart(container.scrollLeft === 0);
    }
  };
  function prevTag() {
    const container = ScrollDivTags.current;
    if (container) {
      container.scrollLeft -= 1000; // Adjust the scroll amount as needed
      hideLeftArrow();
    }
  }
  useEffect(() => {
    const container = ScrollDivTags.current;
    if (container) {
      container.addEventListener("scroll", hideLeftArrow);
    }
    return () => {
      if (container) {
        container.removeEventListener("scroll", hideLeftArrow);
      }
    };
  }, []);
  
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
      // shareButton.style.backgroundColor = "#ffffff";
      shareButton.style.transform = "scale(1)";
      // shareButton.firstElementChild.style.color = "";
      // shareImage(imageUrl)
          showBlog();
      
    }
    
  }
  function orignalElement(event){
    let shareButton = event?.target;
    if(shareButton){
      // shareButton.style.backgroundColor = "#ffffff";
      shareButton.style.transform = "scale(1)";
      // shareButton.firstElementChild.style.color = "";         
    }    
  }
  return (
    <>
      <div
        className="container d-flex align-items-center st_blog_tag_suggestion position-relative p-0 app_container"
        style={{ height: "60px" }}
      >
        {!isAtStart && (
          <i
            class="fa-solid fa-angle-left position-absolute app_blog_tag_left app_explore_tag_left"
            onClick={prevTag}
          ></i>
        )}

        <div
          className="d-flex align-items-center blog_tag_suggestion"
          ref={ScrollDivTags}
          style={{ scrollBehavior: "smooth" }}
        >
       {whereFrom === "blogs" &&  <span className="d-flex" ><i className="fa-solid fa-house blog_home" onMouseDown={sendClickFeed} onMouseUp={removeClickFeed} onMouseOut={orignalElement}></i></span>}
          {tagList?.map((tag, index) => {
            return (
              <span key={index} className="app_blog_tag_text app_explores_tag_text">
                {tag.charAt(0).toUpperCase() + tag.slice(1)}
              </span>
            );
          })}
        </div>
        <i
          class="fa-solid fa-angle-right position-absolute app_blog_tag_right app_explore_tag_right"
          onClick={nextTag}
        ></i>
      </div>
    </>
  );
};

export default ScrollTag;
