import logo from './logo.svg';
import './App.css';
import 'primeflex/primeflex.css';
import Home from './component/Home'
import Nav from './component/Nav'
import Contact from './component/Contact'
import Media from './component/Media'
import Blogs from './component/Blogs'
import Explore from './component/Explore'
import Download from './component/Download';
import Viewgallery from './component/Viewgallery';
import {BlogDetail, BlogBack} from './component/BlogDetail';
import Login from './component/Login';
import Products from './component/Products';
import Coursel from './component/Counsel'
import { Analytics } from "@vercel/analytics/react"
import Footer from './component/Footer'
import {Routes, Route, useLocation, useMatch} from 'react-router-dom'
import React, { useEffect } from 'react';
import Hashtag from './component/Hashtag';
import { CartProvider } from './component/CartContext';
import { BlogAudioProvider } from './component/BlogAudioContext';
import BlogAudioPlayer from "./component/BlogAudioPlayer";


function App() {
  const location = useLocation()
  const matchRoute  = useMatch("/blog-detail/:blogId/:blogTitle")
    


  // Function to set a cookie
  function setCookie(name, value, days) {
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    const expires = `expires=${date.toUTCString()}`;
    const cookie = `${name}=${value}; ${expires}; path=/`;
    document.cookie = cookie;
    
    
  }

  // Update the paths whenever the pathname changes
  useEffect(() => {

    
      setCookie('userCookie', location.pathname, 30); // Store the previous path in the cookie



  }, [location]);
  

  function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
  }
  
  const cookieValue = getCookie('userCookie');
  if (cookieValue) {
    
    // console.log('new', cookieValue);
    
  } else {
    // console.log('old user');
  }
  
  return (
    <>
  <BlogAudioProvider>
  <CartProvider>
  {/* {(matchRoute) ? <BlogBack /> :<Nav trackCart={false} />} */}
  
  <Nav trackCart={false} />
  
 
 <Routes>
 
  <Route path ='/' Component={Home}/>
  <Route exact path ='/Hastags' Component={Hashtag}/>
  <Route exact path ='/explore' Component={Explore}/>
  <Route exact path ='/contact' Component={Contact}/>
  <Route exact path ='/services' Component={Home}/>
  <Route exact path ='/media' Component={Media}/>
  <Route exact path ='/blogs' Component={Blogs} />
  <Route path ='/blogs/search' Component={Blogs} />
  <Route path ='/blogs/suggest' Component={Blogs} />
  <Route exact path ='/products' Component={Products}/>
  <Route exact path ='/productcoursel' Component={Coursel}/>
  <Route exact path ='/download' Component={Download}/>
  <Route exact path ='/Login' Component={Login}/>
  <Route exact path ='/blog-detail/:blogId/:blogTitle' Component={BlogDetail}/>
 </Routes>
 {/* {(!matchRoute) && <BlogAudioPlayer /> } */}
 <Footer />
 <Analytics/>
 </CartProvider>
 </BlogAudioProvider>

    </>
  );
}

export default App;
