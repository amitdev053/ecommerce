import "./expore.css";
import React, { useEffect, useState, useContext, useRef, lazy } from "react";
import Loader from "./Loader";
import ScrollTag from "./ScrollTag"; // Add this line to import ScrollTag
import AppPagesHeading from "./AppPagesHeading"; // Add this line to import AppPagesHeading
import axios from "axios";
import EmptyCartImage from "../appimages/empty_cart.webp";
import defaultBlogImage from "../defaultBlog.jpg";
import ExploreLinkButton from "./ExploreLinkButton";
import SkeltonLoading from "./SkeltonLoading";
import { handleShare } from "./HandleShare";
import { getImageColors, generateCaption, getCachedColor, useSessionCache, useIndexedDBCache } from "./GetImageColors";
import { Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import AppShareer from "./AppShareer";
import Alert from "./Alert";
import { toast } from "react-toastify";


let content = [
  "kiss", "Fashion", "Sports", "Music", "Gaming", "Technology", "Health", "Finance", "Education", "Lifestyle", "Travel and Adventure",  "Art and Creativity", "hugs", "Nature and Wildlife", "Food and Culinary", "History and Culture","Fitness and Wellness", "Architecture and Design","Space and Astronomy", "Books and Literature", "Motivation and Productivity",  "Luxury and Lifestyle",  "Science and Innovation",   "bedrooms", "romantic",  "Sibling Love", "Date Night",  "Valentine", "Hobbies and Skills",  "happy pattern", "couples", "bmw-night",
   "Sunsets and Sunrises",
   "navratri",
  "Street Photography",
  "Cute Animals",
  "Quotes and Inspiration",
  "Meditation and Mindfulness",
  "DIY and Crafts",
  "Festivals and Celebrations",
  "Adventure Sports",
  "Cars and Motorcycles",
  "Gaming Setup",
  "Music Festivals",
  "Luxury Cars",
  "Coffee and Cafes",
  "Cityscapes",
  "Nature Trails",
  "Beach Vibes",
  "Snow and Winter",
  "Street Art",
  "Fashion Accessories",
  "Home Decor",
  "Interior Design",
  "Wedding Moments",
  "Love and Romance",
  "Family Time",
  "Fitness Motivation",
  "Healthy Recipes",
  "Travel Destinations",
  "Cultural Heritage",
  "Technology Trends",
  "Space Exploration",
  "Photography Tips",
  "Pet Love",
  "Nightlife",
  "Vintage Vibes",
  "Neon Aesthetics",
  "Minimalism",
  "Boho Style"
];
// 🔁 Get the current hour index to rotate categories
const updatedHours = () => new Date().getHours() % content.length;

// 📈 Function to update localStorage score
function updateInteractionScore(category, weight = 1) {
  const stored = localStorage.getItem("interactionScore");
  const score = stored ? JSON.parse(stored) : {};
  score[category] = (score[category] || 0) + weight;  // Increment by weight, where weight can be customized (e.g., 1 for a click, 5 for a like)
  localStorage.setItem("interactionScore", JSON.stringify(score));
}

// 🧠 Function to get next best category based on scores
function getPreferredCategory(defaultIndex) {
  const scores = JSON.parse(localStorage.getItem("interactionScore")) || {};
  const sorted = [...content].sort((a, b) => (scores[b] || 0) - (scores[a] || 0)); // Higher score = higher rank
  return sorted[0] || content[defaultIndex];  // Default to category at defaultIndex if no scores
}


const Explore = (props) => {
  // let content = [ "couples", "Fashion", "Sports", "Music", "Gaming", "Technology", "Health", "Finance", "Education", "Lifestyle"]
    

  // const [index, setIndex] = useState(updatedHours());
  const [index, setIndex] = useState(0);
  const [blogView, setBlogView] = useState(true);
  const [loader, setloader] = useState(true);
  const [images, setImages] = useState([]); // assume this is where you get your images
  const [imageStates, setImageStates] = useState([]);
  const blogColRef = useRef([])
  const bottomObserverRef = useRef([])        // target as last element for infintnite loop
  const [pageState, setPageState] = useState(1)
  const exploreRef = useRef(null)
  
  
  
  
  const [trakImages, setTrakImage] = useState(true);
  const [bottomLoader, setBottomLoader] = useState(false);
  const navigate = useNavigate()
  const [clickedTag, setClickedTag] = useState("")      // for tags
  const [showLike, setShowLike] = useState(sessionStorage.getItem("showLikes") ?? true)      // show like on mobile only
  // Prevents reloading of already loaded images
const loadedImageIds = new Set(JSON.parse(localStorage.getItem("loadedImageIds") || "[]"));

// const { getCache, setCache, clearCache } = useSessionCache(props.componentFrom === "exploreNext" ? "exploreNext": "exploreImages");
// const { getCache, setCache, clearCache, dbReady  } = useIndexedDBCache("exploreImages");
const { getCache, setCache, clearCache } = useIndexedDBCache();

 
  useEffect(()=>{
    if(props.componentFrom === "exploreNext"){
      setTrakImage(false)
      // setImages([])
    }
  
  

  }, [])
const fetchedPages = useRef(new Set()); 


  const baseUrl = `https://pixabay.com/api/?key=45283300-eddb6d21a3d3d06f2a2381d7d&q=${content[index]}&image_type=photo`


  function RemoveDuplicateHits(query, pageNum){

  }

  



  async function getImages(url, exploreNextInfiniteScroll = false) {
    // console.log("yes getImages runs")
    if((trakImages && props.componentFrom !== "home")){
      setloader(true);

    }
    
const queryMatch = url.match(/[\?&]q=([^&]+)/i);
const query = queryMatch ? decodeURIComponent(queryMatch[1]) : "default";

const pageMatch = url.match(/[\?&]page=(\d+)/i);
const pageNum = pageMatch ? pageMatch[1] : "1";
// console.log("pageNum", pageNum)
    const pageKey = `${query.toLowerCase()}-page-${pageNum}`;
  if (fetchedPages.current.has(pageKey)) {
    // console.log("🛑 Already fetched:", pageKey);
    return;
  }
  fetchedPages.current.add(pageKey);
  // console.log("🚀 Fetching:", pageKey);

RemoveDuplicateHits(query, pageNum)
const componentPrefix = props.componentFrom || "explore";
const cacheKey = `${componentPrefix}-${(componentPrefix === "explore") ? query : props.displayImage}-page-${pageNum}`;

    let cacheCatch =  await getCache(cacheKey)


  const urlParams = new URLSearchParams(url.split("?")[1]);
const queryFromUrl = urlParams.get("q")?.toLowerCase();

const isExploreNext = props.componentFrom === "exploreNext";
const expectedQuery = isExploreNext
  ? props.displayImage?.toLowerCase()
  : content[updatedHours()].toLowerCase(); // fallback for explore page
  let cacheArray = cacheKey.split("-").map(item => item.toLowerCase())
// console.log("query for", cacheArray, expectedQuery, cacheArray.includes(expectedQuery))


if (
 
  cacheCatch && cacheArray.includes(expectedQuery)

) {
  // console.log("💾 Using cached result for", cacheCatch, cacheKey, queryFromUrl, expectedQuery);
  setupImageOnPage(cacheCatch);
  return;
}



     try {
      // console.log("try runs")
    const response = await fetch(url);   

    const result = await response.json();
    // console.log("cacheKey for set", cacheKey, result)
    
setCache(cacheKey, result); // 💾 Save to cache
    if (props.componentFrom === "home") {
      // // console.log("explore images", result.hits);
      // console.log("yes home props")
      // setImages(result.hits.splice(0, 7));
      const maxImages = 7;
const hits = result.hits.slice(0, maxImages);

// Trim to multiple of 3 (e.g., 6 instead of 7)
const cleanCount = hits.length - (hits.length % 3);
const cleanHits = hits.slice(0, cleanCount);

      // setupImageOnPage(result.hits.splice(0, 7))
      setupImageOnPage(cleanHits)
    } else if(props.componentFrom === "exploreNext"){
      // let isTracking = trakImages;
      // console.log("explorenext page", props.displayImage, url, trakImages)
      let exploreNextPhotos;

      let exploreNextUrl
      if(exploreNextInfiniteScroll){
        exploreNextUrl = url
        // setTrakImage(true)
      //  isTracking = trakImages 
        // console.log("inifinite scroll", pageState, exploreNextUrl, trakImages)

      }else{
        
        exploreNextUrl = `https://pixabay.com/api/?key=45283300-eddb6d21a3d3d06f2a2381d7d&q=${props.displayImage}&image_type=photo&page=1`

      }
        // if(isTracking){
        try{
          // console.log("explorenext url", exploreNextUrl)
          const response = await fetch(exploreNextUrl);  
          exploreNextPhotos = await response.json();
          console.log("expolore next photos", exploreNextPhotos)
          // console.log("return", exploreNextPhotos)
          setupImageOnPage(exploreNextPhotos)

        }catch(error){
             setloader(false);    
            setBottomLoader(false);
        // console.log("catch eroor in rxplore next page", pageState, error)
        }
    
              // return 
              
            // }

        
    }
    
    else {
      console.log("explore loading results", result)
     setupImageOnPage(result)
    }
  } catch (error) {
    setloader(false);    
    setBottomLoader(false);
    // console.log("catch eroor in app images", pageState, error)
  }
}
async function isImageUrlValid(url) {
  try {
    const res = await fetch(url, { method: "HEAD" });
    if (res.ok) {
      const type = res.headers.get("content-type");
      return type && type.startsWith("image/");
    }
    return false;
  } catch (err) {
    return false;
  }
}


const colorCache = useRef({}).current;

async function setupImageOnPage(result){
     
  
  if(props.componentFrom === "home"){
  
    // // console.log("home result and images", result, images)

     const indexedHits = await Promise.all(result.map(async (img, i) => {
        let defaultColor = "#ffffff";
        // let defaultColor = colorCache[img.largeImageURL] ||  "#f8f9fa";
     
  const isValid = await isImageUrlValid(img.webformatURL);
        if (!isValid) {
          console.warn("Skipping expired/broken image:", img.webformatURL);
          return null;
        }
 
        // after Improbved code version one starts here
        // if (!colorCache[img.largeImageURL]) {
        //     requestIdleCallback(async () => {
try {
  // const getColors = await getImageColors(img.largeImageURL, 1);
  const getColors = await getCachedColor(img.largeImageURL);
   colorCache[img.largeImageURL] = getColors;
  defaultColor = getColors;
} catch (e) {
  console.error("Error fetching image colors:", e);
}
//   });
//  }
// after Improbved code version one  End here
        return {
          ...img,
          _orderIndex: images.length + i,
          _category: content[index],
          imageColor: defaultColor,
          // imageColor: "#ffffff",
        };
      }));
const validImages = indexedHits.filter(Boolean);
// console.log("validateImage Home", validImages)
         setloader(false);
        setImages(validImages)
      // console.log("index hits", result, indexedHits)

  }else{

  

   const indexedHits = await Promise.all(result.hits.map(async (img, i) => {
        let defaultColor = "#ffffff";
        // let defaultColor = colorCache[img.largeImageURL] || "#f8f9fa";
        // if (!colorCache[img.largeImageURL]) {
        //   requestIdleCallback(async () => {
          // img.webformatURL = "https://pixabay.com/get/g43c5f509c9fb15d2cb21b2f5d43bc5f24e6d624f99d53b08ff555099b61c9abe36565e5dc59235a9dc5796a83b7c513c07a5c5fc1c99d29791e23a7820181ace_640.jpg"
             // ✅ Check if image URL is valid
        const isValid = await isImageUrlValid(img.webformatURL);
        if (!isValid) {
          console.warn("Skipping expired/broken image:", img.webformatURL);
          return null;
        }
        // try {
          
        //   const getColors = await getCachedColor(img.largeImageURL);         
        //   colorCache[img.largeImageURL] = getColors;
        //   defaultColor = getColors; 
        // } catch (e) {
        //   console.error("Error fetching image colors:", e);
        // }
      //   })
      // }


        return {
          ...img,
          _orderIndex: images.length + i,
          _category: content[index],
          imageColor: defaultColor,
        };
      }));
const validImages = indexedHits.filter(Boolean);
      const storedScores = JSON.parse(localStorage.getItem("interactionScore") || "{}");

      // const sortedImages = validImages.sort((a, b) => {
      //   const scoreA = storedScores[a?._category] || 0;
      //   const scoreB = storedScores[b?._category] || 0;
      //   return scoreB - scoreA;
      // });
        const hiddenImages = JSON.parse(localStorage.getItem("hiddenImages")) || [];
        const filteredImages = validImages.filter(img => !hiddenImages.includes(img.id));
   
      // blogColRef.current.length  = 0
        // blogColRef.current = [];
      setImages((prevImages) => {
        const existingIds = new Set(prevImages.map((img) => img.id));
        // const uniqueNewImages = validImages.filter((img) => !existingIds.has(img.id));
        const uniqueNewImages = filteredImages.filter((img) => !existingIds.has(img.id));
        return [...prevImages, ...uniqueNewImages];
      });

      

//       const newHits = result.hits.map((img, i) => ({
//   ...img,
//   _orderIndex: images.length + i,
//   _category: content[index],
//   imageColor: '#e0e0e0',
// }));
//       setImages((prevImages) => [...prevImages, ...newHits]);

      


     
      setloader(false);
      // console.log("images & loader", images, loader)
      // if(props.componentFrom !== "exploreNext"){
        setTrakImage(false)
      // }
      if(bottomLoader){
        setBottomLoader(false);
      }
         
  }
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
    // document.title = `Explore images for ${content[currentCalculatedIndex]}`;
    // Fetch images for the initial index
    

      getImages(`https://pixabay.com/api/?key=45283300-eddb6d21a3d3d06f2a2381d7d&q=${content[currentCalculatedIndex]}&image_type=photo&page=1`);
    
    
    
    // addImageTouch();
    // Update the index every hour
    const interval = setInterval(() => {
      setIndex(updatedHours());
    }, 60 * 60 * 1000); // 1 hour in milliseconds

    // Cleanup the interval on component unmount
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
  // images.forEach((img, i) => {
  //   // If color is default, fetch actual color
  //   if (img.imageColor === "#ffffff") {
  //     const imageObj = new Image();
  //     imageObj.src = img.largeImageURL;

  //     imageObj.onload = async () => {
  //       try {
  //         const colors = await getImageColors(img.largeImageURL, 1);
  //         setImages((prevImages) => {
  //           const newImages = [...prevImages];
  //           newImages[i] = {
  //             ...newImages[i],
  //             imageColor: colors[0],
  //           };
  //           return newImages;
  //         });
  //       } catch (e) {
  //         console.error("Color extraction failed:", e);
  //       }
  //     };
  //   }
  // });
  
  // showMobileIcon()
}, [images]);


function showMobileIcon(){
  
    setTimeout(()=>{
  if(images.length > 0 && props.componentFrom !== "exploreNext" && showLike && window.innerWidth < 580){
     
      sessionStorage.setItem("showLikes", false)
      setShowLike(false)
      let allLikesELements = document.querySelectorAll('.explore_icons')
      let allSharesELements = document.querySelectorAll('.explore_images_share')
      Array.from(allLikesELements).forEach((likeEl)=>{
// likeEl.style.transform = `transform: translate(0px , 0px) !important`

  likeEl.style.setProperty("transform", "translate(0px, 0px)", "important");
      })
      Array.from(allSharesELements).forEach((shareEl)=>{
// shareEl.style.transform = `transform: translate(0px , 0px) !important`
  shareEl.style.setProperty("transform", "translate(0px, 0px)", "important");

      })
    }

     setTimeout(()=>{
 
      let allLikesELements = document.querySelectorAll('.explore_icons')
      let allSharesELements = document.querySelectorAll('.explore_images_share')
      Array.from(allLikesELements).forEach((likeEl)=>{


  // likeEl.style.setProperty("transform", "translate(0px, 50px)", "important");
  likeEl.style.removeProperty("transform")
      })
      Array.from(allSharesELements).forEach((shareEl)=>{

  shareEl.style.removeProperty("transform")

      })
    // }
    }, 3000)

    }, 3000)

    
}

//   useEffect(() => {
//     const imageColumns = document.querySelectorAll(".explore_image");
  
//     imageColumns.forEach((imageColumn, index) => {
//       const currentState = imageStates[index];
//       const imageData = images[index];
//       const img = imageColumn.querySelector("img"); // Get the image element
  
//       if (!currentState?.loaded && imageData) {
//         const columnWidth = imageColumn.offsetWidth; // Get actual width
//         const aspectRatio = imageData.imageHeight / imageData.imageWidth;
//         const scaledHeight = columnWidth * aspectRatio ;
//         // const scaledHeight = columnWidth * aspectRatio - imageData.imageHeight * 0.1;
  
//         imageColumn.style.height = `${scaledHeight}px`; // Set calculated height
//       } else {
//         imageColumn.style.height = ""; // Reset height when image is loaded
//       }
//     });

//     imageColumns.forEach((imageColumn, index) => {
//   const img = imageColumn.querySelector("img");
//   if (!img) return;

//   const rowHeight = 3; // same as grid-auto-rows
// const rowGap = 3;    // same as CSS gap
// const rowSpan = Math.ceil((imageColumn.offsetHeight + rowGap) / (rowHeight + rowGap));
// imageColumn.style.setProperty("--row-span", rowSpan);
// });

//   }, [imageStates, images]); 

 useEffect(() => {
    const imageColumns = document.querySelectorAll(".explore_image");
  
    imageColumns.forEach((imageColumn, index) => {
      const currentState = imageStates[index];
      const imageData = images[index];
      const img = imageColumn.querySelector("img"); // Get the image element
  
      if (!currentState?.loaded && imageData) {
        const columnWidth = imageColumn.offsetWidth; // Get actual width
        const aspectRatio = imageData.imageHeight / imageData.imageWidth;
        const scaledHeight = columnWidth * aspectRatio ;
        // const scaledHeight = columnWidth * aspectRatio - imageData.imageHeight * 0.1;
  
        imageColumn.style.height = `${scaledHeight}px`; // Set calculated height
      } else {
        imageColumn.style.height = ""; 
      }
    });
  }, [imageStates, images]); 
  


// useEffect(() => {
//   const imageColumns = document.querySelectorAll(".explore_image");

//   imageColumns.forEach((imageColumn, index) => {
//     const img = imageColumn.querySelector("img");
//     if (!img) return;

//     // When image loads, calculate rowSpan
//     if (!img.complete) {
//       img.onload = () => {
//         const columnWidth = imageColumn.offsetWidth;
//         const aspectRatio = img.naturalHeight / img.naturalWidth;
//         const scaledHeight = columnWidth * aspectRatio;
//         imageColumn.style.height = `${scaledHeight}px`;

//         const rowHeight = 3; // match grid-auto-rows
//         const rowGap = 3;    // match CSS gap
//         const rowSpan = Math.ceil((scaledHeight + rowGap) / (rowHeight + rowGap));
//         imageColumn.style.setProperty("--row-span", rowSpan);
//       };
//     } else {
//       // Already loaded
//       const columnWidth = imageColumn.offsetWidth;
//       const aspectRatio = img.naturalHeight / img.naturalWidth;
//       const scaledHeight = columnWidth * aspectRatio;
//       imageColumn.style.height = `${scaledHeight}px`;

//       const rowHeight = 3;
//       const rowGap = 3;
//       const rowSpan = Math.ceil((scaledHeight + rowGap) / (rowHeight + rowGap));
//       imageColumn.style.setProperty("--row-span", rowSpan);
//     }
//   });
// }, [images]);


  

  useEffect(() => {
    // setImageStates((prevStates) =>
    //   images.map((_, i) => prevStates[i] || { loaded: false })
    // );


    setImageStates((prevStates) => {
    if (images.length > prevStates.length) {
      const newStates = images.slice(prevStates.length).map(() => ({ loaded: false }));
      return [...prevStates, ...newStates];
    }
    return prevStates;
  });
  }, [images]);

  function updatedHours(){
    const referenceTime = new Date("2025-01-01T00:00:00Z").getTime();
    // Function to calculate the current index based on elapsed hours 
      const currentTime = Date.now();
      const hoursElapsed = Math.floor((currentTime - referenceTime) / (60 * 60 * 1000));
      // console.log("hours elapased", hoursElapsed, content.length, content[hoursElapsed])

       // Get current hour (0-23) in local time
  let currentHour = new Date().getHours();

  let categoryIndex;

  // Custom time-based overrides
  if (currentHour >= 20 && currentHour < 21) {
       categoryIndex = content.indexOf("romantic"); // 8 PM - 9 PM
  } else if (currentHour >= 21 && currentHour < 22) {    
       categoryIndex = content.indexOf("Date Night");     // 0 to 10 at night
  } else if (currentHour >= 22 && currentHour < 24) {    
    categoryIndex = content.indexOf("bedrooms");   // 10 - 12 at night  
  } else if (currentHour >= 0 && currentHour < 3) {
    categoryIndex = content.indexOf("kiss");   // 12 - 3 at night  
  } else {
    // Normal hourly rotation for other times
    categoryIndex = hoursElapsed % content.length;
  }
      
      // return hoursElapsed % content.length;
      return categoryIndex;
   
  }
function shareImage(image){
  if(image){
    let currentCalculatedIndex = updatedHours();
    let caption = document.title
    
    handleShare(caption,"", image, "explore");

  }
}
  // Fetch images whenever the index changes
  useEffect(() => {
      // clearCache();
   let currentCalculatedIndex = updatedHours();
    getImages(`https://pixabay.com/api/?key=45283300-eddb6d21a3d3d06f2a2381d7d&q=${content[currentCalculatedIndex]}&image_type=photo&page=1`);
    setImageStates(images.map(() => ({ loaded: false })));
  }, [index]);

  function sendClickFeed(event){    
    event.stopPropagation()
    let shareButton = event?.currentTarget;
    if(shareButton){
      shareButton.firstElementChild.style.backgroundColor = "#05050524";
      shareButton.firstElementChild.style.color = "white";
      
      // shareButton.firstElementChild.style.backgroundColor = "white";
    }
    
  }
  function removeClickFeed(event, imageUrl, type, imageId){    
    event.stopPropagation()
    let shareButton = event?.currentTarget;
    if(shareButton){
      shareButton.firstElementChild.style.backgroundColor = "white";
      shareButton.firstElementChild.style.color = "";
      if(type === "share"){
        shareImage(imageUrl)

      }else{
        openMoreOptions(event, type, imageId, imageUrl)
      }
      
    }
    
  }
 
  // let lastOpenedImageId = null; 
  // let clickedImageObj = null

  const [lastOpenedImageId, setLastOpenedImageId] = useState(null);
const [clickedImageObj, setClickedImageObj] = useState(null);

function openMoreOptions(event, type, imageId, clickedImageData) {
  event.stopPropagation(); 
console.log("clickedImageData", clickedImageData)
    // Always clear previous active states
    if(document.querySelectorAll('.show_click_element')){

      document.querySelectorAll('.show_click_element').forEach(el => {
        el.classList.remove('show_click_element');
      });
    }
    // Find the container for this imageId
  const imageContainer = document.querySelector(`[data-image-id="${imageId}"]`);
  const exploreTopIcon = imageContainer.querySelectorAll('.explore_images_share')
  const exploreBottomIcon = imageContainer.querySelector('.explore_icons')
  // const exploreBottomIcon = imageContainer.querySelector(exploreBottomIcon.current)
  

  console.log("image container", imageContainer, exploreTopIcon, exploreBottomIcon)

  const sharedBox = document.querySelector('.app_sharer_container');
  const button = event.currentTarget;
  const rect = button.getBoundingClientRect();
  
  let top = rect.bottom + window.scrollY + 20;
  let left = rect.left + window.scrollX;

    // Get viewport size
  const viewportWidth = window.innerWidth;
  const viewportHeight = window.innerHeight;

  // Get sharedBox size (temporarily make it visible to measure if needed)
  sharedBox.style.opacity = '0';
  sharedBox.style.display = 'block'; 
  const boxWidth = sharedBox.offsetWidth;
  const boxHeight = sharedBox.offsetHeight;

  // Adjust horizontal position if overflowing
  if (left + boxWidth > window.scrollX + viewportWidth) {
    left = window.scrollX + viewportWidth - boxWidth - 10; // 10px margin
  }
  if (left < window.scrollX) left = window.scrollX - 10;

  // Adjust vertical position if overflowing
  if (top + boxHeight > window.scrollY + viewportHeight) {
    top = rect.top + window.scrollY - boxHeight - 10; 
  }
  if (top < window.scrollY) top = window.scrollY + 10;


  // Case 1: Clicking the same image again -> toggle
  if (lastOpenedImageId === imageId) {
    if (getComputedStyle(sharedBox).opacity === "1") {
      sharedBox.style.opacity = `0%`;
        Array.from(exploreTopIcon).forEach((item)=>{
          if(item.classList.contains('show_click_element')){
            item.classList.remove('show_click_element')

          }
      })
      if(exploreBottomIcon.classList.contains('show_click_element')){

        exploreBottomIcon.classList.remove('show_click_element')
      }
    
    } else {
      sharedBox.style.top = `${top}px`;
      sharedBox.style.left = `${left}px`;
      sharedBox.style.height = `auto`;
      sharedBox.style.opacity = `100%`;
      sharedBox.style.zIndex = `99999999999999`;

        Array.from(exploreTopIcon).forEach((item)=>{
        item.classList.add('show_click_element')
      })
      if(exploreBottomIcon){
        exploreBottomIcon.classList.add('show_click_element')

      }
    }
  } 
  // Case 2: Different image -> always show at new position
  else {
   
      sharedBox.style.opacity = `0`;

    setTimeout(() => {
      sharedBox.style.position = 'absolute';
      sharedBox.style.width = `250px`;
      sharedBox.style.height = `auto`;
      sharedBox.style.top = `${top}px`;
      sharedBox.style.left = `${left}px`;
      sharedBox.style.opacity = `1`;

      Array.from(exploreTopIcon).forEach((item) => {
        item.classList.add('show_click_element');
      });
      if(exploreBottomIcon){

        exploreBottomIcon.classList.add('show_click_element');
      }
    }, 50); // fade out delay before moving (200ms can be tuned)
  }

  // update the tracker
  // lastOpenedImageId = imageId;
  // clickedImageObj = clickedImageData;

  setLastOpenedImageId(imageId)
  setClickedImageObj(clickedImageData)

  // console.log("see clickimagedata", clickedImageObj, lastOpenedImageId)
}

const [isSaved, setIsSaved] = useState(false);
const [isHideImage, setIsHideImage] = useState(false);
const [isdownloadedImage, setIsDownloadedImage] = useState(false);

useEffect(() => {
  if (clickedImageObj?.id) {
    const savedImages = JSON.parse(localStorage.getItem("savedImages")) || [];
    // setIsSaved(savedImages.includes(clickedImageObj.id));
    const exists = savedImages.some(img => img.id === clickedImageObj.id);
    setIsSaved(exists);
  }
}, [clickedImageObj]);

useEffect(() => {
  if (clickedImageObj?.id) {
    const hiddenImages = JSON.parse(localStorage.getItem("hiddenImages")) || [];
    const exists = hiddenImages.includes(clickedImageObj.id);
    setIsHideImage(exists);
  }
}, [clickedImageObj]);



useEffect(() => {
  if (clickedImageObj?.id) {
    const hiddenImages = JSON.parse(localStorage.getItem("downloadedImages")) || [];
    const exists = hiddenImages.includes(clickedImageObj.id);
    setIsHideImage(exists);
  }
}, [clickedImageObj]);

const handleSaveImage = (imageId, clickedImageObj) => {
  console.log("handle saved ", clickedImageObj)
  if (!clickedImageObj) return;

  try {
    const savedImages = JSON.parse(localStorage.getItem("savedImages")) || [];
    const alreadySaved = savedImages.some(img => img.id === clickedImageObj.id);

    // if (!savedImages.includes(clickedImageObj.id)) {
    if (!alreadySaved) {
      // savedImages.push(clickedImageObj.id);
      savedImages.push(clickedImageObj);
    let filteredImage =  savedImages.filter((image)=> image !== null)
      localStorage.setItem("savedImages", JSON.stringify(filteredImage));
      toast.success("Image saved");
      console.log("✅ Image saved:", clickedImageObj.id);
      setIsSaved(true); // update state
    } else {
      toast.info("Image already saved");
      console.log("⚠️ Image already saved:", clickedImageObj.id);
    }
  } catch (error) {
    console.error("Error saving image:", error);
    
  }
};

const handleHideImage = (imageId) => {
  if (!imageId) return;

  try {
    // Get hidden images from localStorage
    const hiddenImages = JSON.parse(localStorage.getItem("hiddenImages")) || [];
    const element = document.querySelector(`[data-image-id="${imageId}"]`);
    let clickedImage = element.querySelector('img')
    console.log("yes we get the image", clickedImage)

    // Avoid duplicates
    if (!hiddenImages.includes(imageId)) {
      hiddenImages.push(imageId);
      localStorage.setItem("hiddenImages", JSON.stringify(hiddenImages));
    }
clickedImage.style.filter = "blur(50px)"
element.classList.add('disable-hover')
setIsHideImage(true)
    // Optionally remove from current state/render
    // setImages(prevImages => prevImages.filter(img => img.id !== imageId));
 
  } catch (error) {
    console.error("Error hiding image:", error);
  }
};

  function downloadedImage(lastOpenedImageId, ClickedImageObj) {
    let imageUrl = ClickedImageObj?.largeImageURL
      // Extract extension from the image URL

        console.log("download from explore", imageUrl, content[updatedHours()])
  const urlParts = imageUrl.split(".");
  const extension = urlParts[urlParts.length - 1].split("?")[0]; // Handles query params
  // Fetch the image as a blob
  fetch(imageUrl, { mode: 'cors' })
    .then(response => response.blob())
    .then(blob => {
      console.log("response url ", blob)
      const url = URL.createObjectURL(blob);
const downloadedImage = JSON.parse(localStorage.getItem("downloadedImages")) || [];
      // Create a hidden download link
      const link = document.createElement('a');
      link.href = url;
      link.download = content[updatedHours()] || "BrowseNext" + `.${extension}`; // Use the heading as the filename
      document.body.appendChild(link);
      link.click();
      console.log("link ", link)

      // Cleanup
      // setTimeout(()=>{

        document.body.removeChild(link);
      // }, 200)
      URL.revokeObjectURL(url);
      
      toast.success("Image downloaded successfully")
    if (!downloadedImage.includes(lastOpenedImageId)) {
      downloadedImage.push(lastOpenedImageId);
      localStorage.setItem("downloadedImages", JSON.stringify(downloadedImage));
    }
    setIsDownloadedImage(true)
    })
    .catch(err => {
      console.error("Image download failed", err);
      toast.error("Image download failed. Please try again later.");
    });
  }



  function clickOnMainContainer(event){
    event.preventDefault()
    // console.log("Scroll")
    const sharedBox = document.querySelector('.app_sharer_container');
    // console.log("Explore Ref click", window.getComputedStyle(sharedBox).opacity, event.target);
    if(!sharedBox && !sharedBox)  return 
    // sharedBox.style.opacity = getComputedStyle(sharedBox).opacity !== "0" && "0";
    if(window.getComputedStyle(sharedBox).opacity === "1"){
       if(document.querySelectorAll('.show_click_element')){

      document.querySelectorAll('.show_click_element').forEach(el => {
        el.classList.remove('show_click_element');
      });
    }
      sharedBox.style.opacity = "0"
    }
  }
  function onScrollClose(){
    console.log("scroll fire")
  }
  useEffect(()=>{
    if(!document.body || !exploreRef.current)  return 

  document.body.addEventListener('click', clickOnMainContainer);
  // exploreRef.current.addEventListener('scroll', onScrollClose);

  })

  function orignalElement(event){
    let shareButton = event?.currentTarget;
    if(shareButton){
      shareButton.firstElementChild.style.backgroundColor = "white";
      shareButton.firstElementChild.style.color = "";         
    }    
  }

    function exploreSimilarImages(event, image){
      
      if(!image) return
      // // console.log("similar image", image)
      event.stopPropagation();       
       
          const   url  = `/explore-next/${image.type}/${image.tags.split(',')[0]?.trim().toLowerCase().replace(/\s+/g, '-')}`;
          
          

      navigate(url, { state: { imageData: image } });
    }
  

  function handleNextPage(){
       if (props.componentFrom === "exploreNext") {
          const nextPage = pageState + 1;
          setPageState(nextPage);
          setTrakImage(true);

          getImages(
            `https://pixabay.com/api/?key=45283300-eddb6d21a3d3d06f2a2381d7d&q=${props.displayImage}&image_type=photo&page=${nextPage}`,
            true
          );

        } else {
          const nextPage = pageState + 1;
          setPageState(nextPage);

          const currentCalculatedIndex = updatedHours();
          const query = clickedTag || content[currentCalculatedIndex];
// exploreRef.current.style.minHeight = `${exploreRef.current.offsetHeight + 300}px`
// console.log("hit from infinite scroll", query, nextPage)
          getImages(
            `https://pixabay.com/api/?key=45283300-eddb6d21a3d3d06f2a2381d7d&q=${query}&image_type=photo&page=${nextPage}`
          );
        }
    }

//   useEffect(() => {
    
//   if (props.componentFrom !== "home" ) {
    
//     const observer = new IntersectionObserver(function (entries) {
      
//       if (entries[0].isIntersecting) {
//         // console.log("triggered...")
//         observer.unobserve(entries[0].target);
//         handleNextPage()
//         setBottomLoader(true);

//       }
//     }, {
//       rootMargin: '0px 0px 400px 0px',
//     });

//     setTimeout(() => {
//       // highlightTag()
      
//       // let lastElement = blogColRef.current[blogColRef.current.length - 5];
//       let lastElement = blogColRef.current.at(-5);
//       // console.log("lasElement", lastElement)
//       if (lastElement) {
        
//         observer.observe(lastElement);
//         const rect = lastElement.getBoundingClientRect();
//         // console.log("observe element", lastElement, rect, window.innerHeight)
//         if(rect.top < window.innerHeight){
//           // console.log("👀 Manually triggering due to auto-visible image");
//           observer.unobserve(lastElement);
//           handleNextPage()
//           // observer.observe(lastElement);
//         }
//       }else{
        

    
//       }   
    
//     }, 100);

  
    

//     return () => {
//       observer.disconnect();
//     };
//   }

  
  
// }, [images.length]);

useEffect(() => {
  if (props.componentFrom === "home") return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Trigger load
          console.log("loading...")
          setBottomLoader(true);
          handleNextPage();

          // Optionally unobserve this element
          observer.unobserve(entry.target);
        }
      });
    },
    { rootMargin: '0px 0px 200px 0px' }
  );


 // wait for DOM nodes to attach
  requestAnimationFrame(() => {
    const validElements = blogColRef.current.filter(Boolean);
    const lastElement = validElements.at(-2);
    console.log("lastElement", validElements, lastElement)
    if (lastElement) {
      observer.observe(lastElement);
      console.log("Observing element:", lastElement);
    }
  });

  return () => {
    observer.disconnect();
  };
}, [images]); // re-run whenever images change



