import logo from './logo.svg';
import './App.css';
import 'primeflex/primeflex.css';
import Home from './component/Home'
import About from './component/About'
import Nav from './component/Nav'
import Contact from './component/Contact'
import Media from './component/Media'
import Download from './component/Download';
import Viewgallery from './component/Viewgallery';
import Login from './component/Login';
import Products from './component/Products';

import Footer from './component/Footer'
import {Routes, Route, useLocation, useParams} from 'react-router-dom'
import React, { useState, useEffect } from 'react';




function App() {
  const location = useLocation();

  useEffect(() => {
   let locate = location.pathname

  console.log(locate)
    // Send request to your server to increment page view count
  }, [location]);
  return (
    <>
  <Nav />
 
 <Routes>
  <Route path ='/' Component={Products}/>
  <Route exact path ='/Hastags' Component={About}/>
  <Route exact path ='/contact' Component={Contact}/>
  <Route exact path ='/services' Component={Home}/>
  <Route exact path ='/media' Component={Media}/>
  <Route exact path ='/products' Component={Products}/>
  <Route exact path ='/download' Component={Download}/>
  <Route exact path ='/Login' Component={Login}/>
  <Route exact path ='/viewgallery/:contentid' Component={Viewgallery}/>
 </Routes>

 <Footer />
    </>
  );
}

export default App;
