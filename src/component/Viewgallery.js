import React, { useEffect, useState } from 'react'
import { json, useParams } from 'react-router-dom';
import ImageGallery from 'react-image-gallery';


function Viewgallery() {
 const [image, setimage] = useState([])
 let [main_one, setmaingallery] = useState(" ")
  let { contentid } = useParams();


  


  
const getid = (contentid)=>{

  let contentIdPayLoad = JSON.stringify({
    "content_id": contentid, 
    "rows":10,
   "populate": "photos,videos",
   "page":1
  
 })
  let url = "https://backend.babusiya.com/website_assets/get_webasset_content"
  fetch(url, {
    method: "POST",
    Header: {
      'accept': 'application/json',
      'Content-type': 'application/json',
    },
    body: contentIdPayLoad
  }).then(function(response){
    return response.json()
  }).then(function(result){
    console.log(result.records)
 let galleryimagess =  result.records.title

   

   let galleryimages = JSON.parse(galleryimagess)
   console.log("Outside form loop",galleryimages.original_image_url)

   Object.values(galleryimages).forEach((element)=>{
    
   // console.log("Inside the loop ",element)
   // console.log("Inside the loop",element)
let images = element


main_one = element

setmaingallery(images)

  
  setimage(element)

console.log(typeof image)


   })
  
    
  })


}

const maincontent = [
  {
    original: image,
    thumbnail: image,
  }
];




useEffect(() => {
  getid(contentid)
  }, []);

  return (
    <>
    <div className='container mt-74'>
    <h1 class="text-center aboutheading">View Gallery Images</h1>
    <ImageGallery items={maincontent} />
    </div>

      
    </>
  )
}

export default Viewgallery
