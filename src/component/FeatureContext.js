import { React, useEffect, useState, useRef, useMemo } from 'react';
import './FeatureContext.css';
import { useNavigate } from 'react-router-dom';
import DialogBox from './DialogBox';
import UserGuides from './UserGuides';
import Alert from './Alert';
import { toast } from 'react-toastify';
// let totalListenBlogs = "30";
// let totalDownloadImages = "100";
// let totalCopiedCaptions = "150" ;
const startValues = {
  totalDownloadImages: 100,
  totalListenBlogs: 30,
  totalCopiedCaptions: 150
};


const features = [
   {
    image: '/assets/find-images.svg',
    // emoji: '🖼️',
    emoji: '✨',
    // badge: 'For Social Media Creators 🖼️',
    badge: 'For Social Media Creators 🎨',    
    title: 'Instantly Get Perfect Images on Your Niche',
    modelTitle: 'Instantly Get Perfect Images on Your Niche',
    // title: 'Get Stunning Images for Your Niche in Seconds!',
    description: 'Choose stunning visuals instantly matching your niche and style in a seconds.',
    // totalDownloads: `Today's Download Images - ${totalDownloadImages}`,
    // totalDownloads: `${startValues.totalDownloadImages}+ Downloaded Images Today...`,
    totalDownloads: `+ Downloaded Images Today...`,
    // description: 'Discover visuals that perfectly match your style—fast and easy.',
    // fullDescription: "Discover the ultimate tool for effortlessly finding perfect images tailored to your content niche. Whether you’re creating blog posts, social media content, presentations, or marketing materials, our platform instantly delivers stunning visuals that match your unique style and subject. No more endless scrolling through irrelevant photos — simply define your niche, and our intelligent image search engine curates a personalized selection just for you. ",

    // fullDescription: `
    //   <p>Discover the ultimate tool for effortlessly finding perfect <strong>images content </strong> for your <strong> niche </strong>. Whether you’re creating blog posts, social media content, presentations, or marketing materials, our platform instantly delivers stunning visuals that match your unique style and subject. <strong> No more endless scrolling </strong> through irrelevant <strong>photos </strong>— simply define your niche, and our intelligent image search engine curates a personalized selection <strong>just for you </strong>.</p>
    // `,
    fullDescription: `
  <p>Explore a world of stunning <strong>images</strong> tailored to your interests with our <strong>Explore</strong> feature. From trending topics to niche categories, our platform makes it effortless to discover visuals that inspire and match your needs. With <strong>Explore Images</strong>, you get a curated stream of high-quality photos that refresh regularly—perfect for <strong>blogs</strong>, <strong>social media</strong>, <strong>presentations</strong>, or any creative project. <strong>No more endless searching</strong>—just fresh, relevant, and beautiful images delivered <strong>for you</strong>...</p>

  <ul>
  <li><strong>Fresh Discoveries :-</strong> 
    <p style="display: block !important;
    position: relative;
    left: 5%;
    width: 99% !important;
    top: -2px !important;
    
    ">Browse a constantly updating feed of <strong>high-quality images</strong> across fashion, tech, travel, nature, and more.</p>
  </li>

  <li><strong>ExploreNext :-</strong> 
    <p style="display: block !important;
    position: relative;
    left: 5%;
    width: 99% !important;
    top: -2px !important;
    
    ">Click any image to instantly see a <strong>larger preview</strong>, metadata, and <strong>related visuals</strong>—perfect for inspiration or deep dives.</p>
  </li>

  <li><strong>Smart Curation :-</strong> 
    <p style="display: block !important;
    position: relative;
    left: 5%;
    width: 99% !important;
    top: -2px !important;
    
    ">Our platform <strong>rotates fresh images hourly</strong>, so there’s always something new to discover without endless scrolling.</p>
  </li>

  <li><strong>Creative Uses :-</strong> 
    <p style="display: block !important;
    position: relative;
    left: 5%;
    width: 99% !important;
    top: -2px !important;
    
    ">Find the right images for <strong>blog posts</strong>, <strong>social media</strong>, or <strong>presentations</strong>—all in one place.</p>
  </li>

  <li><strong>Save & Share :-</strong> 
    <p style="display: block !important;
    position: relative;
    left: 5%;
    width: 99% !important;
    top: -2px !important;
    
    ">Engage with visuals you like, and easily <strong>share them</strong> or come back later for more inspiration.</p>
  </li>
</ul>



`
,
    // buttonText: 'See Images',
    buttonText: 'Explore Now',
  },
  {
    image: '/assets/listen-blogs.svg',
    emoji: '🎧',
    title: ' Try Now Listen Blogs for Free',
    modelTitle: 'Listen Blogs for Free',
    badge: 'For Commuters or Learners 🎧',
    // totalDownloads: `Today's Listen Blogs - ${totalListenBlogs}`,
    // totalDownloads: `${startValues.totalListenBlogs}+ Listened Blogs Today...`,
    totalDownloads: `+ Listened Blogs Today...`,
    // title: 'Turn Blogs into Audio — Listen for Free!',
    description: 'Turn blogs to audio and listen anytime, anywhere — hands-free!',
    // fullDescription:"Say goodbye to screen fatigue and hello to hands-free learning! With our ‘Listen Blogs for Free’ feature, you can instantly turn your favorite blogs into audio — and listen anytime, anywhere. Whether you’re commuting, working out, relaxing at home, or multitasking, let the words come to life through clear, natural-sounding voice narration. No subscriptions, no limits — just hit play and enjoy blog content like a podcast. ",

    fullDescription: `
      <p>Say goodbye to screen fatigue and hello to hands-free learning! With our <strong>Listen Blogs feature </strong> for free, you can instantly turn your favorite <strong> blogs into audio </strong>— and listen anytime, anywhere. Whether you’re commuting, working out, relaxing at home, or multitasking, let the words come to life through clear, natural-sounding voice narration. No subscriptions, no limits — just hit play and enjoy blog content like a <strong>podcast</strong>.</p>
    `,
    buttonText: 'Start Listening',
  },
 
  {
    image: '/assets/format-captions.svg',
    emoji: '📝',
    title: 'Format Eye-Catching Captions With Ease',
    modelTitle: 'Welcome to Markdown Converter!',
    badge: 'For Caption Stylers ✍️',
    // totalDownloads: ` ${startValues.totalCopiedCaptions}+ Copied Captions today...`,
    totalDownloads: `+ Copied Captions Today...`,
    // title: 'Create Eye-Catching Captions with Ease!',
    // description: 'Style your social posts and descriptions effortlessly using smart tools.',
    description: 'Boost your social posts with smart, stylish formatting tools.',
    fullDescription: `<p>Transform your <strong>social media captions effortlessly</strong> with our Bold Caption Tool. Say goodbye to boring text—simply type or paste your content, and choose from <strong>7–8 stylish font styles</strong> to make your captions stand out! Whether you’re creating posts for <i class="fa-brands fa-instagram"></i> Instagram, <i class="fa-brands fa-linkedin"></i> LinkedIn, <i class="fa-brands fa-threads"></i> Threads, or <i class="fa-brands fa-twitter"></i> Twitter, our tool ensures <strong>eye-catching, readable captions in seconds</strong>. Boost engagement, save time, and make your content shine with just a few clicks.</p>
    <div class="usage_guide"><i class="fa-solid fa-message"></i> How to Use the Bold Caption Tool</div>

      <ul> <li><strong>Choose Your Font Style:</strong> <p>Select from 7–8 unique font styles to give your captions a distinctive look.</p></li> <li><strong>Suggested Captions:</strong> <p>Get inspiration instantly with our curated caption suggestions for any post.</p></li> <li><strong>Copy & Share:</strong> <p>Copy your styled captions easily and share them directly across <i class="fa-brands fa-instagram"></i> Instagram, <i class="fa-brands fa-linkedin"></i> LinkedIn, <i class="fa-brands fa-threads"></i> Threads, or <i class="fa-brands fa-twitter"></i> Twitter.</p></li> <li><strong>Editing Made Easy:</strong> <p>Make quick changes in our simple editor and preview your captions instantly.</p></li> <li><strong>Fun & Engaging:</strong> <p>Add bold text, mix emojis, or try different font combinations—make your captions unique, fast, and fun! 💡</p></li> </ul>
    `,
    // fullDescription: `
 

 
    // `,

    
 
    buttonText: 'Get Started',
  },
];

