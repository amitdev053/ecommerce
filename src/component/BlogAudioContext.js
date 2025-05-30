
import React, { createContext, useState, useEffect, useRef } from "react";
import { json, Navigate, Route } from "react-router-dom";
import { toast } from "react-toastify";

// Create context
export const BlogAudioContext = createContext();

export function BlogAudioProvider({ children }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentBlog, setCurrentBlog] = useState(null);
  const utteranceRef = useRef(null);
  const [isPaused, setIsPaused] = useState(false);
  const[blogTexts, setBlogTexts] = useState("")
  const[blogTitles, setBlogTitle] = useState("")
  const [stopPlaying, setStopPlaying] = useState(false)
  const [samePage, setSamePage] = useState(true)


  

  const playBlog = (blogId, blogTitle , blogText, restore) => {
    if (utteranceRef.current) {
      window.speechSynthesis.cancel(); // Stop any existing speech
    }
  setBlogTexts(blogText)
  setBlogTitle(blogTitle)
    utteranceRef.current = new SpeechSynthesisUtterance(blogText.innerText);
    utteranceRef.current.voice = window.speechSynthesis
      .getVoices()
      .find((v) => v.lang === "en-US") || window.speechSynthesis.getVoices()[0];
  // console.log("current voice", utteranceRef.current.voice, window.speechSynthesis.getVoices())
    setCurrentBlog({ blogId: blogId ,title: blogTitle, text: blogText.innerText });
    setIsPlaying(true);
    setIsPaused(true);
    setSamePage(false)
    if(sessionStorage.length > 0){
      sessionStorage.clear()
    }
    // ✅ Retrieve saved progress
    // let savedProgress = sessionStorage.getItem(`lastWordIndex`);
    let savedProgress = sessionStorage.getItem(blogTitle);
    // let savedProgress = sessionStorage.getItem(blogTitles);
    
    let startWordIndex = savedProgress ? JSON.parse(savedProgress).lastWordIndex : 0;
    // console.log("startWordIndex",startWordIndex)
    highlightWords(utteranceRef.current, blogText, true, startWordIndex, blogTitle); // Pass true to restore highlights
    window.speechSynthesis.speak(utteranceRef.current);
  
    utteranceRef.current.onend = () => {
      setIsPlaying(false);
      sessionStorage.removeItem(blogTitles); // Reset saved progress after completion
    };
    utteranceRef.current.onerror = (error) =>{
      console.log("error happening on speaking", error)
      if(!stopPlaying){      
        toast.error("Play blogs again...")
        setIsPlaying(false);
        setStopPlaying(true)
      }
    }
  };
  function wrapTextNodes(node, callFroms) {
    // console.log("wrap text node", node, callFroms)
    const fragment = document.createDocumentFragment();

    if (node.nodeType === Node.TEXT_NODE && node.textContent.trim() !== "") {
      
      const words = node.textContent.match(/\S+/g) || [];
      // console.log("wrap text node...", node ,words)
      
      
      words.forEach((word) => {
        let span = document.createElement("span");
        span.className = "highlightable-word";
        span.textContent = word + " ";
        // node.appendChild(span)
        fragment.appendChild(span);
      });

      node.replaceWith(fragment);
    } else if (node.nodeType === Node.ELEMENT_NODE && !node.matches("code, pre, .highlight")) {
      Array.from(node.childNodes).forEach(wrapTextNodes);
    }
  
    // console.log("fragments", fragment, node, wrapTextNodes)
  }
  function highlightWords(utterance, textElement, restore = false, startWordIndex = 0, currentPlayingTitle) {
    let currentWordIndex = restore ? startWordIndex : 0;
    // let currentWordIndex = parseInt(localStorage.getItem("lastWordIndex") || "0");
  
    // ✅ Ensure words are wrapped only once
    if (!textElement.querySelector(".highlightable-word")) {
      // console.log("yes words are also highlighting", textElement)    
  
      wrapTextNodes(textElement, "notColored");

    }
  
    
    const wordSpans = textElement.querySelectorAll(".highlightable-word");
    // function highlightReadWords(index) {
    
    //   wordSpans.forEach((span, i) => {
    //     span.style.backgroundColor = i <= index ? "red" : ""; // Apply highlight
    //   });
  
    // }
    
  
    // ✅ Restore previous highlights when the user returns
    if (restore && currentWordIndex > 0) {
      highlightReadWords(currentWordIndex);
      // console.log("inside restore condition")
    }
  
    // Track word start positions
    let wordStartIndexes = [];
    let currentCharCount = 0;

    wordSpans.forEach((span) => {
      wordStartIndexes.push(currentCharCount);
      currentCharCount += span.textContent.length;
    });
  
    // ✅ Speech API event to track spoken words
    utterance.onboundary = (event) => {
      // console.log("on boundary", event)
      let charIndex = event.charIndex;
  
      for (let i = 0; i < wordStartIndexes.length; i++) {
        if (charIndex < wordStartIndexes[i]) {
          currentWordIndex = Math.max(0, i - 1);
          break;
        } else {
          currentWordIndex = i;
        }
      }
  
      // console.log("Highlighting word at index:", currentWordIndex);
      sessionStorage.setItem(currentPlayingTitle ,JSON.stringify({ lastWordIndex: currentWordIndex }))
      highlightReadWords(currentWordIndex);

      // wrapTextNodes(textElement);
      // console.log("highlighted running", currentWordIndex)
      
      // sessionStorage.setItem(`lastWordIndex` ,JSON.stringify({ lastWordIndex: currentWordIndex })

      
    };
  }

  function highlightReadWords() {
    const textElement = document.getElementById("textToSpeak");
    if (!textElement) return;
     
      if (document.querySelector(".blog_back_heading").innerText === Object.keys(sessionStorage)[0]) {
        
        const sessionKeys = Object.keys(sessionStorage)[0]
        const storedData = sessionStorage.getItem(blogTitles);
        // const storedData = sessionStorage.getItem(sessionStorage[0]);
        const lastWordIndex = storedData ? JSON.parse(storedData).lastWordIndex : JSON.parse(sessionStorage.getItem(sessionKeys)).lastWordIndex;
        
        // console.log("matched!!!", storedData , lastWordIndex, JSON.parse(sessionStorage.getItem(sessionKeys)).lastWordIndex)
    // ✅ Wrap text in spans again if missing
    if (!textElement.querySelector(".highlightable-word")) {
        wrapTextNodes(textElement, "Rewrapping Words");
    }

    // ✅ Get all wrapped words
    let wordSpans = textElement.querySelectorAll(".highlightable-word");

    // ✅ Apply highlight to previously read words
    wordSpans.forEach((span, i) => {
        span.style.backgroundColor = i < lastWordIndex ? "black" : "";
        span.style.color = i < lastWordIndex ? "white" : "";
    });
    setSamePage(true)
  }else{
    // console.log("not matched")
    setSamePage(false)
  }
}



