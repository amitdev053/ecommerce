import React, {useState, useEffect} from 'react'
import { Link, useLocation } from "react-router-dom";
import {getSiteProducts} from "./CustomHook"


export default function footer() {
  const baseUrl = "https://fakestoreapi.com"; 
  
  const productsUrl = "/products";
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [allproduct, setAllProduct] = useState([]);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [url, seturl] = useState("");
  // eslint-disable-next-line react-hooks/rules-of-hooks
    const locations = useLocation();
  // eslint-disable-next-line react-hooks/rules-of-hooks
   useEffect(() => {
     seturl(locations.pathname);
   }, [locations]);

  function getProducts(baseUrl, productsUrl) {
    const getProductsUrl = baseUrl + productsUrl;
    fetch(getProductsUrl)
      .then((response) => {        
        // console.log("response", response);
        return response.json();
      })
      .then((result) => {
        // // console.log("products product.js", result);
        // console.log("products product.js", result);
        setAllProduct(result);
      });
  }   
  function highlightedFotter(){
      let footerRowElement = document.querySelector(".footer_main_row").children
      if(footerRowElement){

        Array.from(footerRowElement).forEach((element)=>{
          // console.log("footerelement", element)
          element.setAttribute("footerHeader", "true")
          element.addEventListener('mouseover', (e)=>{
            let targetElement = e.target     
            if(!element.classList.contains('footer_main_row') && !targetElement.classList.contains('app_container') && element.getAttribute("footerHeader") === "true"){
              
              element.style.backgroundColor = "rgba(0, 0, 0, 0.05)"
              element.style.borderRadius = "5px"
              // element.style.color= "black"
              
            }       
          })
          element.addEventListener('mouseout', (e)=>{
            let targetElement = e.target            
            if( !element.classList.contains('footer_main_row')&& !targetElement.classList.contains('app_container') && element.getAttribute("footerHeader") === "true"){
              

              element.style.backgroundColor = ""
                 element.style.borderRadius = "none"
                  // element.style.color= ""
                 
            }
          })

        })
      }

  }
  
  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    getProducts(baseUrl, productsUrl);    
    highlightedFotter()
  }, []);
  

 
  


  return (
  <>
 <div className="container-fluid firstfooter footer_main_container">

<footer className="text-center text-lg-start bg-light text-muted">

  <section className="d-flex p-4 border-bottom footer_top_header_menu">
   
    {/* <div className="me-5 d-none d-lg-block">
      <span>Get connected with us on social networks:</span>
    </div>
 
    
      <a href="" className="me-4 text-reset">
        <i className="fab fa-facebook-f"></i>
      </a>
      <a href="" className="me-4 text-reset">
        <i className="fab fa-twitter"></i>
      </a>
      <a href="" className="me-4 text-reset">
        <i className="fab fa-google"></i>
      </a>
      <a href="" className="me-4 text-reset">
        <i className="fab fa-instagram"></i>
      </a>
      <a href="" className="me-4 text-reset">
        <i className="fab fa-linkedin"></i>
      </a>
      <a href="" className="me-4 text-reset">
        <i className="fab fa-github"></i>
      </a>
    </div> */}

<div className='footer_top_header_container'>
            <Link to="/about-us"  className={(url === "/about-us") ? `hovered_menu text-reset` : `text-reset`}>About</Link>
         
            <Link to="/contact" className={(url === "/contact") ? `hovered_menu text-reset` : `text-reset`}>Contact</Link>
      
            <Link to="/privacy" className={(url === "/privacy") ? `hovered_menu text-reset` : `text-reset`}>Privacy</Link>
       </div>           


  </section>

  <section className="">
    <div className="container text-center text-md-start mt-5 app_container">
     
      <div className="row mt-3 app_font footer_main_row">
      
        <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
    
          <h6 className="text-uppercase fw-bold mb-4">
          <i class="fa-solid fa-shop mx-2"></i>BrowseNext
          </h6>
          <p>
    Use bold text generators, explore tech blogs, download premium images & discover creative tools on Market-Shops. All free, all in one place.
          
          </p>
        </div>
    
        <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4 position-relative">
       
          <h6 className="text-uppercase fw-bold mb-4">
            Products
          </h6>
          
          {
            (allproduct.length > 0)?

            
            
            allproduct.splice(allproduct.length - 4, allproduct.length).map((product)=>{
              return(
                <p key={product.id}>
            <span className="text-reset">{product.title.slice(0, 10)}...</span>
          </p>
            

              )

          })
          :
          <div className="footer_loader" />
          
          
          }
         
         
        </div>
  
        <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">
      
          <h6 className="text-uppercase fw-bold mb-4">
            Useful links
          </h6>
          <p>
            <Link to="/products" target='_blank' className="text-reset">Store</Link>
          </p>
       
          <p>
            <Link to="/blogs" className="text-reset" target='_blank'>Blogs</Link>
          </p>
                   
          <p>
          <Link to="/explore" className="text-reset" target='_blank'>Explore</Link>
          </p>

           <p>
            <Link to="/services" className="text-reset">Services</Link>
          </p>
        </div>

        <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4 ">

          <h6 className="text-uppercase fw-bold mb-4">Contact With Us</h6>
     <div  className='fotter_new'>
     <p><i className="fa-solid fa-globe me-3"></i> <div>Visited On <br />BrowseNext</div> </p>
          {/* <p>
            <i className="fas fa-envelope me-3"></i>
            contact@vercel.app
          </p> */}
          <a className="text-reset" href='https://wa.me/+918826483821?text=Hyy, I want to take a service like web, app & software developments for that we are connecting now!' target='_blank'><i className="fa-brands fa-whatsapp me-3"></i> <div>Connected on  <br /> Whatsapp</div> </a>
          {/* <p><i className="fas fa-print me-3"></i> + 01 234 567 89</p> */}
     </div>
        </div>
       
      </div>

    </div>
  </section>
 


  <div className="text-center p-4 footerend" >
    © <span className='fw-bold'>2025</span> Copyright: 
     <Link className="text-reset fw-bold" to="http://browsenext.today/" target='_blank'> browsenext.today</Link>
  </div>

</footer>


 </div>
  </>
  )
}
