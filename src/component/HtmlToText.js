import React, {useState, useEffect} from 'react';
import "./HtmlToText.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";

const HtmlToText = () => {
      const [inputHTML, setInputHTML] = useState("");
      const [outputHTML, setOutputHTML] = useState("");

        // Configure marked once
  useEffect(() => {
    window.marked.setOptions({
      breaks: true, // support line breaks
      gfm: true, // GitHub flavored markdown
      langPrefix: 'language-', // prefix for code classes (for highlight.js if needed)
      headerIds: false, // avoid auto id generation
      mangle: false, // prevent email mangling
      highlight: function (code, lang) {
        // Optional — If you use highlight.js later
        // return hljs.highlightAuto(code).value;
        return code; // for now just return raw code
      },
    });
  }, []);

      function convertMarkdown(markdownText) {
        try {
          const htmlOutput = window.marked.parse(markdownText); // using marked lib
          return htmlOutput;
        } catch (err) {
          console.error('Markdown parse error:', err);
          return '';
        }
      }

useEffect(() => {
    // let output = document.getElementById("output");
    // if (inputText.split("").length > 0) {
    //   output.classList.add("bold_output");
    // } else {
    //   output.classList.remove("bold_output");
    // }
    const converted = convertMarkdown(inputHTML);
    setOutputHTML(converted);
  }, [inputHTML]);

//    function copyOutputHTMl() {
//       const text = document.getElementById("outputHTML").innerText;
//       navigator.clipboard.writeText(text).then(() => {
//         // alert('Copied!')
//         toast.success("Text copied to clipboard!");
//       });
//     }

  return (
<>
<div className="container app_container text_to_html_container">
          <div className="app_tool_heading tool_inside_header tool_center_heading text-center">
            Format Long Content
          </div>
        <div className="tool_header_hmtl" style={{display: "none"}}>

          <select
            id="styleSelect"
            className="select_font_family tool_inside_header"
            
          >
            <option value="boldSerif">Bold (Serif)</option>
            <option value="boldSans">Bold (Sans)</option>
            <option value="italic">Italic</option>
            <option value="boldItalic">Bold Italic</option>
            <option value="script">Script</option>
            <option value="fraktur">Fraktur</option>
            <option value="doubleStruck">Double Struck</option>
            <option value="monospace">Monospace</option>
          </select>
        </div>
        <div className="col_textTobold_output">
          <div className="input_div">
            <textarea
              type="text"
              className="user_textarea_input output_html"
              id="inputText"
              placeholder="Enter text that you want to format and you can also use html tags here to format the content..."
              value={inputHTML}
              onChange={(e) => setInputHTML(e.target.value)}
            />
            {/* <button onClick={generateBoldText} style={{display:"none"}}>Generate</button> */}
          </div>

          <div className="bold_text_ouput input_div position-relative">
            {/* {inputHTML.split("").length > 0 && (
              <i
                class="fa-solid fa-copy copy_bold_texticon"
                onClick={copyOutputHTMl}
              ></i>
            )} */}

            <div
              id="outputHTML"
              className="user_textarea_input output_html "
              readonly="readonly"
            //   placeholder="Bold text wil be appear here..."
            //   value={outputText}
              dangerouslySetInnerHTML={{ __html: outputHTML }}
            />
            {/* <button onClick={copyOutput} style={{display:"none"}}>Copy Text</button> */}
          </div>
        </div>
      </div>
</>

  )
}

export default HtmlToText