import React, { createContext, useState, useEffect, useRef } from "react";
import { useSpeechSynthesis } from "react-speech-kit";
// Create context
export const BlogAudioContext = createContext();

export function BlogAudioProvider({ children }) {
  const { speak, cancel, speaking, voices, utterance } = useSpeechSynthesis();
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentBlog, setCurrentBlog] = useState(null);
  const utteranceRef = useRef(utterance);
  const [isPaused, setIsPaused] = useState(false);
  const[blogTexts, setBlogTexts] = useState("")

  // Function to play blog
//   const playBlog = (blogTitle, blogText) => {
//     if (utteranceRef.current) {
//       window.speechSynthesis.cancel(); // Stop any existing speech
      
//     }
//     setBlogTexts(blogText)
//     utteranceRef.current = new SpeechSynthesisUtterance(blogText.innerText);
//     // utteranceRef.current.voice = window.speechSynthesis.getVoices().find((v) => v.lang === "en-US") || window.speechSynthesis.getVoices()[6];
//     utteranceRef.current.voice = window.speechSynthesis.getVoices()[3];
//     let voices = window.speechSynthesis.getVoices();
//     console.log("vocies", voices, utteranceRef.current.voice)
//     if (!voices.length) {
//     window.speechSynthesis.onvoiceschanged = () => playBlog(blogTitle, blogText);
//     return;
//   }
 
//     window.speechSynthesis.speak(utteranceRef.current);
    
//     setCurrentBlog({ title: blogTitle, text: blogText.innerText });
//     setIsPlaying(true);
//     setIsPaused(true)
//     highlightWords(utteranceRef.current, blogText)
//     document.body.addEventListener(
//     "click",
//     () => {
//       if (!isPlaying) {
//         setTimeout(() => {
//           window.speechSynthesis.speak(utteranceRef.current);
//         }, 0);
//       }
//     },
//     { once: true }
//   );
//     utteranceRef.current.onend = () => {
//       setIsPlaying(false);
//       setCurrentBlog(null);
//     };
//   };
const playBlog = (blogTitle, blogText) => {
  if (utteranceRef.current) {
    window.speechSynthesis.cancel(); // Stop any existing speech
  }

  setBlogTexts(blogText);

  // ✅ Create new SpeechSynthesisUtterance instance manually
  utteranceRef.current = new SpeechSynthesisUtterance(blogText.innerText);
  
  const voices = window.speechSynthesis.getVoices();
  utteranceRef.current.voice = voices.find((v) => v.lang === "en-US") || voices[3];

  if (!voices.length) {
    window.speechSynthesis.onvoiceschanged = () => playBlog(blogTitle, blogText);
    return;
  }

  // ✅ Fix: Ensure `onboundary` is set on a valid utterance instance
  highlightWords(utteranceRef.current, blogText);

  // ✅ Speak using native API
  window.speechSynthesis.speak(utteranceRef.current);

  setCurrentBlog({ title: blogTitle, text: blogText.innerText });
  setIsPlaying(true);
  setIsPaused(true);

  utteranceRef.current.onend = () => {
    setIsPlaying(false);
    setCurrentBlog(null);
  };
};
function highlightWords(utterance, textElement) {
  if (!utterance) {
    console.error("Error: utterance is undefined");
    return;
  }

  const originalHTML = textElement.innerHTML;

  function wrapTextNodes(node) {
    if (node.nodeType === Node.TEXT_NODE && node.textContent.trim() !== "") {
      const words = node.textContent.match(/\S+/g) || [];
      const fragment = document.createDocumentFragment();

      words.forEach((word) => {
        let span = document.createElement("span");
        span.className = "highlightable-word";
        span.textContent = word + " ";
        fragment.appendChild(span);
      });

      node.replaceWith(fragment);
    } else if (node.nodeType === Node.ELEMENT_NODE && !node.matches("code, pre, .highlight")) {
      Array.from(node.childNodes).forEach(wrapTextNodes);
    }
  }

  wrapTextNodes(textElement);

  const wordSpans = textElement.querySelectorAll(".highlightable-word");
  let currentWordIndex = 0;

  function highlightReadWords(index) {
    wordSpans.forEach((span, i) => {
      span.style.backgroundColor = i <= index ? "yellow" : "";
    });
  }

  let wordStartIndexes = [];
  let currentCharCount = 0;

  wordSpans.forEach((span) => {
    wordStartIndexes.push(currentCharCount);
    currentCharCount += span.textContent.length;
  });

  // ✅ Ensure `onboundary` is assigned only if `utterance` is valid
  if (utterance) {
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

    utterance.onend = () => {
      setTimeout(() => {
        textElement.innerHTML = originalHTML;
      }, 500);
    };
  }
}


//   function highlightWords(utterance, textElement) {
//     // Save the original HTML to restore later
//     const originalHTML = textElement.innerHTML;
  
//     // Function to wrap text words in spans (excluding code blocks)
//     function wrapTextNodes(node) {
//       if (node.nodeType === Node.TEXT_NODE && node.textContent.trim() !== "") {
//         const words = node.textContent.match(/\S+/g) || []; // Match words only
//         const fragment = document.createDocumentFragment();
  
//         words.forEach((word, index) => {
//           let span = document.createElement("span");
//           span.className = "highlightable-word";
//           span.textContent = word + " "; // Preserve spaces
//           fragment.appendChild(span);
//         });
  
//         node.replaceWith(fragment);
//       } else if (node.nodeType === Node.ELEMENT_NODE && !node.matches("code, pre, .highlight")) {
//         Array.from(node.childNodes).forEach(wrapTextNodes);
//       }
//     }
  
//     // Apply span wrapping to text content
//     wrapTextNodes(textElement);
  
//     // Get all wrapped words
//     console.log("wordspans", textElement)
//     const wordSpans = textElement.querySelectorAll(".highlightable-word");
//     let currentWordIndex = 0;
    
 
//     function highlightReadWords(index) {
//       wordSpans.forEach((span, i) => {
//         span.style.backgroundColor = i <= index ? "yellow" : "";
//       });
//     }
  
//     // Track when each word starts
//     let wordStartIndexes = [];
//     let currentCharCount = 0;
  
//     wordSpans.forEach((span, index) => {
//       wordStartIndexes.push(currentCharCount);
//       currentCharCount += span.textContent.length;
//     });
  
//     // Synchronize highlighting with speech
//     utterance.onboundary = (event) => {
//       let charIndex = event.charIndex;
//       for (let i = 0; i < wordStartIndexes.length; i++) {
//         if (charIndex < wordStartIndexes[i]) {
//           currentWordIndex = Math.max(0, i - 1);
//           break;
//         } else {
//           currentWordIndex = i;
//         }
//       }
//       highlightReadWords(currentWordIndex);
//     };
  
//     // Restore original content after reading ends
//     utterance.onend = () => {
//       setTimeout(() => {
//         textElement.innerHTML = originalHTML;
//       }, 500);
//     };

    
//   }

const removeWordsHighlightColors = ()=>{
    const wordSpans = blogTexts;
    console.log("removeWordsHeight", wordSpans)
    if(blogTexts !== "" && wordSpans){
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