function highlightTag(){

  let scrollTopElement = document.querySelector('.blog_tag_suggestion')
    if(scrollTopElement && scrollTopElement.children.length > 0){
      Array.from(scrollTopElement.children).forEach((tag)=>{
        // console.log("highlight tag", clickedTag)
        if(clickedTag !== "" && tag.innerText === clickedTag){
          tag.classList.add("highlight_tag")
        }
      })
    }

}

//Now Written below code is for the scrollTag functionality--------------------------
function fetchTagImages(){
  let scrollTopElement = document.querySelector('.blog_tag_suggestion')
  if(scrollTopElement && scrollTopElement.children.length > 0){
      // to Remove the all listner first
       Array.from(scrollTopElement.children).forEach((tag) => {
      if (tag.classList.contains('app_blog_tag_text')) {
        // Clean up existing listener
        tag.replaceWith(tag.cloneNode(true)); // Removes all listeners
      }
    });


    Array.from(scrollTopElement.children).forEach((tag)=>{
      if(tag.classList.contains('app_blog_tag_text')){
        tag.addEventListener('click', async (e)=>{
       
      // e.preventDefault()
      // setImages([])
      // setloader(true)
setClickedTag(e.target.innerText)
sessionStorage.setItem("userFav", e.target.innerText)
        setImages([]);
        setPageState(1);
        setloader(true);
        setTrakImage(true); 
        setBottomLoader(false); 
        // console.log("blogcolRef", blogColRef.current)
        // e.target.classList.add("highlight_tag")
        
       
        // Call the getBlogs function
        

    await  getImages(`https://pixabay.com/api/?key=45283300-eddb6d21a3d3d06f2a2381d7d&q=${e.target.innerText}&image_type=photo`, true)
      // console.log("yes tag clicked", e.target.innerText,  blogColRef.current)
     

      
     })
      }
      
  
    })

  }
}

