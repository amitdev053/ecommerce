import { React, useEffect, useState, useRef } from 'react';
import './FeatureContext.css';
import { useNavigate } from 'react-router-dom';
import DialogBox from './DialogBox';
import UserGuides from './UserGuides';
const features = [
   {
    image: '/assets/find-images.svg',
    // emoji: '🖼️',
    emoji: '✨',
    title: 'Instantly Get Perfect Images on Your Niche',
    modelTitle: 'Instantly Get Perfect Images on Your Niche',
    // title: 'Get Stunning Images for Your Niche in Seconds!',
    description: 'Choose stunning visuals instantly matching your niche and style in a seconds.',
    // description: 'Discover visuals that perfectly match your style—fast and easy.',
    // fullDescription: "Discover the ultimate tool for effortlessly finding perfect images tailored to your content niche. Whether you’re creating blog posts, social media content, presentations, or marketing materials, our platform instantly delivers stunning visuals that match your unique style and subject. No more endless scrolling through irrelevant photos — simply define your niche, and our intelligent image search engine curates a personalized selection just for you. ",

    fullDescription: `
      <p>Discover the ultimate tool for effortlessly finding perfect <strong>images content </strong> for your <strong> niche </strong>. Whether you’re creating blog posts, social media content, presentations, or marketing materials, our platform instantly delivers stunning visuals that match your unique style and subject. <strong> No more endless scrolling </strong> through irrelevant <strong>photos </strong>— simply define your niche, and our intelligent image search engine curates a personalized selection <strong>just for you </strong>.</p>
    `,
    // buttonText: 'See Images',
    buttonText: 'Explore Now',
  },
  {
    image: '/assets/listen-blogs.svg',
    emoji: '🎧',
    title: 'Listen Blogs for Free',
    modelTitle: 'Listen Blogs for Free',
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
    // title: 'Create Eye-Catching Captions with Ease!',
    // description: 'Style your social posts and descriptions effortlessly using smart tools.',
    description: 'Boost your social posts with smart, stylish formatting tools.',
    fullDescription: `<p>Transform your <strong> content effortlessly</strong> with our HTML-to-Markdown converter. Say goodbye to complicated formatting—simply paste your HTML, and let our tool do the magic! Whether <strong> you're creating </strong> blog posts, social media content, or documentation, this easy-to-use tool ensures clean,<strong>readable Markdown in seconds </strong>. Boost your productivity and take control of your formatting with advanced features that handle everything from <strong> headings to hyperlinks </strong>. With this tool, you'll always have polished, professional posts ready to share across any platform. Save time, streamline your workflow, and start formatting like a <strong>pro today</strong>! </p>
    <div class="usage_guide"><i class="fa-solid fa-message"></i> Usage Of Markdown Tool</div>
      <ul>
      <li><strong>Blog Migration :-</strong> <p>Move HTML posts to Markdown platforms for faster, easier sites.</p></li>
      <li><strong>Social Media Captions :-</strong> <p> Create beautiful captions and descriptions for </nbsp> <i class="fa-brands fa-instagram"></i> Instagram, <i class="fa-brands fa-linkedin"></i> LinkedIn, <i class="fa-brands fa-threads"></i> Threads, or <i class="fa-brands fa-twitter"></i> Twitter — then copy and post easily.</p></li>
      <li><strong>Documentation :-</strong> <p> Convert snippets for clean, readable <i class="fa-brands fa-github"></i> GitHub READMEs  </p></li>
      <li><strong>Social Sharing :-</strong> <p> Reuse content in Slack, Notion, or Discord with clean formatting.</p></li>
      <li><strong>Editing Ease :-</strong> <p> Edit content faster in simple Markdown editors.</p></li>
      </ul>
    `,
    // fullDescription: `
 

 
    // `,

    
 
    buttonText: 'Get Started',
  },
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
  buttonText: ''
});

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
    const body = document.getElementsByTagName("body")[0]
    const bodyChildren = body.children
    Array.from(bodyChildren).forEach((element)=>{
      if(!element.getAttribute("guides") && !element.classList.contains("navbar")){
        if(type){
          // element.setAttribute("aria-hidden", true)
          // element.setAttribute("inert", true)
          // body.style.overflow = 'hidden';

        }else{
          // element.removeAttribute("aria-hidden")
          // element.removeAttribute("inert")
          // body.style.overflow = 'auto';
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
  function openGuides(feature) {
    console.log("open guides", feature)
      // Save feature data into state
  setGuideContent({
    title: feature.modelTitle,
    description: feature.fullDescription,
    buttonText: 'Got it!'  // Or feature.buttonText if you want dynamic
  });
    blockOutSideElement(true)
    setLoadingGuides(true)
    
document.getElementById("UserGuides").classList.add("dialog_container_fluid_show")
document.getElementById("UserGuides").style.transform = `translateY(0)`;
document.getElementById("UserGuides").setAttribute("fromInfo", true)
document.getElementById("UserGuides").addEventListener("click", (event) => {
  if(event.target === document.getElementById("okGuides")){
    console.log("ok order")
    setLoadingGuides(false)
    setGuides(true)
    setTimeout(() => {
      setGuides(false)
      blockOutSideElement(false)
      document.getElementById("UserGuides").style.transform = `translateY(100%)`;
      document.getElementById("UserGuides").style.overflowY = `auto`;
      document.getElementById("UserGuides").classList.remove("dialog_container_fluid_show")
    }, 1500)
  }

})


}

  return (
    <>
    <section className="feature-section">
      <div className="feature-cards-wrapper">
        {features.map((feature, idx) => (
          <div
            key={idx}
            className="feature-card position-relative"
            ref={(el) => (cardsRef.current[idx] = el)}
            onMouseEnter={() => handleMouseEnter(idx)}
            onMouseLeave={handleMouseLeave}
            
          >
            <i className="fa-solid fa-ellipsis position-absolute app_feature_icons" onClick={()=>openGuides(feature)}></i>
            <div className="feature-emoji">{feature.emoji}</div>
            <h3>{feature.title}</h3>
            <p>{feature.description}</p>
            <button className="feature-btn" onClick={(e) => navigatePage(e.target)}>
              {feature.buttonText}
            </button>
          </div>
        ))}
      </div>
    </section>
    <UserGuides title={guideContent.title} description={guideContent.description} buttonText="Got it!" guides={guides} loadingF={setLoadingGuides} isLoadingGuides={isLoadingGuides} />
    </>
  );
};

export default FeatureContext;