useEffect(()=>{
  document.addEventListener("DOMContentLoaded", () => {
    highlightReadWords();
});
 })  
  
  


function removeWordHighlights(textElement) {
  const wordSpans = textElement.querySelectorAll(".highlightable-word");
  wordSpans.forEach((span) => span.style.backgroundColor = "");
}
// Function to stop playback
const stopBlog = () => {
if (utteranceRef.current) {
    window.speechSynthesis.cancel();
}
// sessionStorage.setItem(`lastWordIndex`,JSON.stringify({ lastWordIndex: 0 }))
sessionStorage.removeItem(blogTitles)
setIsPlaying(false);
setCurrentBlog(null);  
removeWordHighlights(blogTexts)
setStopPlaying(true)
};

// Function to pause or resume playback
const togglePlayPause = () => {
    // console.log("inside else", speechSynthesis)
    if (!window.speechSynthesis.speaking) return; // Ensure speech is running

  if (window.speechSynthesis.paused) {
    // console.log("Resuming speech...");
    window.speechSynthesis.resume();
    setIsPaused(true);
    // setIsPlaying(true);
  } else {
    // console.log("Pausing speech...");
    window.speechSynthesis.pause();
    setIsPaused(false);
    // setIsPlaying(false);
  }



  };
  useEffect(() => {
    // console.log("logs...")
    // Stop speech synthesis when the page reloads
    window.speechSynthesis.cancel();
    return () => {
      window.speechSynthesis.cancel(); // Also cancel when unmounting
    };
  }, []);



 

  return (
    <BlogAudioContext.Provider value={{ isPlaying, currentBlog, isPaused, setIsPaused ,playBlog, stopBlog, togglePlayPause, samePage }}>
      {children}
    </BlogAudioContext.Provider>
  );
}


  
  const togglePlayPause = () => {
    console.log("inside else", speechSynthesis)
    // if(speechSynthesis.speaking && speechSynthesis.pause){
    //     setIsPaused(true);

    // } 

    //     if(speechSynthesis.speaking && speechSynthesis.pause && !isPaused){
    //         console.log("pause")
    //         window.speechSynthesis.resume();
    //         setIsPaused(false);
    //     }else{
    //         console.log("resume")
    //         window.speechSynthesis.pause();
    //         setIsPaused(true);
    //     }
    if (!window.speechSynthesis.speaking) return; // Ensure speech is running

  if (window.speechSynthesis.paused) {
    console.log("Resuming speech...");
    window.speechSynthesis.resume();
    // setIsPaused(true);
    // setIsPlaying(true);
  } else {
    console.log("Pausing speech...");
    window.speechSynthesis.pause();
    // setIsPaused(false);
    // setIsPlaying(false);
  }



  };