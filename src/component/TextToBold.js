import React, { useEffect, useState } from "react";
import "./TextToBold.css";
import Alert from "./Alert";
import { ToastContainer, toast } from "react-toastify";
import {CustomFontSelector} from "./SelectBox";
import { Helmet } from "react-helmet";



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
  useEffect(() => {
  if (document.getElementById('inputText')) {
    document.getElementById('inputText').focus();
  }
}, []);

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
  <meta name="robots" content="index, follow" />
  <meta name="author" content="Browse Next" />


   <meta property="og:title" content="Bold Captions For Yours Social Media Posts" />
  <meta property="og:description" content="Generate bold text with ease using our Bold Text Generator. Copy and paste into Instagram, WhatsApp, or any social media instantly." />
  <meta property="og:type" content="website" />
  <meta property="og:url" content={`https://browsenext.today/tools`} />
  <meta property="og:image" content= "https://browsenext.today/favicons.png" />
 <meta name="robots" content="index, follow" />
  <meta name="author" content="Browse Next" />
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
