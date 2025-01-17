import React from "react";
import { useNavigate } from "react-router-dom";

function ExploreLinkButton() {
  const usenavigate = useNavigate();

  function navigatePage() {
    usenavigate('/explore')
  }
  return (
    <>
    {/* // <div className='d-flex justify-content-center align-items-center my-4'> */}
   
    <span className="brand_button" style={{color: "white", width: "fit-content", padding: "10px 40px 14px 40px", cursor: "pointer", borderRadius: "10px", fontWeight: 600}}onClick={navigatePage}>Explore Trending Images <i class="fa-solid fa-angles-right icon_space"></i></span>
     {/* </div> */}
    </>
  )
}
export default ExploreLinkButton;