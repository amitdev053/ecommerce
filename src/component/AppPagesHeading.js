import React from 'react'

const AppPagesHeading = (props) => {
  return (
   
    <h1 className="container"
      style={{
        fontSize: "25px",
        fontWeight: "700",
        margin: "0px",
       
      }}
    >
      {props.heading}
    </h1>
  
  )
}

export default AppPagesHeading