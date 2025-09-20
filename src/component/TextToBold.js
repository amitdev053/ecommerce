import React, { useEffect, useState } from "react";
import "./TextToBold.css";
import Alert from "./Alert";
import { ToastContainer, toast } from "react-toastify";
import {CustomFontSelector} from "./SelectBox";
import { Helmet } from "react-helmet";
import ScrollTag from "./ScrollTag";

const suggestedCaptions = [
  "Tag your Love💖",
  "Dream big, shine bigger ✨",
  "No limits, only vibes 💫",
  "Slay all day 💎",
  "Good vibes only 🌈",
  "Boss mode: ON 🔥",
  "Keep shining ✨",
  "Chasing sunsets 🌅",
  "Self-love first 💖",
  "Mood: unstoppable 💥",
  "Glow up season 🌟",
  "Weekend mood 😎",
  "Confidence is key 🔑",
  "Stay golden 🌟",
  "Hustle in silence 💼",
  "Positive energy only ✨",
  "Be your own hero 🦸",
  "Less perfection, more authenticity 🌿",
  "Do what you love ❤️",
  "Fearless & free 🕊️",
  "Vibes speak louder than words 🎶",
  "Collect moments, not things 🌸",
  "Chill mode activated 😌",
  "Rise & grind 💪",
  "Smile more, worry less 😊",
  "Bold moves only ⚡",
  "Happiness is homemade 🏡",
  "Keep it classy 💎",
  "Life’s too short ✨",
  "Be the energy you want 💫",
  "Sassy, classy, and a bit smart-assy 😉",
  "Adventure awaits 🌍",
  "Good things take time ⏳",
  "Radiate positivity 🌞",
  "Queen energy 👑",
  "Just vibe with it ✨",
  "Stay wild, moon child 🌙",
  "Hustle hard, shine harder 💥",
  "Create your own sunshine ☀️",
  "Stay humble, hustle hard 💼",
  "Love yourself first 💖",
  "Be fearless, be you 🌟",
  "Dream. Plan. Do. 💫",
  "Collect memories, not regrets 🌸",
  "Chase the stars ✨",
  "Smile, it’s free therapy 😄",
  "Be bold, be brave ⚡",
  "Own your story 📖",
  "Glow like you mean it 🌟",
  "Radiate confidence 💎",
  "Stay golden, never settle 🌟",
  "Make it happen 💪"
];