useEffect(()=>{
  setTimeout(()=>{

    fetchTagImages()
  }, 300)
})

// function toImageKitURL(originalUrl) {
//   if (!originalUrl) return "";
//   const relativePath = originalUrl.replace("https://pixabay.com/get/", "");
//   return `https://ik.imagekit.io/k4vr4hitu/${relativePath}`;
// }

// function toImageKitURL(originalUrl, width = 640, quality = 80) {
//   if (!originalUrl) return "";

//   const relativePath = originalUrl.replace("https://pixabay.com/get/", "");

//   return `https://ik.imagekit.io/k4vr4hitu/tr:w-${width},q-${quality},f-auto/${relativePath}`;
// }

// function toImageKitURL(originalUrl, width = 640, quality = 80) {
//   if (!originalUrl) return "";

//   const basePixabayUrl = "https://pixabay.com/get/";
//   const cdnPixabayUrl = "https://cdn.pixabay.com/";

//   const relativePath = originalUrl.startsWith(basePixabayUrl)
//     ? originalUrl.replace(basePixabayUrl, "")
//     : originalUrl.startsWith(cdnPixabayUrl)
//     ? originalUrl.replace(cdnPixabayUrl, "")
//     : originalUrl;

//   return `https://ik.imagekit.io/k4vr4hitu/tr:w-${width},q-${quality},f-auto/${relativePath}`;
// }

