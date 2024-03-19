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

  
  function hideSilder(){  
    document.getElementById('ProductSlider').classList.add('d-none')   // for hide the Product Slider  on Product Page
    let allProducts = document.getElementById('ProductContainer').children
    let productListView = document.getElementById('ProductListView')
    console.log("Home Page",allProducts)
    // Loop through all children starting from the 5th child (index 4)
for (let i = 4; i < allProducts.length; i++) {
  // Hide the child element
  allProducts[i].style.display = 'none';
  
}

if(productListView){
  for (let l = 4; l < productListView.children.length; l++) {
  // Hide the child element
  productListView[l].style.display = 'none';
  
} 
}
    
    let viewType = changeProdiuctView()
    console.log("viewType", viewType)
setProductView(viewType)
setUrl("/")

    

    

  }
useEffect(()=>{
setTimeout(()=>{
  hideSilder()
}, 1000)
}, [url, productView])



  return (
    <>
    <div id={productView}>


<Products />
    </div>


    
    </>
  )
    
  // Component Return Block End Here--------------------------------
   
}
