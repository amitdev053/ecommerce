import "./expore.css";
import React, { useEffect, useState, useContext } from "react";
import Loader from "./Loader";
import ScrollTag from "./ScrollTag"; // Add this line to import ScrollTag
import AppPagesHeading from "./AppPagesHeading"; // Add this line to import AppPagesHeading
import axios from "axios";
import EmptyCartImage from "../appimages/empty_cart.webp";
import defaultBlogImage from "../defaultBlog.jpg";
import ExploreLinkButton from "./ExploreLinkButton";
import { handleShare } from "./HandleShare";



const Explore = (props) => {
  // let content = [ "couples", "Fashion", "Sports", "Music", "Gaming", "Technology", "Health", "Finance", "Education", "Lifestyle"]
  let content = [
    "kiss", "Fashion", "Sports", "Music", "Gaming", "Technology", "Health", "Finance", "Education", "Lifestyle", "Travel and Adventure",  "Art and Creativity", "hugs", "Nature and Wildlife", "Food and Culinary", "History and Culture","Fitness and Wellness", "Architecture and Design","Space and Astronomy", "Books and Literature",
    "Motivation and Productivity",  "Luxury and Lifestyle",  "Science and Innovation",   "Minimalism and Aesthetics", "Photography and Videography",  "New Year",
    "DIY and Crafting",  "Sustainability and Eco-living", "Hobbies and Skills",  "Vintage and Retro", "couples"
  ];


  

  const [index, setIndex] = useState(0);
  const [loader, setloader] = useState(true);
  const [images, setImages] = useState([]); // assume this is where you get your images
  const [imageStates, setImageStates] = useState([]);

 

  const baseUrl = `https://pixabay.com/api/?key=45283300-eddb6d21a3d3d06f2a2381d7d&q=${content[index]}&image_type=photo`


  function getProducts(url) {
    fetch(url)
      .then((response) => {
        setloader(false);
        // console.log("response", response);
        return response.json();
      })
      .then((result) => {
        // // console.log("products product.js", result);
        if(props.componentFrom === "home"){
// console.log("routes run in home c")
setImages(result.hits.splice(0, 6));

}else{
          // console.log("routes not run in home c")
          setImages(result.hits);
          // console.log("explore images", result.hits);

        }
      });
  }
 
function addImageTouch(){
  // transform: scale(1.5);
  // transform-origin: center;
  let exploreImage = document.querySelectorAll('.explore_image')
  Array.from(exploreImage).forEach((item)=>{
    item.addEventListener('touchstart', ()=>{
      item.firstElementChild.style.transform = 'scale(1.5)';
      item.firstElementChild.style.transformOrigin = 'center';
    })
    item.addEventListener('touchend', ()=>{
      item.firstElementChild.style.transform = 'scale(1)';
      item.firstElementChild.style.transformOrigin = 'center';
    })
  })
}

  useEffect(() => { 
   
    // Set the initial index
    let currentCalculatedIndex = updatedHours();
    setIndex(updatedHours());
    document.title = `Explore images for ${content[currentCalculatedIndex]}`;
    // Fetch images for the initial index
    getProducts(`https://pixabay.com/api/?key=45283300-eddb6d21a3d3d06f2a2381d7d&q=${content[currentCalculatedIndex]}&image_type=photo`);
    
    
    addImageTouch();
    // Update the index every hour
    const interval = setInterval(() => {
      setIndex(updatedHours());
    }, 60 * 60 * 1000); // 1 hour in milliseconds

    // Cleanup the interval on component unmount
    return () => clearInterval(interval);
  }, []);

  // useEffect(() => {
  //   setImageStates(images.map(() => ({ loaded: false })));
  // }, [images, index]);
  useEffect(() => {
    setImageStates((prevStates) =>
      images.map((_, i) => prevStates[i] || { loaded: false })
    );
  }, [images]);

  function updatedHours(){
    const referenceTime = new Date("2025-01-01T00:00:00Z").getTime();
    // Function to calculate the current index based on elapsed hours 
      const currentTime = Date.now();
      const hoursElapsed = Math.floor((currentTime - referenceTime) / (60 * 60 * 1000));
      // console.log("calc index", hoursElapsed % content.length);
      content.forEach((element, index) => {
        if(index === hoursElapsed % content.length){
          // console.log("element", element)
        }
      })
      return hoursElapsed % content.length;
   
  }
function shareImage(image){
  let currentCalculatedIndex = updatedHours();
  handleShare(content[currentCalculatedIndex],"", image, "explore");
}
  // Fetch images whenever the index changes
  useEffect(() => {
   let currentCalculatedIndex = updatedHours();
    getProducts(`https://pixabay.com/api/?key=45283300-eddb6d21a3d3d06f2a2381d7d&q=${content[currentCalculatedIndex]}&image_type=photo`);
    setImageStates(images.map(() => ({ loaded: false })));
  }, [index]);

  function sendClickFeed(event){    
    let shareButton = event?.currentTarget;
    if(shareButton){
      shareButton.firstElementChild.style.backgroundColor = "#05050524";
      shareButton.firstElementChild.style.color = "white";
   
    }
    
  }
  function removeClickFeed(event, imageUrl){    
    let shareButton = event?.currentTarget;
    if(shareButton){
      shareButton.firstElementChild.style.backgroundColor = "white";
      shareButton.firstElementChild.style.color = "";
      shareImage(imageUrl)
      
    }
    
  }
  function orignalElement(event){
    let shareButton = event?.currentTarget;
    if(shareButton){
      shareButton.firstElementChild.style.backgroundColor = "white";
      shareButton.firstElementChild.style.color = "";         
    }    
  }


  if (loader === true) {
    return (
      <>
        <Loader></Loader>
      </>
    );
  } else {
    return (
      <>
 <div  className={props.componentFrom === "home" ? 'pinterest-layout' : 'pinterest-layout mt-ps90'}>
      {images.map((image, index) => {
        if (!imageStates[index]) return null; // add this line
        const { loaded } = imageStates[index];

        return (
          <div className={props.componentFrom === "home" ? 'column position-relative explore_image width_31':'column position-relative explore_image'} key={image.id}>      
          

            <img
              src={image.largeImageURL}
              // onLoad={() =>
              //   setImageStates((prevStates) =>
              //     prevStates.map((state, i) =>
              //       i === index ? { loaded: true } : state
              //     )
              //   )
              // }

              onLoad={() => {
  setImageStates((prevStates) => {
    const newState = [...prevStates]; // Clone state to avoid mutation
    newState[index] = { loaded: true }; // Update only the specific image
    return newState;
  });
}}
              onError={(e) =>{
                        e.target.src = defaultBlogImage;
                        e.target.alt = "Default image";
                      
                        }}
           
                      alt="Could'nt load"
           
            />
            
          
            {!loaded && <div className="app_loader" />}

            <div className="explore_icons position-absolute ">
            <div className="explore_like_content d-flex align-items-center">
              <i className="fa-solid fa-heart"></i>
              <span className="explore_fonts mx-1">{image.likes}</span>
            </div>            
            <div className="explore_like_content d-flex align-items-center">
            <i class="fa-regular fa-eye"></i>
              <span className="explore_fonts mx-1">{image.views}</span>
            </div>            
            <div className="explore_like_content d-flex align-items-center">
            <i class="fa-solid fa-download"></i>
              <span className="explore_fonts mx-1">{image.downloads}</span>
            </div>                  
            </div>

            <div className="explore_like_content d-flex align-items-center position-absolute explore_images_share" onTouchStart={sendClickFeed} onTouchEnd={(event)=>{removeClickFeed(event, image.webformatURL)}} onMouseUp={(event)=>{removeClickFeed(event, image.webformatURL)}} onMouseDown={sendClickFeed} onMouseOut={orignalElement} >
            <i class="fa-solid fa-share explore_image_share_icon"></i>
            </div>    
          </div>
        );
      })}
    {/* {props.componentFrom === "home" ? <ExploreLinkButton /> : null} */}
    </div>
      </>
    );
  }
};

export default Explore;