function toImageKitURL(originalUrl, width = 640, quality= 80) {
  // quality = window.innerWidth < 768 ? 40 : 80;
  if (!originalUrl) return "";

  const basePixabayUrl = "https://pixabay.com/get/";
  const cdnPixabayUrl = "https://cdn.pixabay.com/";

  let relativePath = "";

  // Extract relative path based on known Pixabay sources
  if (originalUrl.startsWith(basePixabayUrl)) {
    relativePath = originalUrl.replace(basePixabayUrl, "");
  } else if (originalUrl.startsWith(cdnPixabayUrl)) {
    relativePath = originalUrl.replace(cdnPixabayUrl, "");
  } else {
    try {
      // Handle cases where full URL is passed but doesn't match known bases
      const url = new URL(originalUrl);
      relativePath = url.pathname.startsWith("/") ? url.pathname.slice(1) : url.pathname;
    } catch (err) {
      // Fallback to the original (if it's already relative or malformed)
      relativePath = originalUrl;
    }
  }

  // Return the ImageKit CDN URL with transformations
  return `https://ik.imagekit.io/k4vr4hitu/tr:w-${width},q-${quality},f-auto/${relativePath}`;
}

// function lockObjects(index){
//   console.log("image states", imageStates[index])
//   let allImage = document.querySelectorAll('.explore_image')
//   Array.from(allImage).forEach((img)=>{
//     let imgPositions = img.getBoundingClientRect()
    

