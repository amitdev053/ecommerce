import React, { useState } from "react";
import "./Tools.css"
const Tooltip = ({ children, text, position = "top" ,  defaultVisible = false }) => {
  const [visible, setVisible] = useState(defaultVisible);
  const styles = {
    toolStyle:{
        borderRadius: "5px",
        padding: "6px 10px",
        fontFamily: "Roboto",
        backgroundColor: "#17181a",
        left: "60%",
        transform: "translate(-50%, -0%)",
        fontSize: "12px",
        fontWeight: "300",
        width: "max-content",
        letterSpacing: "1px",
        zIndex: "999999",
       
    },
   
     
 
  }

  return (
    <div
      className="relative inline-block"
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
      onTouchStart={() => setVisible(true)}
      onTouchEnd={() => setVisible(false)}
    >
      {children}

      {visible && (
        <div
          className={`absolute z-50 text-white  rounded-md shadow-md whitespace-nowrap transition-opacity duration-200 
          ${position === "top" ? "bottom-full mb-2 left-1/2 -translate-x-1/2 tooltip-top" : ""}
          ${position === "bottom" ? "top-full mt-2" : ""}
          ${position === "left" ? "right-full mr-2 top-1/2 -translate-y-1/2" : ""}
          ${position === "right" ? "left-full ml-2 top-1/2 -translate-y-1/2" : ""}`}
          style={{...styles.toolStyle}}
        >
          {text}
        </div>
      )}
    </div>
  );
};

export default Tooltip;
