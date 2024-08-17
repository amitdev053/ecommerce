import React, {useEffect, useState} from 'react'
import Products from './Products'
import ProductSlider from './ProductSlider'
import { useLocation, useParams} from 'react-router-dom'
import { changeProdiuctView } from './CustomHook'





export default function Home() {
  const [SliderHeading, setSliderHeading] = useState("Choose Your Favourite");
  const location = useLocation();
  const [productView, setProductView] = useState("productView")
  const [url, setUrl]= useState(location.pathname)

  




  return (
    <>
    <div id={productView}>


<Products />
    </div>


    
    </>
  )
    
  // Component Return Block End Here--------------------------------
   
}
