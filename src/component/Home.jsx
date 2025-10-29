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
const subTitlesForSavedFeeds = [
"Most-loved picks from users",
"See what everyone’s saving right now",
"Discover what’s catching attention",
"Popular images people saved now!",
"What others found worth saving",

"Images people loved the most",
"Trending saves from users",
"Recently saved by others",
"Inspired by what people save",
"Saved and shared by the community",
  
];

const buttonTextForSavedOthers = [
 "See What’s Trending",
  "Explore What Others Love",
  "Discover Popular Picks",
  "Join the Hype",
  "Find Your Next Favorite",
  "Get Inspired by Others",
  "Explore Viral Finds",
  "Browse the Hottest Saves",
  "See What’s Hot Right Now",
  "Dive Into Creative Trends",
];

const buttonTextForFreshFinds = [
  "See What’s New",
  "Discover Fresh Picks",
  "Explore the Latest Drops",
  "Find Something New",
  "Uncover Today’s Inspiration",
  "Check Out What’s Fresh",
];

export default function Home() {
  const [SliderHeading, setSliderHeading] = useState("Choose Your Favourite");
  const location = useLocation();
  const [productView, setProductView] = useState("productView")
  const [url, setUrl]= useState(location.pathname)
  const [currentHeading, setCurrentHeading] = useState(0);
  const buttonRef = useRef(null)
  const [featuredStoredImage, setFeatureStoredImage] = useState([])
  const [lastUpdatedTime, setLastupdatedTime] = useState(new Date().toISOString())
  const [suggestedState, setSuggestedState] = useState(null)       // for seting the current suggested object
  

  useEffect(()=>{
    // topic= "Home"
    document.title = "BrowseNext — Explore Images, Bold captions & Listen Blogs"
    
  })

  // function rotateDeskTopHeading(arrayHeading){
  //    const hour = new Date().getHours();
  //   const index = hour % arrayHeading.length;
  //   setCurrentHeading(index);
    
    
  //   const now = new Date();
  // const msUntilNextHour = (60 - now.getMinutes()) * 60 * 1000 - now.getSeconds() * 1000 - now.getMilliseconds();
  //   // const msUntilNextHour = 1000;
  
  //   const timeout = setTimeout(() => {
  //     setCurrentHeading((prev) => (prev + 1) % arrayHeading.length);
  //     const interval = setInterval(() => {
  //       setCurrentHeading((prev) => (prev + 1) % arrayHeading.length); 
     
  //     }, 60 * 60 * 1000); 
  //     // },  1000); 
      
  //   }, msUntilNextHour);
  
  //   return () => {
  //     clearTimeout(timeout);
      
  //   };
  // }

  function rotateDeskTopHeading(arrayHeading, setFn) {
  const hour = new Date().getHours();
  const index = hour % arrayHeading.length;
  setFn(index);

  const now = new Date();
  const msUntilNextHour =
    (60 - now.getMinutes()) * 60 * 1000 -
    now.getSeconds() * 1000 -
    now.getMilliseconds();

  const timeout = setTimeout(() => {
    setFn((prev) => (prev + 1) % arrayHeading.length);
    const interval = setInterval(() => {
      setFn((prev) => (prev + 1) % arrayHeading.length);
    }, 60 * 60 * 1000);
  }, msUntilNextHour);

  return () => clearTimeout(timeout);
}
const [currentSubtitleForSaved, setCurrentSubtitleForSaved] = useState(0);
const [buttonText, setButtonText] = useState(0)
const [buttonTextForFreshFind, setButtonTextForFreshFinds] = useState(0)
   useEffect(() => {
    // Set heading based on current hour
  //  rotateDeskTopHeading(DeskTopHeadings)
   rotateDeskTopHeading(DeskTopHeadings, setCurrentHeading)
   rotateDeskTopHeading(MobileHeadings, setCurrentHeading)
    rotateDeskTopHeading(subTitlesForSavedFeeds, setCurrentSubtitleForSaved);
    rotateDeskTopHeading(buttonTextForSavedOthers, setButtonText);
    rotateDeskTopHeading(buttonTextForFreshFinds, setButtonTextForFreshFinds);
  
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
  

  function ExploreHeading(props){
    return(
      <>
        <div className='explore_home_heading_container app_container app_explore_home_feeds'>
<div className="app_left_elmenets">
<div className='home_heading_updates d-flex flex-column'>
 <div className='app_home_feeds_heading desktop_heading'>{props.deskTopHeading}</div>
 <div className='app_home_feeds_heading mobile_heading'>{props.mobileHeading}</div>

 {props.forWhich !== "SuggestedFeeds" && 
 <>
 {props.forWhich === "HomeFeeds"? <span className='last_updated_text'>Last updated at {lastUpdatedTime}min ago</span> : <span className='last_updated_text'>{subTitlesForSavedFeeds[currentHeading]}</span>}
 </>
 }





 {/* {props.forWhich === "HomeFeeds" && <span className='last_updated_text'>Last updated at {lastUpdatedTime}min ago</span>} */}
    
 </div>


</div>

          <Link class="app_explore_see_all" to="/explore" draggable={false} ref={buttonRef}   onMouseDown={(e)=>sendClickFeed(e)} onMouseUp={(e)=>removeClickFeed(e)} onMouseOut={(e)=>orignalElement(e)}
           onTouchStart={(e) => sendClickFeed(e)}
  onTouchEnd={(e) => removeClickFeed(e)}
  onTouchCancel={(e) => orignalElement(e)}
          
          >See all <i className="fa-solid fa-angle-right home_seeall_icon"></i></Link>

</div>
      </>
    )
  }
  

  return (
    <>
 
    <div id={productView} className='container app_container mt-ps90'>
   
<FeatureContext displayedFeaturedImages={featuredStoredImage}   />
{/* <div className="app_divider"/> */}

{/* for the HomeExploreFeed view  Starts*/}

<ExploreHeading forWhich="HomeFeeds" deskTopHeading={DeskTopHeadings[currentHeading]} mobileHeading={MobileHeadings[currentHeading]} />

{/* <Explore componentFrom="home" /> */}
{/* <Suspense fallback={<div>Loading Explore...</div>}> */}
 {/* </Suspense> */}

  <ExploreMasonry componentFrom="home" displayFor="forExplore" featurStoredImage={setFeatureStoredImage} lastUpdatedAt={setLastupdatedTime}  setCurrentObj={setSuggestedState} suggestedObjectClickedValue={suggestedState} />
  
 
<ExploreLinkButton buttonText={buttonTextForFreshFinds[buttonTextForFreshFind]} buttonType="explore" />
<div className="app_divider"/>
{/* for the HomeExploreFeed view  End*/}

{/* for the SavedByOthers view  Starts*/}
<ExploreHeading forWhich="SavedFeeds" deskTopHeading="Saved By Others" mobileHeading="Saved By Others" />
<ExploreMasonry componentFrom="home" displayFor="forSavedOthers" featurStoredImage={setFeatureStoredImage} lastUpdatedAt={setLastupdatedTime} setCurrentObj={setSuggestedState}  suggestedObjectClickedValue={suggestedState}/>

<ExploreLinkButton buttonText={buttonTextForSavedOthers[buttonText]} buttonType="explore" />
<div className="app_divider"/>
{/* for the SavedByOthers view  End*/}

{/* for the suggested view  Starts*/}

<ExploreHeading forWhich="SuggestedFeeds" deskTopHeading="Suggested for You" mobileHeading="Suggested for You" />
<ExploreMasonry componentFrom="home" displayFor="forSuggested" featurStoredImage={setFeatureStoredImage} lastUpdatedAt={setLastupdatedTime} setCurrentObj={setSuggestedState} suggestedObjectClickedValue={suggestedState} />
<ExploreLinkButton buttonText={`See More You’ll Love`} buttonType="explore" />
<div className="app_divider"/>
{/* for the suggested view  End */}

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
