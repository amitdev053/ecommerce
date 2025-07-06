import React, { useEffect, useState } from "react";
import { FaBold, FaItalic, FaFont, FaCode, FaFeatherAlt } from "react-icons/fa";
import { GiSpikedDragonHead, GiPerspectiveDiceSixFacesRandom } from "react-icons/gi";
// import { GiFractalCrystal } from "react-icons/gi";

import "./SelectBox.css";

const styleList = [
  { label: "Bold (Serif)", value: "boldSerif", icon: <FaBold /> },
  { label: "Bold (Sans)", value: "boldSans", icon: <FaFont /> },
  { label: "Italic", value: "italic", icon: <FaItalic /> },
  { label: "Bold Italic", value: "boldItalic", icon: <FaItalic /> },
  { label: "Script", value: "script", icon: <FaFeatherAlt /> },
  { label: "Fraktur", value: "fraktur", icon: <GiSpikedDragonHead /> },
  { label: "Double Struck", value: "doubleStruck", icon: <GiPerspectiveDiceSixFacesRandom /> },
  { label: "Monospace", value: "monospace", icon: <FaCode /> },
];

const CustomFontSelector = ({ selected, onSelect }) => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if(document.querySelector('.active-f')) {
        document.querySelector('.selected_correct_icon')?.remove()
      document.querySelector('.active-f').innerHTML += `<i class="fa-solid fa-check selected_correct_icon"></i>`;
    }
  })
  return (
    <div className="custom-select-box">
      {/* <div className="selected-option" onClick={() => setOpen(!open)}>
        <span className="icon">{selected.icon|| styleList[0].icon}</span>
        <span>{selected.label}</span>
        <span className="arrow">{open ? <i class="fa-solid fa-angle-up"></i> : <i class="fa-solid fa-angle-down"></i> }</span>
      </div>
      {open && (
        <div className="dropdown-list">
          {styleList.map((style, idx) => (
            <div
              key={idx}
              className={`dropdown-option ${
                style.value === selected.value ? "active-f" : ""
              }`}
              onClick={() => {
                onSelect(style);
                setOpen(false);
              }}
            >
              <span className="icon">{style.icon}</span>
              <span class="text">{style.label}</span>
            </div>
          ))}
        </div>
      )} */}

    <p className="apply-fonts-title">Apply Fonts</p>

      <div className="font_family_set_container">
        {styleList.map((style, idx) => (
          <span
            key={idx}
            className={`ff_family position-relative ${selected?.value === style.value ? "active-f" : ""}`}
             onClick={() => onSelect(style)}
      role="button"
      tabIndex={0}
      aria-label={`Apply ${style.label} font style`}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          onSelect(style);
        }
      }}
          >
            <span className="ff_icon">{style.icon}</span>
            <span className="family_text">{style.label.split(" ")[0]}</span>
          </span>
        ))}
      </div>
    </div>
  );
};

export  {CustomFontSelector};