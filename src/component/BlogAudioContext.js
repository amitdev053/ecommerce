import React, { createContext, useState, useEffect, useRef } from "react";

// Create context
export const BlogAudioContext = createContext();

export function BlogAudioProvider({ children }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentBlog, setCurrentBlog] = useState(null);
  const utteranceRef = useRef(null);
  const [isPaused, setIsPaused] = useState(false);

  // Function to play blog
  const playBlog = (blogTitle, blogText) => {
    if (utteranceRef.current) {
      window.speechSynthesis.cancel(); // Stop any existing speech
      
    }

    utteranceRef.current = new SpeechSynthesisUtterance(blogText.innerText);
    utteranceRef.current.voice = window.speechSynthesis
      .getVoices()
      .find((v) => v.lang === "en-US") || window.speechSynthesis.getVoices()[0];

    window.speechSynthesis.speak(utteranceRef.current);
    
    setCurrentBlog({ title: blogTitle, text: blogText.innerText });
    setIsPlaying(true);
    setIsPaused(true)
    highlightWords(utteranceRef.current, blogText)

    utteranceRef.current.onend = () => {
      setIsPlaying(false);
      setCurrentBlog(null);
    };
  };

  function highlightWords(utterance, textElement) {
    // Save the original HTML to restore later
    const originalHTML = textElement.innerHTML;
  
    // Function to wrap text words in spans (excluding code blocks)
    function wrapTextNodes(node) {
      if (node.nodeType === Node.TEXT_NODE && node.textContent.trim() !== "") {
        const words = node.textContent.match(/\S+/g) || []; // Match words only
        const fragment = document.createDocumentFragment();
  
        words.forEach((word, index) => {
          let span = document.createElement("span");
          span.className = "highlightable-word";
          span.textContent = word + " "; // Preserve spaces
          fragment.appendChild(span);
        });
  
        node.replaceWith(fragment);
      } else if (node.nodeType === Node.ELEMENT_NODE && !node.matches("code, pre, .highlight")) {
        Array.from(node.childNodes).forEach(wrapTextNodes);
      }
    }
  
    // Apply span wrapping to text content
    wrapTextNodes(textElement);
  
    // Get all wrapped words
    console.log("wordspans", textElement)
    const wordSpans = textElement.querySelectorAll(".highlightable-word");
    let currentWordIndex = 0;
    
 
    function highlightReadWords(index) {
      wordSpans.forEach((span, i) => {
        span.style.backgroundColor = i <= index ? "yellow" : "";
      });
    }
  
    // Track when each word starts
    let wordStartIndexes = [];
    let currentCharCount = 0;
  
    wordSpans.forEach((span, index) => {
      wordStartIndexes.push(currentCharCount);
      currentCharCount += span.textContent.length;
    });
  
    // Synchronize highlighting with speech
    utterance.onboundary = (event) => {
      let charIndex = event.charIndex;
      for (let i = 0; i < wordStartIndexes.length; i++) {
        if (charIndex < wordStartIndexes[i]) {
          currentWordIndex = Math.max(0, i - 1);
          break;
        } else {
          currentWordIndex = i;
        }
      }
      highlightReadWords(currentWordIndex);
    };
  
    // Restore original content after reading ends
    utterance.onend = () => {
      setTimeout(() => {
        textElement.innerHTML = originalHTML;
      }, 500);
    };

    
  }

const removeWordsHighlightColors = ()=>{
    const wordSpans = document.getElementById("textToSpeak").children;
    Array.from(wordSpans).forEach((highlightWords)=>{
        highlightWords = highlightWords.querySelectorAll(".highlightable-word")
        highlightWords.forEach((words)=>{
            if(words.hasAttribute('style')){            // words that are highlighted comes inside this condition
                // console.log("highlight words", words)                
                words.removeAttribute("style")
            }
        })
    })    
}
// Function to stop playback
const stopBlog = () => {
if (utteranceRef.current) {
    window.speechSynthesis.cancel();
}
setIsPlaying(false);
setCurrentBlog(null);  
removeWordsHighlightColors()
};

// Function to pause or resume playback
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
    setIsPaused(true);
    // setIsPlaying(true);
  } else {
    console.log("Pausing speech...");
    window.speechSynthesis.pause();
    setIsPaused(false);
    // setIsPlaying(false);
  }
   
    
   
  };
  return (
    <BlogAudioContext.Provider value={{ isPlaying, currentBlog, isPaused, setIsPaused ,playBlog, stopBlog, togglePlayPause }}>
      {children}
    </BlogAudioContext.Provider>
  );
}