const TextToBold = () => {
  const [maps, setMaps] = useState({});
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");
  const [selectedStyle, setSelectedStyle] = useState(null);
  let [userTyped, setUserTyped] = useState(false); 
  useEffect(() => {
    const mapFromOffsets = (upperOffset, lowerOffset) => {
      const map = {};
      const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
      for (let i = 0; i < 26; i++) {
        map[chars[i]] = String.fromCodePoint(upperOffset + i);
        map[chars[i + 26]] = String.fromCodePoint(lowerOffset + i);
      }
      return map;
    };

    let mapWords = {
      boldSerif: mapFromOffsets(0x1d400, 0x1d41a),
      boldSans: mapFromOffsets(0x1d5d4, 0x1d5ee),
      italic: mapFromOffsets(0x1d434, 0x1d44e),
      boldItalic: mapFromOffsets(0x1d468, 0x1d482),
      script: mapFromOffsets(0x1d49c, 0x1d4b6),
      fraktur: mapFromOffsets(0x1d504, 0x1d51e),
      doubleStruck: mapFromOffsets(0x1d538, 0x1d552),
      monospace: mapFromOffsets(0x1d670, 0x1d68a),
    };

    setMaps(mapWords);
    setSelectedStyle({
      label: "Bold (Serif)",
      value: "boldSerif",
    });
  }, []);

  useEffect(() => {
    if (!maps || !selectedStyle) return;

    const map = maps[selectedStyle.value];
    if (!map) return;

    const output = inputText
      .split("")
      .map((c) => map[c] || c)
      .join("");

    setOutputText(output);

    const outputEl = document.getElementById("output");
    if (outputEl) {
      if (inputText.trim()) {
        outputEl.classList.add("bold_output");
      } else {
        outputEl.classList.remove("bold_output");
      }
    }
  }, [inputText, maps, selectedStyle]);

  const copyOutput = () => {
    const text = document.getElementById("output").value;
    navigator.clipboard.writeText(text).then(() => {
      toast.success("Text copied to clipboard!");
    });
  };

    function displayDynamicBlogs() {
    // setPageState(1)
    setUserTyped(false)
    console.log("click on captions")
    let tagNames = document.querySelectorAll('.app_blog_tag_text');
  
    tagNames.forEach((tag) => {
      tag.replaceWith(tag.cloneNode(true)); // Clone the tag to remove all listeners
    });
  
    tagNames = document.querySelectorAll('.app_blog_tag_text'); // Re-query after replacing elements
  
    tagNames.forEach((tag) => {
      tag.addEventListener("click", (e) => {
        setUserTyped(false)
        
        // tagNames.forEach((tag) => tag.classList.remove('highlight_tag'));     
     
    
        // e.target.classList.add("highlight_tag");          
        // getBlogs(true, tag.innerText);
      setInputText(tag.innerText)
      highlightTags(tag.innerText)
      // const newUrl = `/blogs/suggest?query=${encodeURIComponent(tag.innerText)}`;
        
       
       
        // window.history.pushState({ path: newUrl }, '', newUrl);
    
      });
    });
  }
  function highlightTags(initialText){
      const tagNames = document.querySelectorAll('.app_blog_tag_text');
    tagNames.forEach((tag) => {
      if (tag.innerText === initialText) {
        tag.classList.add('highlight_tag');
      } else {
        tag.classList.remove('highlight_tag');
      }
    });
  }

  useEffect(() => {
  if (document.getElementById('inputText')) {
    // document.getElementById('inputText').focus();
    displayDynamicBlogs()
    setInputText(suggestedCaptions[0])
    highlightTags(suggestedCaptions[0])

     // Dynamically apply media query
    const style = document.createElement('style');
    style.innerHTML = `
      @media screen and (max-width: 680px) { 
        .st_blog_tag_suggestion {
          display: flex !important;
        }
      }
        .app_blog_tag_text{
        color: #160b0b;
        }
    `;
    document.head.appendChild(style);

    // Optional: clean up style when component unmounts
    return () => {
      document.head.removeChild(style);
    };
  }

}, []);

// Remove highlight if user types
useEffect(() => {
  if (userTyped ) {
    const tagNames = document.querySelectorAll(".app_blog_tag_text");
    tagNames.forEach((tag) => {
      tag.classList.remove("highlight_tag");
    });
  }
}, [inputText, userTyped]);



function shuffleArray(array) {
  return array.sort(() => Math.random() - 0.5);
}


  return (
    <>
    <Helmet>
  <title>Make Your Captions Stand Out | BrowseNext</title>
  <meta
    name="description"
    content="Bold Captions with ease using our Bold Captions Generator. Copy and paste into Instagram, WhatsApp, or any social media instantly."
  />
  <meta
    name="keywords"
    content="bold text generator, fancy text, text to bold, stylish fonts, social media fonts, Instagram bold text"
  />
  
  


   <meta property="og:title" content="Bold Captions For Yours Social Media Posts" />
  <meta property="og:description" content="Generate bold text with ease using our Bold Text Generator. Copy and paste into Instagram, WhatsApp, or any social media instantly." />
  <meta property="og:type" content="website" />
  <meta property="og:url" content={`https://www.browsenext.today/tools`} />
  <meta property="og:image" content= "https://www.browsenext.today/favicons.png" />
 <meta name="robots" content="index, follow" />
  <meta name="author" content="BrowseNext" />
</Helmet>

      <div className="container app_container text_to_bold_container">
        <div className="tool_header">
          <h1 className="app_tool_heading tool_inside_header">
            Bold Captions
          </h1>
          {selectedStyle && (
            <CustomFontSelector
              selected={selectedStyle}
              onSelect={setSelectedStyle}
            />
          )}
            
        </div>
        <ScrollTag whereFrom="captions" tagList={shuffleArray(suggestedCaptions)} />

        <div className="col_textTobold_output">
          <div className="input_div">
            <textarea
              className="user_textarea_input"
              id="inputText"
              
              placeholder="Enter text that you want to bold..."
              value={inputText}
              onChange={(e) => {
              setInputText(e.target.value)
              setUserTyped(true); 
              }

              }
            />
          </div>

          <div className="bold_text_ouput input_div position-relative">
            {inputText.trim() && (
              <i
               role="button"
              tabIndex={0}
              aria-label={`Copy bold Text`}
                className="fa-solid fa-copy copy_bold_texticon outline-none"
                onClick={copyOutput}
                 onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          copyOutput();
        }
      }}
              ></i>
            )}
            <textarea
              id="output"
              className="user_textarea_input"
              readOnly
              placeholder="Bold text will appear here..."
              value={outputText}
            />
          </div>
        </div>
      </div>
      <Alert position="bottom-center" />
      
    </>
  );
};

export default TextToBold;
