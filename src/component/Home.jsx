import React, {useEffect, useState} from 'react'
import Products from './Products'
import FeatureContext from './FeatureContext'
import ProductSlider from './ProductSlider'
import { useLocation, useParams, useNavigate} from 'react-router-dom'
import { changeProdiuctView } from './CustomHook'
import Explore from './Explore'
import AppPagesHeading from './AppPagesHeading'
import Blogs from './Blogs'
import { Helmet } from 'react-helmet'


let topic = "Home"
let title = `Explore Home | Market Shops`;
const description = `Explore market-shop.vercel.app for a diverse selection of products. You can get any tech blogs with there images and videos,  Stay updated with our engaging blog content.`;
// const keywords = '';


export default function Home() {
  const [SliderHeading, setSliderHeading] = useState("Choose Your Favourite");
  const location = useLocation();
  const [productView, setProductView] = useState("productView")
  const [url, setUrl]= useState(location.pathname)

  useEffect(()=>{
    // topic= "Home"
    document.title = "Home | Market-Shops"
  })

  return (
    <>
 
    <div id={productView} className='container app_container mt-ps90'>
   
<FeatureContext />
<Products componentFrom="home" />
<ExploreLinkButton  buttonText="Checkout More Products" buttonType="product" />
<div className="app_divider"/>
<Explore componentFrom="home" />
<ExploreLinkButton buttonText="Explore Trending Images" buttonType="explore" />
<div className="app_divider"/>
<Blogs componentFrom="home" />
<ExploreLinkButton buttonText="Explore Latest Blogs " buttonType="blog" />

    </div>

    
    </>
  )
    
  // Component Return Block End Here--------------------------------
   
}



function ExploreLinkButton(props) {
  const usenavigate = useNavigate();

  function navigatePage() {
    if(props.buttonType === "blog"){
      usenavigate('/blogs')
    }else if(props.buttonType === "product"){
      usenavigate('/products')
    }else{
      usenavigate('/explore')
    }
  }

  return (
    <div className='d-flex justify-content-center align-items-center my-4'>

    <span className="brand_button" style={{color: "white", width: "fit-content", padding: "10px 40px 14px 40px", cursor: "pointer", borderRadius: "10px", fontWeight: 600}}onClick={navigatePage}>{props.buttonText} <i class="fa-solid fa-angles-right icon_space"></i></span>
    </div>
  )
}