//   })

// }





//  useEffect(() => {
//   let start = null;

//   const timer = setTimeout(() => {
//     if (images.length > 0) {
//       start = Date.now();
//     }
//   }, 15000); // Delay start time tracking by 15 sec

//   return () => {
//     clearTimeout(timer);
//     if (start) {
//       const timeSpent = Date.now() - start;
//       window.gtag('event', 'time_on_page', {
//         event_category: 'Explore Page',
//         event_label: 'Explore Component',
//         value: Math.round(timeSpent / 1000),
//       });
//     }
//   };

//   }, []);

    function handleImageClick(img, index) {
      // console.log("image status", imageStates[index].loaded)
      if (!imageStates[index]?.loaded) return; // Don't track if image not loaded
      // console.log("image clicked", img)
      if(window.gtag){

  window.gtag('event', 'explore_image_click', {
  img_id: img?.id,
  tags: img?.tags || 'No tags',
  image_url:  img?.largeImageURL || img?.webformatURL,
  page_path: window.location.pathname
});
        // console.log(" event send")

      }
    }




  if (loader === true) {
    return (
      <>
      
        {/* <Loader></Loader> */}

{/* <ScrollTag  tagList={content} showBlog={getImages} /> */}
{(props.componentFrom !== "exploreNext") &&
           <div className="container mt-ps90 app_container">

{/* <ScrollTag whereFrom="explore"  tagList={content} showBlog={getImages} /> */}
        </div>
}
        <SkeltonLoading count={30}/>
      </>
    );
  } else {
    return (
      <>

        {
      (props.componentFrom !== "home" && props.componentFrom !== "exploreNext" ) && 
  <Helmet>
  {/* <title>Explore Images for {content[updatedHours()]} | BrowseNext</title> */}
  <title>Explore {content[updatedHours()]} Images | BrowseNext</title>

  <meta
    name="description"
    content="Browse high-resolution images updated hourly in categories like fashion, tech, couples, nature, fitness, romantic, food, and more — all free to use on BrowseNext."
  />
  <meta name="robots" content="index, follow" />
  <meta
    name="keywords"
    content="Free stock images, trending images, hourly updated photos, romantic pictures, nature wallpapers, fashion gallery, tech stock images, couples, lifestyle, hugs, aesthetic images"
  />
  <meta property="og:title" content="Explore Trending Images | Market Shops" />
  <meta
    property="og:description"
    content="Market Shops Explore page updates every hour with high-quality images across 30+ popular categories. Free and easy to download!"
  />
  <meta
    property="og:image"
    content={images[0]?.webformatURL || "https://www.browsenext.today/favicons.png"}
  />
  <meta property="og:url" content="https://www.browsenext.today/explore" />
  <meta name="twitter:card" content="summary_large_image" />
  <link rel="canonical" href="https://www.browsenext.today/explore" />

   <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ImageGallery",
          "name": content[updatedHours()],
          "description": "Browse high-resolution images updated hourly in categories like fashion, tech, couples, nature, fitness, romantic, food, and more — all free to use.",
          "url": `https://www.browsenext.today/explore`,
          "image": ["https://www.browsenext.today/favicons.png"],
        })}
      </script>


  <link rel="preload" as="image" href={images[0]?.webformatURL} />
  <link rel="preload" as="image" href={images[1]?.webformatURL} />
  <link rel="preload" as="image" href={images[2]?.webformatURL} />
  <link rel="preload" as="image" href={images[3]?.webformatURL} />
