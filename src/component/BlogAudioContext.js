import React, { createContext, useState, useEffect, useRef } from "react";

// Create context
export const BlogAudioContext = createContext();

export function BlogAudioProvider({ children }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentBlog, setCurrentBlog] = useState(null);
  const utteranceRef = useRef(null);
  const [isPaused, setIsPaused] = useState(false);
  const[blogTexts, setBlogTexts] = useState("")


const playBlog = (blogTitle, blogText) => {
    let highlightInterval = null;
  if (!window.responsiveVoice) {
    console.error("❌ ResponsiveVoice is not loaded.");
    return;
  }

  setBlogTexts(blogText); // Store blog text

  // Wrap text in spans for highlighting
  wrapTextInSpans(blogText);

  // Get all words wrapped in spans
  const wordSpans = blogText.querySelectorAll(".highlightable-word");
  if (!wordSpans.length) return;

    
  const totalWords = wordSpans.length;
  const speechRate = 150; // Words per minute (ResponsiveVoice default is ~150 wpm)
  const estimatedDuration = (totalWords / speechRate) * 60 * 1000; // in milliseconds
  const wordDuration = estimatedDuration / totalWords; // Approximate duration per word

  let currentWordIndex = 0;

  

// Function to highlight words
function highlightNextWord() {
  if (currentWordIndex < wordSpans.length) {
    wordSpans[currentWordIndex].style.backgroundColor = "yellow";
    currentWordIndex++;
  } else {
    clearInterval(highlightInterval); // Stop highlighting when done
  }
}
  // Start ResponsiveVoice speech
  window.responsiveVoice.speak(blogText.innerText, "US English Female", {
    rate: 1,
    onstart: () => {
      currentWordIndex = 0;
      highlightInterval = setInterval(highlightNextWord, wordDuration);
    },
    onresume: ()=>{
        console.log("resume event")
    },
    onend: () => {
      clearInterval(highlightInterval);
      removeWordHighlights(blogText);
    },
  });

  setCurrentBlog({ title: blogTitle, text: blogText.innerText });
  setIsPlaying(true);
  setIsPaused(true);

};



function wrapTextInSpans(node) {
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
        Array.from(node.childNodes).forEach(wrapTextInSpans);
      }
}


function removeWordHighlights(textElement) {
  const wordSpans = textElement.querySelectorAll(".highlightable-word");
  wordSpans.forEach((span) => span.style.backgroundColor = "");
}
// Function to stop playback
const stopBlog = () => {
if (utteranceRef.current) {
    window.speechSynthesis.cancel();
}
setIsPlaying(false);
setCurrentBlog(null);  
removeWordHighlights(blogTexts)
};


const togglePlayPause = () => {
  console.log("inside else", window.responsiveVoice);

  if (!window.responsiveVoice.isPlaying()) return; // Ensure speech is running

  if (isPaused) {
    console.log("Resuming speech...");
    window.responsiveVoice.resume();
    setIsPaused(false);
    setIsPlaying(true);
  } else {
    console.log("Pausing speech...");
    window.responsiveVoice.pause();
    setIsPaused(true);
  }
};
  return (
    <BlogAudioContext.Provider value={{ isPlaying, currentBlog, isPaused, setIsPaused ,playBlog, stopBlog, togglePlayPause }}>
      {children}
    </BlogAudioContext.Provider>
  );
}
