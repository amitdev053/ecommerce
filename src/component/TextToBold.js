import React, { useEffect, useState } from "react";
import "./TextToBold.css";
import Alert from "./Alert";
// import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import {CustomFontSelector} from "./SelectBox";

// var maps
const styleLabels = {
  boldSerif: "Bold (Serif)",
  boldSans: "Bold (Sans)",
  italic: "Italic",
  boldItalic: "Bold Italic",
  script: "Script",
  fraktur: "Fraktur",
  doubleStruck: "Double Struck",
  monospace: "Monospace",
};

// const TextToBold = () => {
//   const [maps, setMaps] = useState();
//     useEffect(() => {
//     let mapWords = {
//       boldSerif: mapFromOffsets(0x1d400, 0x1d41a),
//       boldSans: mapFromOffsets(0x1d5d4, 0x1d5ee),
//       italic: mapFromOffsets(0x1d434, 0x1d44e),
//       boldItalic: mapFromOffsets(0x1d468, 0x1d482),
//       script: mapFromOffsets(0x1d49c, 0x1d4b6),
//       fraktur: mapFromOffsets(0x1d504, 0x1d51e),
//       doubleStruck: mapFromOffsets(0x1d538, 0x1d552),
//       monospace: mapFromOffsets(0x1d670, 0x1d68a),
//     };
//     setMaps(mapWords);
//   }, []);

  
//   const [inputText, setInputText] = useState("");
//   const [outputText, setOutputText] = useState("");
//   // const [selectedStyle, setSelectedStyle] = useState("boldSerif");
//   const [selectedStyle, setSelectedStyle] = useState(null);

//   function mapFromOffsets(upperOffset, lowerOffset) {
//     const map = {};
//     const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
//     for (let i = 0; i < 26; i++) {
//       map[chars[i]] = String.fromCodePoint(upperOffset + i);
//       map[chars[i + 26]] = String.fromCodePoint(lowerOffset + i);
//     }
//     return map;
//   }
//   function generateBoldText() {
//     const text = document.getElementById("inputText").value;
//     const style = document.getElementById("styleSelect").value;
//     const map = maps[style];
//     const output = inputText
//       .split("")
//       .map((c) => map[c] || c)
//       .join("");
//     setOutputText(output);

//     // if (Object.keys(maps).length === 0) return;

//     // const results = Object.keys(maps).map((styleKey) => {
//     //   const label = styleLabels[styleKey];
//     //   const map = maps[styleKey];
//     //   const styledText = inputText.split('').map((c) => map[c] || c).join('');
//     //   return `${label}: \n${styledText}`;
//     // });
//     // setOutputText(results.join('\n \n'));
//   }
//   useEffect(() => {
//     let output = document.getElementById("output");
//     if (inputText.split("").length > 0) {
//       output.classList.add("bold_output");
//     } else {
//       output.classList.remove("bold_output");
//     }
//     generateBoldText();
//   }, [inputText, maps]);

//   function copyOutput() {
//     const text = document.getElementById("output").textContent;
//     navigator.clipboard.writeText(text).then(() => {
//       // alert('Copied!')
//       toast.success("Text copied to clipboard!");
//     });
//   }

//   return (
//     <>
//       <div className="container app_container text_to_bold_container ">
//         <div className="tool_header">
//           <div className="app_tool_heading tool_inside_header">
//             Bold Text Generator
//           </div>

//           {/* <select
//             id="styleSelect"
//             className="select_font_family tool_inside_header"
//             value={selectedStyle}
//             onChange={(e) => { setSelectedStyle(e.target.value); generateBoldText(); }}
//           >
//             <option value="boldSerif">Bold (Serif)</option>
//             <option value="boldSans">Bold (Sans)</option>
//             <option value="italic">Italic</option>
//             <option value="boldItalic">Bold Italic</option>
//             <option value="script">Script</option>
//             <option value="fraktur">Fraktur</option>
//             <option value="doubleStruck">Double Struck</option>
//             <option value="monospace">Monospace</option>
//           </select> */}
//           <CustomFontSelector selected={selectedStyle} onSelect={setSelectedStyle} />
//         </div>
//         <div className="col_textTobold_output">
//           <div className="input_div">
//             <textarea
//               type="text"
//               className="user_textarea_input"
//               id="inputText"
//               placeholder="Enter text that you want to bold..."
//               value={inputText}
//               onChange={(e) => setInputText(e.target.value)}
//             />
//             {/* <button onClick={generateBoldText} style={{display:"none"}}>Generate</button> */}
//           </div>

//           <div className="bold_text_ouput input_div position-relative">
//             {inputText.split("").length > 0 && (
//               <i
//                 class="fa-solid fa-copy copy_bold_texticon"
//                 onClick={copyOutput}
//               ></i>
//             )}

//             <textarea
//               id="output"
//               className="user_textarea_input "
//               readonly="readonly"
//               placeholder="Bold text wil be appear here..."
//               value={outputText}
//             />
//             {/* <button onClick={copyOutput} style={{display:"none"}}>Copy Text</button> */}
//           </div>
//         </div>
//       </div>
//       <Alert position="bottom-center"> </Alert>
//     </>
//   );
// };

const TextToBold = () => {
  const [maps, setMaps] = useState({});
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");
  const [selectedStyle, setSelectedStyle] = useState(null);

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

  return (
    <>
      <div className="container app_container text_to_bold_container">
        <div className="tool_header">
          <div className="app_tool_heading tool_inside_header">
            Bold Text Generator
          </div>
          {selectedStyle && (
            <CustomFontSelector
              selected={selectedStyle}
              onSelect={setSelectedStyle}
            />
          )}
            
        </div>

        <div className="col_textTobold_output">
          <div className="input_div">
            <textarea
              className="user_textarea_input"
              id="inputText"
              placeholder="Enter text that you want to bold..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
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
