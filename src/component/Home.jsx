import React, {useEffect, useRef, useState, lazy, Suspense} from 'react';
import Products from './Products';
import FeatureContext from './FeatureContext';
import ProductSlider from './ProductSlider';
import { useLocation, useParams, useNavigate, Link} from 'react-router-dom';
import { changeProdiuctView } from './CustomHook';
// import Explore from './Explore';

import AppPagesHeading from './AppPagesHeading';
import Blogs from './Blogs';
import { Helmet } from 'react-helmet';
import "./Home.css";
import ExploreMasonry from './ExploreMasonry';

const Explore = lazy(() => import('./Explore'));


let topic = "Home"
let title = `Explore Home | Market Shops`;
const description = `Explore market-shop.vercel.app for a diverse selection of products. You can get any tech blogs with there images and videos,  Stay updated with our engaging blog content.`;
// const keywords = '';

const DeskTopHeadings = [
  "Fresh Finds Waiting for You ⏰",
  "Come Back Every Hour for Fresh Finds",
  "Discover What’s New Right Now",
  "Trending Now: See What’s Hot 🔥 ",
]
// const MobileHeadings = [
//   "Fresh Images ⏰",
//   "Discover New",
//   "Come Back Often",
//   "Trending 🔥"
// ];

const MobileHeadingses = [
  "🔥 Must-See!",
  "⏰ Just In!",
  "👀 Can’t Miss!",
  "✨ Hot Picks!",
  "💎 Hidden Gems",
  "⚡ Trending Now",
  "🎯 Top Finds",
  "🌟 New & Rare",
  "🚀 Explore Now",
  "🎉 Today’s Hits",



  "New Hot Images 🔥",
  "Fresh Visuals Every Hour ⏰",
  "Discover Favorite Images 👀",
  "Trending Now: Don’t Miss Out"
];

const MobileHeadings = [
"Just in ⏰",
 "Top Finds 🎯",
 "Hot Picks ✨",
 "Can’t Miss 👀"
  
];

export default function Home() {
  const [SliderHeading, setSliderHeading] = useState("Choose Your Favourite");
  const location = useLocation();
  const [productView, setProductView] = useState("productView")
  const [url, setUrl]= useState(location.pathname)
  const [currentHeading, setCurrentHeading] = useState(0);
  const buttonRef = useRef(null)
  const [featuredStoredImage, setFeatureStoredImage] = useState([])
  

  useEffect(()=>{
    // topic= "Home"
    document.title = "BrowseNext — Explore Images, Bold captions & Listen Blogs"
    
  })

  function rotateDeskTopHeading(arrayHeading){
     const hour = new Date().getHours();
    const index = hour % arrayHeading.length;
    setCurrentHeading(index);
    // updateTotals()
    
    const now = new Date();
  const msUntilNextHour = (60 - now.getMinutes()) * 60 * 1000 - now.getSeconds() * 1000 - now.getMilliseconds();
    // const msUntilNextHour = 1000;
  
    const timeout = setTimeout(() => {
      setCurrentHeading((prev) => (prev + 1) % arrayHeading.length);
      const interval = setInterval(() => {
        setCurrentHeading((prev) => (prev + 1) % arrayHeading.length); 
     
      }, 60 * 60 * 1000); 
      // },  1000); 
      
    }, msUntilNextHour);
  
    return () => {
      clearTimeout(timeout);
      
    };
  }
   useEffect(() => {
    // Set heading based on current hour
   rotateDeskTopHeading(DeskTopHeadings)
   rotateDeskTopHeading(MobileHeadings)
  }, []);
  

 function sendClickFeed(event , element){    
    let shareButton = event.target;
    console.log("this", element)
    console.log("document.title in home", featuredStoredImage)
    if(shareButton){
      buttonRef.current.style.backgroundColor = "#000000b8";
      // shareButton.firstElementChild.style.color = "white";
      shareButton.style.transition = "all 0.05s linear";
      shareButton.style.transform = "scale(0.9)";
      
      // shareButton.firstElementChild.style.backgroundColor = "white";
    }
    
  }
  function removeClickFeed(event){    
    let shareButton = event?.target;

    if(shareButton){
      buttonRef.current.style.backgroundColor = "black";
      shareButton.style.transform = "scale(1)";
      // shareButton.firstElementChild.style.color = "";
      // shareImage(imageUrl)
          // showBlog();
          // shareButton.style.backgroundColor = "";
      
    }
    
  }
  function orignalElement(event){
    let shareButton = event?.target;
    if(shareButton){
      buttonRef.current.style.backgroundColor = "black";
      shareButton.style.transform = "scale(1)";
      // shareButton.firstElementChild.style.color = "";         
    }    
  }
  

  return (
    <>
 
    <div id={productView} className='container app_container mt-ps90'>
   
<FeatureContext displayedFeaturedImages={featuredStoredImage} />
<div className="app_divider"/>
<div className='explore_home_heading_container app_container app_explore_home_feeds'>
 <div className='app_home_feeds_heading desktop_heading'>{DeskTopHeadings[currentHeading]}</div>
 <div className='app_home_feeds_heading mobile_heading'>{MobileHeadings[currentHeading]}</div>

          <Link class="app_explore_see_all" to="/explore" draggable={false} ref={buttonRef}   onMouseDown={(e)=>sendClickFeed(e)} onMouseUp={(e)=>removeClickFeed(e)} onMouseOut={(e)=>orignalElement(e)}
           onTouchStart={(e) => sendClickFeed(e)}
  onTouchEnd={(e) => removeClickFeed(e)}
  onTouchCancel={(e) => orignalElement(e)}
          
          >See all</Link>

</div>

{/* <Explore componentFrom="home" /> */}
{/* <Suspense fallback={<div>Loading Explore...</div>}> */}
  <ExploreMasonry componentFrom="home" featurStoredImage={setFeatureStoredImage} />
 {/* </Suspense> */}
<ExploreLinkButton buttonText="Explore Trending Images" buttonType="explore" />
<div className="app_divider"/>

<Products componentFrom="home" />
<ExploreLinkButton  buttonText="Checkout More Products" buttonType="product" />
<div className="app_divider"/>

<Blogs componentFrom="home" />
<ExploreLinkButton buttonText="Explore Latest Blogs " buttonType="blog" />

    </div>

    
    </>
  )
    
  // Component Return Block End Here--------------------------------
   
}



function ExploreLinkButton(props) {
  const usenavigate = useNavigate();

  function navigatePage() {
    if(props.buttonType === "blog"){
      usenavigate('/blogs')
    }else if(props.buttonType === "product"){
      usenavigate('/products')
    }else{
      usenavigate('/explore')
    }
  }

  return (
    <div className='d-flex justify-content-center align-items-center my-4'>

    <span className="brand_button" style={{color: "white", width: "fit-content", padding: "10px 40px 14px 40px", cursor: "pointer", borderRadius: "10px", fontWeight: 600}}onClick={navigatePage}>{props.buttonText} <i class="fa-solid fa-angles-right icon_space"></i></span>
    </div>
  )
}
