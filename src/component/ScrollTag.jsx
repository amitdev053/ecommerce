import React, { useRef, useState, useEffect } from "react";

const ScrollTag = ({tagList}) => {
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
  return (
    <>
      <div
        className="container d-flex align-items-center st_blog_tag_suggestion position-relative p-0 app_container"
        style={{ height: "60px" }}
      >
        {!isAtStart && (
          <i
            class="fa-solid fa-angle-left position-absolute app_blog_tag_left"
            onClick={prevTag}
          ></i>
        )}

        <div
          className="d-flex align-items-center blog_tag_suggestion"
          ref={ScrollDivTags}
          style={{ scrollBehavior: "smooth" }}
        >
          {tagList?.map((tag, index) => {
            return (
              <span key={index} class="app_blog_tag_text">
                {tag}
              </span>
            );
          })}
        </div>
        <i
          class="fa-solid fa-angle-right position-absolute app_blog_tag_right"
          onClick={nextTag}
        ></i>
      </div>
    </>
  );
};

export default ScrollTag;
