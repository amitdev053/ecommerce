import React from 'react'

const AppPagesHeading = (props) => {
  return (
   
    <h1 className="container text_left"
      style={{
        fontSize: "25px",
        fontWeight: "700",
        margin: "0px",
        padding: "0px",
        whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    maxWidth: "238px"
       
      }}
    >
      {props.heading}
      
    </h1>
  
  )
}

export default AppPagesHeading