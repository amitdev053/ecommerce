import React from 'react'

const Download = () => {

    const fileInput = document.querySelector("link"),
    downloadBtn = document.querySelector("button");
    
    downloadBtn?.addEventListener("click", e => {
   
        downloadBtn.innerText = "Downloading file...";
        fetchFile(fileInput.value);
        e.preventDefault();
    });
    
    function fetchFile() {

  let url = document.getElementById('link').value
        // console.log(url)
        fetch(url).then(res => res.blob()).then(file => {
          let createurl = new URL
            let tempUrl = createurl.createObjectURL(file);
           // console.log(tempUrl)
        })
    }

  return (
  <>
<div className="container downloadcentercontainer mt-74">
<h1 className="text-center  mt-2 aboutheading">Download Center</h1>


  <div className="mb-3">
    <label htmlfor="exampleInputEmail1" className="form-label">Paste Link To Download</label>
    
    <input type="text" className="form-control" id="link" aria-describedby="emailHelp" />
  
    <div id="emailHelp" className="form-text">We'll never share download image and video.</div>
  </div>

  

 
  <div className="btnbox">
  <button type="submit" className="btn btn-primary" onClick={fetchFile}>Download</button>
  
  </div>

</div>
  
  </>
  )
}

export default Download
