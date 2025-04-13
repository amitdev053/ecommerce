import "./expore.css";
import React, { useEffect, useState, useContext, useRef } from "react";
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
    "kiss", "Fashion", "Sports", "Music", "Gaming", "Technology", "Health", "Finance", "Education", "Lifestyle", "Travel and Adventure",  "Art and Creativity", "hugs", "Nature and Wildlife", "Food and Culinary", "History and Culture","Fitness and Wellness", "Architecture and Design","Space and Astronomy", "Books and Literature", "Motivation and Productivity",  "Luxury and Lifestyle",  "Science and Innovation",   "Minimalism and Aesthetics", "romantic",  "Sibling Love", "Date Night",  "Valentine", "Hobbies and Skills",  "Rose", "couples"
  ];


  

  const [index, setIndex] = useState(0);
  const [blogView, setBlogView] = useState(true);
  const [loader, setloader] = useState(true);
  const [images, setImages] = useState([]); // assume this is where you get your images
  const [imageStates, setImageStates] = useState([]);
  const blogColRef = useRef([])
  const [pageState, setPageState] = useState(1)
  const exploreRef = useRef(null)

 

  const baseUrl = `https://pixabay.com/api/?key=45283300-eddb6d21a3d3d06f2a2381d7d&q=${content[index]}&image_type=photo`


  function getProducts(url) {
    // let finalUrl = url + `&page=${page}`
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
console.log("explore images", result.hits);
setImages(result.hits.splice(0, 7));

}else{
          // console.log("routes not run in home c")
          // setImages(result.hits);
          const indexedHits = result.hits.map((img, i) => ({
            ...img,
            _orderIndex: images.length + i, // preserve global sequence
          }));
          setImages(prev => [  ...prev, ...result.hits]);
          // setImages(prev => [  ...prev, ...indexedHits]);
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
  //   const imageColumns = document.querySelectorAll(".explore_image");

  //   imageColumns.forEach((imageColumn, index) => {
  //     const currentState = imageStates[index];
  
  //     if (!currentState?.loaded) {
  //       imageColumn.style.height = "300px"; // temp height until image loads
  //     } else {
  //       imageColumn.style.height = ""; // Remove the fixed height
  //     }
  //   });

    
     
  // }, [imageStates]);

  useEffect(() => {
    const imageColumns = document.querySelectorAll(".explore_image");
  
    imageColumns.forEach((imageColumn, index) => {
      const currentState = imageStates[index];
      const imageData = images[index];
      const img = imageColumn.querySelector("img"); // Get the image element
  
      if (!currentState?.loaded && imageData) {
        const columnWidth = imageColumn.offsetWidth; // Get actual width
        const aspectRatio = imageData.imageHeight / imageData.imageWidth;
        const scaledHeight = columnWidth * aspectRatio;
  
        imageColumn.style.height = `${scaledHeight}px`; // Set calculated height
      } else {
        imageColumn.style.height = ""; // Reset height when image is loaded
      }
      // if (img && img.complete) {
      //   imageColumn.style.height = img.offsetHeight + "px";
      // } else {
      //   img.onload = () => {
      //     imageColumn.style.height = img.offsetHeight + "px";
      //   };
      // }
    });
  }, [imageStates, images]); // rerun whenever images or states change
  useEffect(() => {
   setTimeout(() => {
    const container = document.querySelector('.pinterest-layout');
    const items = container.querySelectorAll('.explore_image');
  
    if (items.length < 3) return;
  
    const secondItem = items[1];
    const thirdItem = items[2];
  
    const secondBottom = secondItem.offsetTop + secondItem.offsetHeight;
    const thirdBottom = thirdItem.offsetTop + thirdItem.offsetHeight;
  
    // Check if second item has a large gap below it
    const gapThreshold = 100; // adjust based on your layout
  
    if (thirdBottom - secondBottom > gapThreshold) {
      const lastItem = items[items.length - 1];
      container.insertBefore(lastItem, secondItem);
    }
   }, 500)
  }, [images]); // Run after images are rendered

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
      
      // shareButton.firstElementChild.style.backgroundColor = "white";
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

  function toggleBlog() {
    
    if (blogView === true) {
      // blogs.reverse()
      setBlogView(false)
      setloader(true);

      setTimeout(() => {
        images.reverse();

        setBlogView(false);
        setloader(false);
      }, 500);
      document.getElementById("blogFilterBtn").style.backgroundColor = "black";
      document.getElementById("blogFilterBtn").style.color = "white";
    } else {
      setloader(true);

      setTimeout(() => {
        images.reverse();

        setBlogView(true);
        setloader(false);
      }, 500);

      document.getElementById("blogFilterBtn").style.backgroundColor = "#eee";
      document.getElementById("blogFilterBtn").style.color = "black";
    }
  }

  useEffect(() => {
  
    const observer = new IntersectionObserver(function(entries){
      console.log("entry point of intersect", entries, entries[0].isIntersecting)
        if(entries[0].isIntersecting){
          console.log("now intersecting")  
          observer.unobserve(entries[0].target)
          // pageState++
          // setPageState(prevState => prevState + 1);        
            setPageState((prevState) => {
              let newPageState = prevState + 1;
            //   // console.log("now intersecting", newPageState);
            //   getProducts(false, "", newPageState);
            let currentCalculatedIndex = updatedHours();
            // setIndex(updatedHours());
            getProducts(`https://pixabay.com/api/?key=45283300-eddb6d21a3d3d06f2a2381d7d&q=${content[currentCalculatedIndex]}&image_type=photo&page=${newPageState}`);
              return newPageState;
            });     
          
        }
  
    })
  
    setTimeout(()=>{
      let lastElement = blogColRef.current[blogColRef.current.length - 5]
    
      // for get the element by Id after the Id in element id={`blogColId${index}`}
      // const elements = document.querySelectorAll(`[id^="blogColId"]`)
      // let lastElement = elements[elements.length - 15];

      // console.log("lastElement", lastElement)
      observer.observe(lastElement)
  
    }, 100)
    return ()=>{
      
      observer.disconnect()
    }
   
  },[images.length])

  if (loader === true) {
    return (
      <>
        <Loader></Loader>
      </>
    );
  } else {
    return (
      <>
        {props.componentFrom !== "home" &&
        <>
            {/* <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "left",
            alignItems: "left",
            marginBottom: "20px",
            marginTop: "90px",
            maxWidth: "89%",
            gap: "10px 0px",
            padding: "0px 20px",
          }}
          className="container app_product_headline"
        >
          <AppPagesHeading heading={"Explore Image for " +  document.title.split(' ')[3]}  />
          <div>
          <span className="image_suggestion_text">Next every hours Upcoming images </span>
     
          <div class="upcomming_images">
            <span className="app_product_headline_text">Music</span>
            <span className="app_product_headline_text">Music</span>
            <span className="app_product_headline_text">Music</span>
            <span className="app_product_headline_text">Music</span>
          </div>
          </div>
          
        </div> */}
        </>
    }
 <div  className={props.componentFrom === "home" ? 'container p-0 pinterest-layout ' : 'container pinterest-layout mt-ps90'} ref={exploreRef}>
 
      {images.map((image, index) => {
        if (!imageStates[index]) return null; // add this line
        const { loaded } = imageStates[index];

        return (
          <div ref={(el)=> (blogColRef.current[index] = el)} className={props.componentFrom === "home" ? 'column position-relative explore_image':'column position-relative explore_image'} key={image.id}>      
          

            <img
            className="explore-image"
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
