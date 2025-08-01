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
import { getImageColors, generateCaption, getCachedColor } from "./GetImageColors";
import { Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";


let content = [
  "kiss", "Fashion", "Sports", "Music", "Gaming", "Technology", "Health", "Finance", "Education", "Lifestyle", "Travel and Adventure",  "Art and Creativity", "hugs", "Nature and Wildlife", "Food and Culinary", "History and Culture","Fitness and Wellness", "Architecture and Design","Space and Astronomy", "Books and Literature", "Motivation and Productivity",  "Luxury and Lifestyle",  "Science and Innovation",   "Minimalism and Aesthetics", "romantic",  "Sibling Love", "Date Night",  "Valentine", "Hobbies and Skills",  "Rose", "couples"
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



 
  useEffect(()=>{
    if(props.componentFrom === "exploreNext"){
      setTrakImage(false)
      // setImages([])
    }
  
  

  }, [])



  const baseUrl = `https://pixabay.com/api/?key=45283300-eddb6d21a3d3d06f2a2381d7d&q=${content[index]}&image_type=photo`


  async function getImages(url, exploreNextInfiniteScroll = false) {
    console.log("yes getImages runs")
    if((trakImages && props.componentFrom !== "home")){
      setloader(true);

    }
     try {
    const response = await fetch(url);   

    const result = await response.json();

    if (props.componentFrom === "home") {
      // console.log("explore images", result.hits);
      console.log("yes home props")
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
      console.log("explorenext page", props.displayImage, url, trakImages)
      let exploreNextPhotos;

      let exploreNextUrl
      if(exploreNextInfiniteScroll){
        exploreNextUrl = url
        // setTrakImage(true)
      //  isTracking = trakImages 
        console.log("inifinite scroll", pageState, exploreNextUrl, trakImages)

      }else{
        
        exploreNextUrl = `https://pixabay.com/api/?key=45283300-eddb6d21a3d3d06f2a2381d7d&q=${props.displayImage}&image_type=photo`

      }
        // if(isTracking){
        try{
          const response = await fetch(exploreNextUrl);  
          exploreNextPhotos = await response.json();
          console.log("return", exploreNextPhotos)
          setupImageOnPage(exploreNextPhotos)

        }catch(error){
             setloader(false);    
            setBottomLoader(false);
        console.log("catch eroor in rxplore next page", pageState, error)
        }
    
              // return 
              
            // }

        
    }
    
    else {
      console.log("explore loading results")
     setupImageOnPage(result)
    }
  } catch (error) {
    setloader(false);    
    setBottomLoader(false);
    console.log("catch eroor in app images", pageState, error)
  }
}



async function setupImageOnPage(result){
  if(props.componentFrom === "home"){
  
    // console.log("home result and images", result, images)

     const indexedHits = await Promise.all(result.map(async (img, i) => {
        // let defaultColor = "#ffffff";
        let defaultColor = "#f8f9fa";
        // try {
        //   const getColors = await getImageColors(img.largeImageURL, 1);
          
        //   defaultColor = getColors[0]; // grab first color
        // } catch (e) {
        //   console.error("Error fetching image colors:", e);
        // }

        // after Improbved code version one starts here
try {
  // const getColors = await getImageColors(img.largeImageURL, 1);
  // const getColors = await getCachedColor(img.largeImageURL);

  // defaultColor = getColors;
} catch (e) {
  console.error("Error fetching image colors:", e);
}
// after Improbved code version one  End here
        return {
          ...img,
          _orderIndex: images.length + i,
          _category: content[index],
          imageColor: defaultColor,
          // imageColor: "#ffffff",
        };
      }));

         setloader(false);
        setImages(indexedHits)
      console.log("index hits", result, indexedHits)

  }else{

  
   const indexedHits = await Promise.all(result.hits.map(async (img, i) => {
        // let defaultColor = "#ffffff";
        let defaultColor = "#f8f9fa";
        try {
          
          // const getColors = await getCachedColor(img.largeImageURL);         
          
          // defaultColor = getColors; 
        } catch (e) {
          console.error("Error fetching image colors:", e);
        }

        return {
          ...img,
          _orderIndex: images.length + i,
          _category: content[index],
          imageColor: defaultColor,
        };
      }));

      const storedScores = JSON.parse(localStorage.getItem("interactionScore") || "{}");

      const sortedImages = indexedHits.sort((a, b) => {
        const scoreA = storedScores[a._category] || 0;
        const scoreB = storedScores[b._category] || 0;
        return scoreB - scoreA;
      });
   
      // blogColRef.current.length  = 0
        blogColRef.current = [];
      setImages((prevImages) => {
        const existingIds = new Set(prevImages.map((img) => img.id));
        const uniqueNewImages = sortedImages.filter((img) => !existingIds.has(img.id));
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
      console.log("images & loader", images, loader)
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
    getImages(`https://pixabay.com/api/?key=45283300-eddb6d21a3d3d06f2a2381d7d&q=${content[currentCalculatedIndex]}&image_type=photo`);
    
    
    addImageTouch();
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
  
  showMobileIcon()
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
    setImageStates((prevStates) =>
      images.map((_, i) => prevStates[i] || { loaded: false })
    );
  }, [images]);

  function updatedHours(){
    const referenceTime = new Date("2025-01-01T00:00:00Z").getTime();
    // Function to calculate the current index based on elapsed hours 
      const currentTime = Date.now();
      const hoursElapsed = Math.floor((currentTime - referenceTime) / (60 * 60 * 1000));
      // // console.log("calc index", hoursElapsed % content.length);
      content.forEach((element, index) => {
        if(index === hoursElapsed % content.length){
          // // console.log("element", element)
        }
      })
      return hoursElapsed % content.length;
   
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
   let currentCalculatedIndex = updatedHours();
    getImages(`https://pixabay.com/api/?key=45283300-eddb6d21a3d3d06f2a2381d7d&q=${content[currentCalculatedIndex]}&image_type=photo`);
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
  function removeClickFeed(event, imageUrl){    
    event.stopPropagation()
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

    function exploreSimilarImages(event, image){
      if(!image) return
      // console.log("similar image", image)
      event.stopPropagation();       
      const url = `/explore-next/${image.type}/${image.tags.split(',')[0]?.trim().toLowerCase().replace(/\s+/g, '-')}`;      
      navigate(url, { state: { imageData: image } });
    }

  useEffect(() => {
    
  if (props.componentFrom !== "home" && bottomObserverRef.current) {
    
    const observer = new IntersectionObserver(function (entries) {
      if (entries[0].isIntersecting) {
        observer.unobserve(entries[0].target);
        setBottomLoader(true);

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

          getImages(
            `https://pixabay.com/api/?key=45283300-eddb6d21a3d3d06f2a2381d7d&q=${query}&image_type=photo&page=${nextPage}`
          );
        }
      }
    }, {
      rootMargin: '0px 0px 400px 0px',
    });

    // setTimeout(() => {
      // highlightTag()
      // let lastElement = blogColRef.current[blogColRef.current.length - 5];
      
    //   if (lastElement) {
    //     observer.observe(lastElement);
    //     console.log("observe element", lastElement)
    //   }else{
    //      // ✅ Fallback: check if page is too short (no scroll)
    //       let SkeltonLayout = document.querySelector('.app_skelton_wrapper')
    //       if(SkeltonLayout){
    //         let lastSkeltonELement = SkeltonLayout.children[SkeltonLayout.children.length - 1]
    //         observer.observe(lastSkeltonELement);

    //       }

    
    //  console.log("yes observe")
    
    //   }   
    
    // }, 100);

     setTimeout(() => {
      highlightTag();

      let lastImageElement = blogColRef.current[blogColRef.current.length - 5];
      let fallbackAttached = false;

      if (lastImageElement) {
        observer.observe(lastImageElement);
        console.log("✅ Observing last image", lastImageElement);

        // Smart Fallback: Manually check if already in viewport
        const rect = lastImageElement.getBoundingClientRect();
        if (rect.top < window.innerHeight) {
          console.log("👀 Manually triggering due to auto-visible image");
          observer.unobserve(lastImageElement);
          setBottomLoader(true);

          const nextPage = pageState + 1;
          setPageState(nextPage);

          const query = clickedTag || content[updatedHours()];
          getImages(
            `https://pixabay.com/api/?key=45283300-eddb6d21a3d3d06f2a2381d7d&q=${query}&image_type=photo&page=${nextPage}`
          );
        }
      } else {
        // Fallback: Observe loading skeleton or bottom ref
        const skeleton = document.querySelector('.app_skelton_wrapper');
        if (skeleton && skeleton.children.length > 0) {
          const lastSkeleton = skeleton.children[skeleton.children.length - 1];
          observer.observe(lastSkeleton);
          fallbackAttached = true;
          console.log("🟨 Observing skeleton fallback");
        } else if (bottomObserverRef.current) {
          observer.observe(bottomObserverRef.current);
          fallbackAttached = true;
          console.log("🟧 Observing bottomObserverRef fallback");
        }

        if (!fallbackAttached) {
          console.warn("⚠️ No fallback observer target found");
        }
      }
    }, 100); // Ensure refs are populated

    return () => {
      observer.disconnect();
    };
  }

  
  
}, [images.length]);

function highlightTag(){

  let scrollTopElement = document.querySelector('.blog_tag_suggestion')
    if(scrollTopElement && scrollTopElement.children.length > 0){
      Array.from(scrollTopElement.children).forEach((tag)=>{
        console.log("highlight tag", clickedTag)
        if(clickedTag !== "" && tag.innerText === clickedTag){
          tag.classList.add("highlight_tag")
        }
      })
    }

}

//Now Written below code is for the scrollTag functionality--------------------------
function fetchTopTagImages(){
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
        console.log("blogcolRef", blogColRef.current)
        // e.target.classList.add("highlight_tag")
        
       
        // Call the getBlogs function
        

    await  getImages(`https://pixabay.com/api/?key=45283300-eddb6d21a3d3d06f2a2381d7d&q=${e.target.innerText}&image_type=photo`, true)
      console.log("yes tag clicked", e.target.innerText,  blogColRef.current)
     

      
     })
      }
      
  
    })

  }
}

