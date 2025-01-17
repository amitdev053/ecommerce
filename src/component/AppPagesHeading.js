import React from 'react'

const AppPagesHeading = (props) => {
  return (
   
    <div className="container"
      style={{
        fontSize: "25px",
        fontWeight: "700"
       
      }}
    >
      {props.heading}
    </div>
  
  )
}

export default AppPagesHeading