import React, {useEffect, useState} from 'react'
import Products from './Products'
import ProductSlider from './ProductSlider'
import { useLocation, useParams, useNavigate} from 'react-router-dom'
import { changeProdiuctView } from './CustomHook'
import Explore from './Explore'
import AppPagesHeading from './AppPagesHeading'
import Blogs from './Blogs'



function ExploreLinkButton(props) {
  const usenavigate = useNavigate();

  function navigatePage() {
    usenavigate('/explore')
  }
  return (
    <div className='d-flex justify-content-center align-items-center my-4'>

    <span className="brand_button" style={{color: "white", width: "fit-content", padding: "10px 40px 14px 40px", cursor: "pointer", borderRadius: "10px", fontWeight: 600}}onClick={navigatePage}>{props.buttonText} <i class="fa-solid fa-angles-right icon_space"></i></span>
    </div>
  )
}


export default function Home() {
  const [SliderHeading, setSliderHeading] = useState("Choose Your Favourite");
  const location = useLocation();
  const [productView, setProductView] = useState("productView")
  const [url, setUrl]= useState(location.pathname)


  




  return (
    <>
    <div id={productView} className='container app_container mt-ps90'>
   

<Products componentFrom="home" />
<ExploreLinkButton  buttonText="Checkout More Products" />
<div className="app_divider"/>
<Explore componentFrom="home" />
<ExploreLinkButton buttonText="Explore Trending Images" />
<div className="app_divider"/>
<Blogs componentFrom="home" />
<ExploreLinkButton buttonText="Explore Latest Blogs" />

    </div>

    
    </>
  )
    
  // Component Return Block End Here--------------------------------
   
}
