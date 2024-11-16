import React from 'react'

const Loader = (props) => {
  return (
    <div>
      <div className={`loader ${props.setPropClass}`} ></div>
    </div>
  )
}

export default Loader