</Helmet>


    
  }
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

{/* {(props.componentFrom !== "exploreNext") &&
        <div className="container mt-ps90 app_container">

<ScrollTag  whereFrom="explore" tagList={content} showBlog={getImages} />
        </div>
} */}

        </>
    }
  <div className="hero d-none">
    <h1>Explore {content[updatedHours()]} Images✨</h1>
    <p>Download HD {content[updatedHours()]} images for Instagram, Facebook, WhatsApp status, Twitter, LinkedIn, and more — free, fast, and ready to use.</p>
  </div>
 <div  className={`${props.componentFrom === "home" ? 'container p-0 pinterest-layout mt-5' : 'container pinterest-layout'} ${props.componentFrom === "exploreNext" ? 'mt-ps90' : 'mt-ps90'}`} ref={exploreRef}>
 
      {images.map((image, index) => {
        if (!imageStates[index]) return null; 
        const { loaded } = imageStates[index];
        const location = window.location.href.split("/")
        const imageTagText = location[location.length - 1]

         let firstTag = image.tags.split(",")[0]?.trim().toLowerCase();
  let secondTag = image.tags.split(",")[1]?.trim().toLowerCase();

  // check if last URL segment matches the first tag
  let useSecond = imageTagText === firstTag;

  let targetTag = (useSecond ? secondTag : firstTag)?.replace(/\s+/g, "-");
        
{/* // console.log("image colors", image.imageColor) */}
           {/* onClick={() => updateInteractionScore(image._category, 2)} key={image.id} */}
          
        return (
          <div ref={(el)=> {
            (blogColRef.current[index] = el)            
             
             }} className={props.componentFrom === "home" ? 'column position-relative explore_image':'column position-relative explore_image'} key={image.id} 
             style={{
    backgroundColor: image.imageColor,  // ✅ Correct location
    // width: image.webformatWidth,
      '--image-color': image.imageColor,
    // height: image.webformatHeight
  }} 
              onClick={(event)=> exploreSimilarImages(event, image)} 
              data-image-id={image.id}
              >      
          
<Link class="explore_image_link"
 to={`/explore-next/${image.type}/${targetTag}`}

state={{ imageData: image }} 
 onClick={(e) =>{
 e.stopPropagation()
 handleImageClick(image, index)
 }
 } 
>
  <div className="image-wrapper" 
  style={{
      width: '100%',
      aspectRatio: `${image.webformatWidth} / ${image.webformatHeight}`,
      overflow: 'hidden',
      position: 'relative',
      height: "100%"
    }}
  
  >
     {/* {!imageStates[index]?.loaded && <div className="skeleton" />} */}
     {(!imageStates[index]?.loaded) && <div className="skeleton" id={'skelton' + index} />}
            <img
            className="explore-image"
                 style={{
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        display: 'block',
      }}

            
  //             src={image.webformatURL}
  //              srcSet={`
  //   ${image.previewURL} 150w,
  //   ${image.webformatURL} 640w,
  //   ${image.largeImageURL} 1280w
  // `}

    //src={toImageKitURL(image.webformatURL)}
  // srcSet={`
  //   ${toImageKitURL(image.previewURL)} 150w,
  //   ${toImageKitURL(image.webformatURL)} 640w,
  //   ${toImageKitURL(image.largeImageURL)} 1280w
  // `}
    src={toImageKitURL(image.webformatURL, image.webformatWidth)}
  srcSet={`
    ${toImageKitURL(image.previewURL, image.previewWidth)} ${image.previewWidth}w,
    ${toImageKitURL(image.webformatURL, image.webformatWidth)} ${image.webformatWidth}w,
    ${toImageKitURL(image.largeImageURL, image.imageWidth)} ${image.imageWidth}w
  `}
  
  
  sizes="(max-width: 600px) 100vw, (max-width: 1200px) 50vw, 33vw"
              loading="lazy"     
                  
              
              onClick={() => updateInteractionScore(image._category, 2)}
  //           width={blogColRef.current[index]?.offsetWidth}
  // height={blogColRef.current[index]?.offsetHeight}

        //       onLoad={() => {
        //       setImageStates((prevStates) => {
        //         const newState = [...prevStates]; 
        //         newState[index] = { loaded: true }; 
        //         return newState;
        //         });
        // }}

      onLoad={(e) => {
        // handle cached + freshly loaded images
        console.log("onimage load",e.target.complete)
        if (e.target.complete) {
          setImageStates((prev) => {
            const newState = [...prev];
            newState[index] = { loaded: true };
            
            // lockObjects(index)
            if(document.getElementById(`skelton${index}`)){
            document.getElementById(`skelton${index}`).style.display = "none"

            }
            return newState;
          });
        }
      }}
              onError={(e) =>{
              const originalUrl = image.webformatURL;
              e.target.src = originalUrl;
              e.target.srcset = `
                ${image.previewURL} 150w,
                ${image.webformatURL} 640w,
                ${image.largeImageURL} 1280w
              `;
                      //  e.target.style.display = "none";
                        }}
           
                      alt={generateCaption(image)}
           
            />




 
            
      </div>
      </Link>
            {/* {!loaded && <div className="app_loader" />} */}





            <div className="explore_icons position-absolute " onClick={(e) => e.stopPropagation()}  >
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

            <div className="explore_like_content d-flex align-items-center position-absolute explore_images_share adjust_right"
            //  onTouchStart={sendClickFeed} onTouchEnd={(event)=>{removeClickFeed(event, image.webformatURL)}}onMouseUp={(event)=> {removeClickFeed(event, image.webformatURL)} } onMouseDown={sendClickFeed} onMouseOut={orignalElement} 

             onClick={(event) => {
      event.stopPropagation();
      event.preventDefault();
      removeClickFeed(event, image.webformatURL, "share", image.id);
    }}
    onMouseDown={(event) => {
      event.stopPropagation();
      event.preventDefault();
      sendClickFeed(event);
    }}
    onTouchStart={(event) => {
      event.stopPropagation();
      event.preventDefault();
      sendClickFeed(event);
    }}
    onTouchEnd={(event) => {
      event.stopPropagation();
      event.preventDefault();
      removeClickFeed(event, image.webformatURL, "share", image.id);
    }}
    onMouseOut={orignalElement}

          
                >
            <i class="fa-solid fa-share explore_image_share_icon"></i>
            
            </div>    


               <div className="explore_like_content d-flex align-items-center position-absolute explore_images_share"
            //  onTouchStart={sendClickFeed} onTouchEnd={(event)=>{removeClickFeed(event, image.webformatURL)}}onMouseUp={(event)=> {removeClickFeed(event, image.webformatURL)} } onMouseDown={sendClickFeed} onMouseOut={orignalElement} 

             onClick={(event) => {
      event.stopPropagation();
      event.preventDefault();
      removeClickFeed(event, image, "option", image.id);
    }}
    onMouseDown={(event) => {
      event.stopPropagation();
      event.preventDefault();
      sendClickFeed(event);
    }}
    onTouchStart={(event) => {
      event.stopPropagation();
      event.preventDefault();
      sendClickFeed(event);
    }}
    onTouchEnd={(event) => {
      event.stopPropagation();
      event.preventDefault();
      removeClickFeed(event, image, "option", image.id);
    }}
    onMouseOut={orignalElement}


          
                >
            <i class="fa-solid fa-ellipsis explore_image_share_icon"></i>
            
            </div>    
          </div>

        );
          {/* </Link> */}
      })}
    {/* {props.componentFrom === "home" ? <ExploreLinkButton /> : null} */}
    </div>
    <div ref={bottomObserverRef} style={{ height: '1px' }} />
    {(bottomLoader && props.componentFrom !== "home") && 
    (
    <div class="bottom_loader">
       <div className="app_loader explore_bottom_loader" />
       {/* <SkeltonLoading count={5}/> */}
       {/* <span className="explore_bottom_loader_text">Loading more images...</span> */}
    </div>)

    }
    <AppShareer componentFrom="explore" loadingImages={loader} isImageSaved={isSaved}  onSave={() => handleSaveImage(lastOpenedImageId, clickedImageObj)} 
    onHide={()=> handleHideImage(lastOpenedImageId)}
    isHide={isHideImage}
    onDownload={()=>{downloadedImage(lastOpenedImageId, clickedImageObj)}}
    isDownloaded={isdownloadedImage}

    />
    <Alert position="bottom-center"> </Alert>
      </>
    );
  }
};

export default Explore;
