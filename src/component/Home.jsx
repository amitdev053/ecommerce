import React, { useEffect } from 'react'
// import About from './About'
import Alert from './Alert'
import { useState } from 'react'
import { Message } from 'primereact/message';
import Spinner from './Spinner';


export default function Home() {
// Use Effect Hooks--------------------------------
const[showbloglimit, setbloglimit]= useState(4)
const[current_page, setcurrentpage]= useState(1)
// const[alert, setalert] = useState(null)

// Show Alert -------------------------------------------------------
// const showalert= (message, type)=>{
//   setalert({
//     msg:message,
//     type: type 
//   })
// }

// Useeffect Hook -------------------------------------------------------

function getBlog(){
  let blogdata = { 
    "override_website_id": "MAGELLAN",
    "rows":showbloglimit,  
    "populate": "photos",
   "asset_type": "BLOG",
   "page": current_page   
  }
  console.log(blogdata)

  let getBlogurl= "https://backend.babusiya.com/website_assets/list_web_assets"

  fetch(getBlogurl, {
    method:"Post",
    Header: {
      'method': "POST",
      'accept': 'application/json',
      'Content-type': 'application/json',
    },
    body: JSON.stringify(blogdata)
  }).then(function(result){
    return result.json()
  }).then(function(response){
    console.log(response)
  })
}




useEffect(()=>{
  getBlog()

})
// Use Effect Hooks--------------------------------



// Component Return Block Starts Here--------------------------------

  return (
    <>
<div className="container mt-74" >
<Message text="Message Content" id="alertcontainer"  className='border-primary w-full justify-content-start myalert alert_container ' />

</div>
 {/* <Alert alert={alert}/> */}
 

  <div className="container d-flex mt-3 homecontainer" id="appendcontainer">
  
 
    
  
  
    
   </div>
  <div className="container d-flex justify-content-between">
    <div className="btn btn-primary btn-sm" id="prevbtn" >Previous</div>
    <div className="btn btn-primary btn-sm" id="nextbtn" >Next</div>
  
  </div>

    
    </>
  )
    
  // Component Return Block End Here--------------------------------
   
}
