import logo from './logo.svg';
import './App.css';
import 'primeflex/primeflex.css';
import Home from './component/Home'
import Nav from './component/Nav'
import Contact from './component/Contact'
import Media from './component/Media'
import Blogs from './component/Blogs'
import Download from './component/Download';
import Viewgallery from './component/Viewgallery';
import BlogDetail from './component/BlogDetail';
import Login from './component/Login';
import Products from './component/Products';
import Coursel from './component/Counsel'
import { Analytics } from "@vercel/analytics/react"
import Footer from './component/Footer'
import {Routes, Route, useLocation, useParams} from 'react-router-dom'
import React, { useState, useEffect } from 'react';
import Hashtag from './component/Hashtag';




function App() {
  const location = useLocation();

  useEffect(() => {
   let locate = location.pathname

  console.log(locate)
  if(locate === "/blogs" || locate === "/blogs/search"){
    
    const loaderElement = document.querySelector('.loader');
    if (loaderElement) {

     loaderElement.classList.add('margin_top_setzero')
    }
  }
    // Send request to your server to increment page view count
  }, [location]);
  return (
    <>
  <Nav trackCart={false} />
 
 <Routes>
 
  <Route path ='/' Component={Home}/>
  <Route exact path ='/Hastags' Component={Hashtag}/>
  <Route exact path ='/contact' Component={Contact}/>
  <Route exact path ='/services' Component={Home}/>
  <Route exact path ='/media' Component={Media}/>
  <Route exact path ='/blogs' Component={Blogs} />
  <Route path ='/blogs/search' Component={Blogs} />
  <Route exact path ='/products' Component={Products}/>
  <Route exact path ='/productcoursel' Component={Coursel}/>
  <Route exact path ='/download' Component={Download}/>
  <Route exact path ='/Login' Component={Login}/>
  <Route exact path ='/blog-detail/:blogId/:blogTitle' Component={BlogDetail}/>
 </Routes>

 <Footer />
 <Analytics/>
    </>
  );
}

export default App;