// "What Would You Like to Explore Today?",
// Scroll Less, Find More,
// New Finds, Just for You,
// Explore What’s Trending Now,
// Explore. Discover. Create.

const headings = [
  "Discover Something You’ll Love Today",
  "Make Your Captions Stand Out on Social Media",
  "Build, Explore & Create — All in One Place",
  "Explore What’s Trending Now",
  "Listen to Our Blogs Into Audio",
  "Turn Blogs into Audio — Free & Easy",
  "Build. Explore. Create. — All in One Platform",
  "Bold Your Captions — Impress with Every Post",
   "Read Less, Listen More — Audio Blogs for You"
  
];

const FeatureContext = () => {
  const usenavigate = useNavigate();
  const cardsRef = useRef([]);
  const intervalRef = useRef(null);
  // const [cartProcess , setCartProcess] = useState(false)

  const [isPaused, setIsPaused] = useState(false);
  const [guides, setGuides] = useState(false)
  const [isLoadingGuides, setLoadingGuides] = useState(false)     // for the user guide descripation
  const [currentIndex, setCurrentIndex] = useState(0); // 🆕 track current index
  const [guideContent, setGuideContent] = useState({
  title: '',
  description: '',
  buttonText: '',
  modelType: '',
});
  const [currentHeading, setCurrentHeading] = useState(0);
  const [totals, setTotals] = useState(startValues);
  const [openUserModelCounts, setOpenUserModelCounts] = useState(0)
  let incrementBy = 1

  const STEP = 100;                 // change to 50 if you want +50 per second
// const TICK_MS = 1000;

const tickRef = useRef(null);
const midnightRef = useRef(null);

// --- daily baseline helpers ---
const getDaysSinceStart = () =>
  Math.floor(
    (Date.now() - new Date("2025-09-06T00:00:00").getTime()) / 86400000
  );

// alternates: day 0 => +0, day 1 => +50, day 2 => +0, ...
const getDailyBoost = () => (getDaysSinceStart() % 2) * 50;

const applyBoost = (base, boost) => ({
  totalDownloadImages: base.totalDownloadImages + boost,
  totalListenBlogs: base.totalListenBlogs + boost,
  totalCopiedCaptions: base.totalCopiedCaptions + boost,
});

const scheduleMidnightReset = () => {
  const now = new Date();
  const nextMidnight = new Date(now);
  nextMidnight.setHours(24, 0, 0, 0);
  const ms = nextMidnight - now;

  if (midnightRef.current) clearTimeout(midnightRef.current);
  midnightRef.current = setTimeout(() => {
    setTotals(applyBoost(startValues, getDailyBoost())); // reset baseline
    scheduleMidnightReset(); // schedule next day
  }, ms);
};

// useEffect(() => {
//   // 1) set initial daily baseline once
//   setTotals(applyBoost(startValues, getDailyBoost()));
//   const now = new Date();
//   const msUntilNextHour = (60 - now.getMinutes()) * 60 * 1000 - now.getSeconds() * 1000 - now.getMilliseconds(); 
//   // const msUntilNextHour = 1000;

//   // 2) rotate headings every 1s (your logic)
//   const headingInterval = setInterval(() => {
//     setCurrentHeading((prev) => (prev + 1) % headings.length);
//   }, msUntilNextHour);

//   // 3) increment totals every 1s
//   if (tickRef.current) clearInterval(tickRef.current);
//   tickRef.current = setInterval(() => {
//     setTotals((prev) => ({
//       totalDownloadImages: prev.totalDownloadImages + STEP,
//       totalListenBlogs: prev.totalListenBlogs + STEP,
//       totalCopiedCaptions: prev.totalCopiedCaptions + STEP,
//     }));
//   // }, TICK_MS);
//   }, msUntilNextHour);

//   // 4) reset at midnight
//   scheduleMidnightReset();

//   return () => {
//     clearInterval(headingInterval);
//     if (tickRef.current) clearInterval(tickRef.current);
//     if (midnightRef.current) clearTimeout(midnightRef.current);
//   };
// }, []);

const START_DATE = new Date("2025-09-06T00:00:00").getTime();
// useEffect(() => {
//   const updateTotals = () => {
//     const now = Date.now();
//     const hoursPassed = Math.floor((now - START_DATE) / (1000 * 60 * 60));

//     // Always base from startValues + hoursPassed * STEP
//     setTotals({
//       totalDownloadImages: startValues.totalDownloadImages + hoursPassed * STEP,
//       totalListenBlogs: startValues.totalListenBlogs + hoursPassed * STEP,
//       totalCopiedCaptions: startValues.totalCopiedCaptions + hoursPassed * STEP,
//     });

//     setCurrentHeading((prev) => (prev + 1) % headings.length);
//   };

//   // Run once immediately
//   updateTotals();

//   // Align first interval to the next exact hour
//   const now = new Date();
//   const msUntilNextHour =
//     (60 - now.getMinutes()) * 60 * 1000 -
//     now.getSeconds() * 1000 -
//     now.getMilliseconds();

//   const alignTimeout = setTimeout(() => {
//     updateTotals(); // run at exact hour mark

//     tickRef.current = setInterval(updateTotals, 60 * 60 * 1000); // every hour
//   }, msUntilNextHour);

//   // Reset at midnight
//   scheduleMidnightReset();

//   return () => {
//     clearTimeout(alignTimeout);
//     if (tickRef.current) clearInterval(tickRef.current);
//     if (midnightRef.current) clearTimeout(midnightRef.current);
//   };
// }, []);

const getTodayMidnight = () => {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  return d.getTime();
};

useEffect(() => {
  const updateTotals = () => {
    const now = Date.now();
    const hoursPassed =
      Math.floor((now - getTodayMidnight()) / (1000 * 60 * 60));

    setTotals({
      totalDownloadImages: startValues.totalDownloadImages + hoursPassed * STEP,
      totalListenBlogs: startValues.totalListenBlogs + hoursPassed * STEP,
      totalCopiedCaptions: startValues.totalCopiedCaptions + hoursPassed * STEP,
    });
  };

  updateTotals();

  const now = new Date();
  const msUntilNextHour =
    (60 - now.getMinutes()) * 60 * 1000 -
    now.getSeconds() * 1000 -
    now.getMilliseconds();

  const alignTimeout = setTimeout(() => {
    updateTotals();
    tickRef.current = setInterval(updateTotals, 60 * 60 * 1000);
  }, msUntilNextHour);

  scheduleMidnightReset(); // keeps daily baseline fresh

  return () => {
    clearTimeout(alignTimeout);
    if (tickRef.current) clearInterval(tickRef.current);
    if (midnightRef.current) clearTimeout(midnightRef.current);
  };
}, []);





  useEffect(() => {
  // Set heading based on current hour
  const hour = new Date().getHours();
  const index = hour % headings.length;
  setCurrentHeading(index);
  // updateTotals()
  
  const now = new Date();
const msUntilNextHour = (60 - now.getMinutes()) * 60 * 1000 - now.getSeconds() * 1000 - now.getMilliseconds();
  // const msUntilNextHour = 1000;

  const timeout = setTimeout(() => {
    setCurrentHeading((prev) => (prev + 1) % headings.length);
    const interval = setInterval(() => {
      setCurrentHeading((prev) => (prev + 1) % headings.length); 
   
    }, 60 * 60 * 1000); 
    // },  1000); 
    
  }, msUntilNextHour);

  return () => {
    clearTimeout(timeout);
    
  };
}, []);




  function startAutoHover(startFrom = 0) {
    let index = startFrom;
    stopAutoHover();
    let steps =0
    intervalRef.current = setInterval(() => {
      if (isPaused) return;

      cardsRef.current.forEach((card, idx) => {
        if (card) {
          card.classList.toggle('hovered', idx === index);
        }
      });

      index = (index + 1) % cardsRef.current.length;
      setCurrentIndex(index); // update currentIndex in state
      steps++
      if (steps > cardsRef.current.length) {
        stopAutoHover(); // ✅ stop after one full loop
        removeAnimation(index)
    }
    }, 1000);
  }

  function stopAutoHover() {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }
  function removeAnimation(currentIndex) {
    cardsRef.current.forEach((card, idx) => {
      if (card) {
        card.classList.remove('hovered', idx === currentIndex);
      }
    });
    
  }

  useEffect(() => {
    startAutoHover(currentIndex); // 🆕 when paused ends, resume from saved index    
    return () => stopAutoHover();
  }, []);   // isPaused we can also use here for reset after hover

  function handleMouseEnter(index) {
    setIsPaused(true);
    setCurrentIndex(index + 1); // 🆕 start from next card later
    cardsRef.current.forEach((card, idx) => {
      if (card) {
        card.classList.toggle('hovered', idx === index);
      }
      setTimeout(() => {
        card.classList.remove('hovered', idx === index);
      }, 2000)
    });
  }

  function handleMouseLeave() {
    setIsPaused(false);
  }

  function navigatePage(element) {
    if (element.innerText === "Start Listening") {
      usenavigate('/blogs');
    } else if (element.innerText === "Explore Now") {
      usenavigate('/explore');
    } else {
      usenavigate('/tools');
    }
  }
  function blockOutSideElement(type){
    console.log("lock guides", type)
    const body = document.getElementsByTagName("body")[0]
    const bodyChildren = body.children
    Array.from(bodyChildren).forEach((element)=>{
      if(!element.getAttribute("guides") && !element.classList.contains("navbar")){
        
        if(type){
          // element.setAttribute("aria-hidden", true)
          // element.setAttribute("inert", true)
          body.style.overflow = 'hidden';

        }else{
          // element.removeAttribute("aria-hidden")
          // element.removeAttribute("inert")
          body.style.overflow = 'auto';
          // body.style.position = '';
        }
      }
    })
      // ✅ Set scroll block/unblock only once
  if (type) {
    body.style.overflow = 'hidden';
    body.style.position = 'fixed';
  } else {
    body.style.overflow = '';
    body.style.position = '';
  }
  }
  function extendUserGuidesModelHeight(userGuideContent, type){
      if(userGuideContent){ 
  
              // if(userGuideContent.scrollHeight > 298){
              //   userGuideContent.style.transition = "all 0.2s linear"
              //   userGuideContent.style.height = "42dvh"
              // }else{
              //   userGuideContent.style.height = "30dvh"                
              // }  
              if(type !== "blogs"){
                  userGuideContent.style.transition = "all 0.2s linear"
                userGuideContent.style.height = "42dvh"
              }

    }
  }
  function openGuides(feature, index) {
    console.log("open guides", feature, index)
    let type 
    let buttonContent = "Got it!"
    if(index === 0){
      type= "images"
      buttonContent = "Start Exploring Now"
      // buttonContent = "Explore Trending Photos"
    }else if(index === 1){
      type ="blogs"
      buttonContent = "Start Listening Now"
    }else{
      type ="tools"
      buttonContent = "Try it Now"
      
    }

    let userGuideContent = document.getElementById('userGuideContent')
      // Save feature data into state
  setGuideContent({
    title: feature.modelTitle,
    description: feature.fullDescription,
    // buttonText: 'Got it!',
    buttonText: buttonContent,
    modelType: type,
  });
    blockOutSideElement(true)
    setLoadingGuides(true)


    // setTimeout(()=>{
      if(window.innerWidth < 550){
        extendUserGuidesModelHeight(userGuideContent, type)
      }
// }, 1500)
    
document.getElementById("UserGuides").classList.add("dialog_container_fluid_show")
document.getElementById("UserGuides").style.transform = `translateY(0)`;
document.getElementById("UserGuides").setAttribute("fromInfo", true)

if(window.innerWidth < 550){

  if(!sessionStorage.getItem("openedUserGuideModel") && openUserModelCounts === 0){
    toast.info("Swipe Down to Close")
    setOpenUserModelCounts(1)
    sessionStorage.setItem("openedUserGuideModel", true)
  }
}


document.getElementById("UserGuides").addEventListener("click", (event) => {
  if(event.target === document.getElementById("okGuides")){
    // console.log("ok order")
    setLoadingGuides(false)
    setGuides(true)
    setTimeout(() => {
      setGuides(false)
      blockOutSideElement(false)
      if(  document.getElementById("UserGuides")){
        document.getElementById("UserGuides").style.transform = `translateY(100%)`;
        document.getElementById("UserGuides").style.overflowY = `auto`;
        document.getElementById("UserGuides").classList.remove("dialog_container_fluid_show")
        userGuideContent.style.height = "30dvh"

      }
      navigateApp(type)
    }, 500)
  }

})


}

function navigateApp(type){
    if(type === "images"){
        usenavigate('/explore');
    }else if(type === "blogs"){
        usenavigate('/blogs');
    }else if(type === "tools"){
      usenavigate('/tools');
    }
}

  return (
    <>
    <section className="feature-section">
    <h1 class="app_section_heading">{headings[currentHeading]}</h1>
      <div className="feature-cards-wrapper">
        {features.map((feature, idx) => (
          <div
            key={idx}
            className="feature-card position-relative"
            ref={(el) => (cardsRef.current[idx] = el)}
            onMouseEnter={() => handleMouseEnter(idx)}
            onMouseLeave={handleMouseLeave}
            tabIndex={0} // Make it focusable
            
          >
          <p className="badge">{feature.badge}</p>
            <i className="fa-solid fa-ellipsis position-absolute app_feature_icons" onClick={()=>openGuides(feature, idx)}></i>
            <div className="feature-emoji">{feature.emoji}</div>
            <h3>{feature.title}</h3>
            <p>{feature.description}</p>
            <p class="badge app_download_assets" id={`feature${idx}`}>  {[
    totals.totalDownloadImages,
    totals.totalListenBlogs,
    totals.totalCopiedCaptions,
  ][idx]}{feature.totalDownloads}</p>
            <button className="feature-btn" onClick={(e) => navigatePage(e.target)}>{feature.buttonText}</button>
          </div>
        ))}
      </div>
    </section>
    <UserGuides title={guideContent.title} description={guideContent.description} buttonText={guideContent.buttonText} guides={guides} loadingF={setLoadingGuides} isLoadingGuides={isLoadingGuides} modelType={guideContent.modelType} />
    <Alert position="bottom-center" />
    </>
  );
};

export default FeatureContext;
