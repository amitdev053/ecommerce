import React, { useContext } from "react";
import { BlogAudioContext } from "./BlogAudioContext";
import { Link, useMatch, useNavigate } from "react-router-dom";
import e from "cors";
import "./BlogAudioPlayer.css";
export default function BlogAudioPlayer() {
  const { isPlaying, currentBlog, isPaused, stopBlog, togglePlayPause, samePage } = useContext(BlogAudioContext);
  const matchRoute  = useMatch("/blog-detail/:blogId/:blogTitle")
  const navigate = useNavigate();
  const style = {
    playerContainer: {
    position: "fixed",
    bottom: "20px",
    right: "40px",
    background: "#fff",
    padding: "10px 8px",
    borderRadius: "8px",
    boxShadow: "0 0 10px rgba(0,0,0,0.2)",
    width: "30%",
    fontWeight: "Roboto",
    zIndex: "99",
    border: "2px solid transparent",
    cursor:"pointer",
  },
  playerStopButton: {
    padding: "5px 10px",
    // background: "red",
    // color: "#fff",
    border: "2px solid transparent",
    cursor: "pointer"
  }, 
  playerCloseButton:{
    float:"right",
    position: "absolute",
    // top: "4px",
    left: "95%",
    padding: "5px",
  },
  playerActionButtons: {
    display:"flex",
    alignItems: "center",
    justifyContent:"center",
    gap: "0px 20px"
  },
  playerTitle:{
    display: "flex",
    position: "relative",
    gap: "0px 5px",
    alignItems: "center",
    color: "black",
    fontWeight: "700",
    fontSize: "14px",
    
    
  },
  playerPlayTitle: {
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    width: "68%",
    overflow: "hidden",
    fontSize: "12px",
    fontWeight: "600",
    color: "black",
  },
 

  }
  if (!isPlaying || !currentBlog) {
    window.speechSynthesis.cancel() 
    return null; // Hide if nothing is playing
    }   

    function navigateBlogDetailPage(event){
      event.stopPropagation();
      // console.log("navigating to blog detail page", currentBlog)
      const blogId = currentBlog.blogId.trim();
      const blogTitle = currentBlog.title;
      const url = `/blog-detail/${blogId}/${blogTitle}`;
      // window.location.href = url;
      navigate(url);
    }


    // console.log("checking same page", samePage)
    if (!samePage || !matchRoute){

    
  return (
    // <Link to={`/blog-detail/${currentBlog.id}/${currentBlog.title}`} className="player_container" style={style.playerContainer}>
    <div className="player_container" style={style.playerContainer} onClick={(event)=>{navigateBlogDetailPage(event)}}>
      <p style={style.playerTitle}><span>Now Playing: <nbsp></nbsp> </span> <div style={style.playerPlayTitle}> {  (currentBlog.title == "")? Object.keys(sessionStorage)[0] :currentBlog.title }</div>   <i class="fa-solid fa-xmark play_close" style={style.playerCloseButton} onClick={(event)=>{
        event.stopPropagation(); stopBlog()}} ></i> </p> 
      <div className="player_action_btns" style={style.playerActionButtons}>
      <button onClick={(e)=>{ e.stopPropagation() ;togglePlayPause()}} style={style.playerStopButton} className="player_button">
      <i className={`${
                 isPaused ? "fa-solid fa-pause" : "fa-solid fa-play"
                }`}></i>
      </button>
      <button onClick={(e)=>{e.stopPropagation();stopBlog()}} style={style.playerStopButton} className="player_button">
      <i class="fa-solid fa-stop"></i>
      </button>
      {/* <button onClick={stopBlog} style={style.playerStopButton}  disabled={isPlaying ? "true" : "false"}>
      <i class="fa-solid fa-play"></i>
      </button> */}


      </div>
    </div>
    // </Link>
    

 
  );
}

}










<>
         {/* <div className="back_header fixed-bottom" style={style.playerContainer}>
         <div className="container  app_blog_back_header app_container  player_container">
         <p style={style.playerTitle}><span>Now Playing: </span> <div style={style.playerPlayTitle}> {  currentBlog.title}</div>   <i className="fa-solid fa-xmark play_close" style={style.playerCloseButton}></i> </p> 
         <div className="player_action_btns" style={style.playerActionButtons}>
      <button onClick={togglePlayPause} style={style.playerStopButton} className="player_button">
      <i className={`${
                 isPaused ? "fa-solid fa-pause" : "fa-solid fa-play"
                }`}></i>
      </button>
      <button onClick={stopBlog} style={style.playerStopButton}  className="player_button">
      <i class="fa-solid fa-stop"></i>
      </button>


      </div>
         </div>
         </div> */}
    </>