useEffect(()=>{
  setTimeout(()=>{

    fetchTopTagImages()
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

function toImageKitURL(originalUrl, width = 640, quality = 80) {
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
  <title>Explore Images for {content[updatedHours()]} | Market Shops</title>
  <meta
    name="description"
    content="Browse high-resolution images updated hourly in categories like fashion, tech, couples, nature, fitness, romantic, food, and more — all free to use."
  />
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
    content={images[0]?.webformatURL || "https://market-shops.vercel.app/favicon.png"}
  />
  <meta property="og:url" content="https://market-shops.vercel.app/explore" />
  <meta name="twitter:card" content="summary_large_image" />
  <link rel="canonical" href="https://market-shops.vercel.app/explore" />
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
 <div  className={`${props.componentFrom === "home" ? 'container p-0 pinterest-layout' : 'container pinterest-layout'} ${props.componentFrom === "exploreNext" ? 'mt-ps90' : 'mt-ps90'}`} ref={exploreRef}>
 
      {images.map((image, index) => {
        if (!imageStates[index]) return null; 
        const { loaded } = imageStates[index];
     
        
{/* console.log("image colors", image.imageColor) */}
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
              onClick={(event)=> exploreSimilarImages(event, image)} >      
          
<Link class="explore_image_link" to={`/explore-next/${image.type}/${image.tags.split(',')[0]?.trim().toLowerCase().replace(/\s+/g, '-')}`}
state={{ imageData: image }} 
 onClick={(e) => e.stopPropagation()} 
>
  <div className="image-wrapper" 
  style={{
      width: '100%',
      aspectRatio: `${image.webformatWidth} / ${image.webformatHeight}`,
      overflow: 'hidden',
      position: 'relative',
    }}
  
  >
     {!imageStates[index]?.loaded && <div className="skeleton" />}
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

              onLoad={() => {
              setImageStates((prevStates) => {
                const newState = [...prevStates]; 
                newState[index] = { loaded: true }; 
                return newState;
                });
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





            <div className="explore_icons position-absolute " onClick={(e) => e.stopPropagation()} >
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

            <div className="explore_like_content d-flex align-items-center position-absolute explore_images_share"
            //  onTouchStart={sendClickFeed} onTouchEnd={(event)=>{removeClickFeed(event, image.webformatURL)}}onMouseUp={(event)=> {removeClickFeed(event, image.webformatURL)} } onMouseDown={sendClickFeed} onMouseOut={orignalElement} 

             onClick={(event) => {
      event.stopPropagation();
      event.preventDefault();
      removeClickFeed(event, image.webformatURL);
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
      removeClickFeed(event, image.webformatURL);
    }}
    onMouseOut={orignalElement}

          
                >
            <i class="fa-solid fa-share explore_image_share_icon"></i>
            {/* <i class="fa-solid fa-share "></i> */}
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
      </>
    );
  }
};

export default Explore;
