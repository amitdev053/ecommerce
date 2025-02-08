import React from 'react'

const AppPagesHeading = (props) => {
  return (
   
    <div className="container"
      style={{
        fontSize: "25px",
        fontWeight: "700",
        margin: "0px",
       
      }}
    >
      {props.heading}
    </div>
  
  )
}

export default AppPagesHeading