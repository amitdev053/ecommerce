import logo from "./logo.svg";
import "./App.css";
import "primeflex/primeflex.css";

import React, { useEffect, useContext, lazy, Suspense } from "react";
import { Routes, Route, useLocation, useMatch } from "react-router-dom";
import { Analytics } from "@vercel/analytics/react";

import Home from "./component/Home";
import Nav from "./component/Nav";
import Footer from "./component/Footer";
import Services from "./component/Services";
import Tools from "./component/Tools";
import About from "./component/About";
import Privancy from "./component/Privancy";
import Contact from "./component/Contact";

import { BlogDetail, BlogBack } from "./component/BlogDetail";
import { CartProvider } from "./component/CartContext";
import { BlogAudioProvider, BlogAudioContext } from "./component/BlogAudioContext";
import BlogAudioPlayer from "./component/BlogAudioPlayer";
import { getOrSetUserId } from "./analytics";

// Lazy-loaded heavy pages
const ExploreMasonry = lazy(() => import("./component/ExploreMasonry"));
const Blogs = lazy(() => import("./component/Blogs"));
const ExploreNext = lazy(() => import("./component/ExploreNext"));
const Products = lazy(() => import("./component/Products"));

function App() {
  const location = useLocation();
  const matchRoute = useMatch("/blog-detail/:blogId/:blogTitle");
  const exploreNext = useMatch("/explore-next/:type/:imageTag");
  const exploreRoute = useMatch("/explore");
  const context = useContext(BlogAudioContext);

  // GA4 user tracking
  useEffect(() => {
    const userId = getOrSetUserId();
    const interval = setInterval(() => {
      if (window.gtag) {
        window.gtag("config", "G-J0N01TQSXQ", { user_id: userId });
        const isOwner = userId.startsWith("uid-1758");
        window.gtag("event", "page_view", {
          page_path: location.pathname,
          is_owner: isOwner ? "yes" : "no",
        });
        clearInterval(interval);
      }
    }, 100);
  }, []);

  useEffect(() => {
    if (window.gtag) {
      const userId = getOrSetUserId();
      const isOwner = userId.startsWith("uid-1758");
      window.gtag("event", "page_view", {
        page_path: location.pathname,
        is_owner: isOwner ? "yes" : "no",
      });
    }
  }, [location]);

  // Set cookie for previous path
  useEffect(() => {
    const setCookie = (name, value, days) => {
      const date = new Date();
      date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
      document.cookie = `${name}=${value}; expires=${date.toUTCString()}; path=/`;
    };
    setCookie("userCookie", location.pathname, 30);

    document.body.style.overscrollBehavior = location.pathname === "/explore" ? "contain" : "";
  }, [location]);

  // Set --vh CSS variable
  useEffect(() => {
    const setVh = () => {
      document.documentElement.style.setProperty("--vh", `${window.innerHeight * 0.01}px`);
    };
    setVh();
    window.addEventListener("resize", setVh);
    return () => window.removeEventListener("resize", setVh);
  }, []);

  return (
    <BlogAudioProvider>
      <CartProvider>
        {/* Conditional Nav / BlogBack */}
        {matchRoute || exploreNext ? (
          <BlogBack componentFrom={exploreNext || matchRoute} />
        ) : (
          <Nav trackCart={false} />
        )}

        {/* Routes */}
        <Routes>
          <Route path="/sitemap.xml" element={null} />
          <Route path="/" element={<Home />} />
          <Route
            path="/explore"
            element={
              <Suspense fallback={<div>Loading Explore...</div>}>
                <ExploreMasonry />
              </Suspense>
            }
          />
          <Route
            path="/blogs"
            element={
              <Suspense fallback={<div>Loading Blogs...</div>}>
                <Blogs />
              </Suspense>
            }
          />
          <Route
            path="/blogs/search"
            element={
              <Suspense fallback={<div>Loading Blogs...</div>}>
                <Blogs />
              </Suspense>
            }
          />
          <Route
            path="/blogs/suggest"
            element={
              <Suspense fallback={<div>Loading Blogs...</div>}>
                <Blogs />
              </Suspense>
            }
          />
          <Route
            path="/products"
            element={
              <Suspense fallback={<div>Loading Products...</div>}>
                <Products />
              </Suspense>
            }
          />
          <Route path="/tools" element={<Tools />} />
          <Route path="/about-us" element={<About />} />
          <Route path="/privacy" element={<Privancy />} />
          <Route path="/contact" element={<Contact />} />
          <Route
            path="/blog-detail/:blogId/:blogTitle"
            element={
              <Suspense fallback={<div>Loading Blog Detail...</div>}>
                <BlogDetail />
              </Suspense>
            }
          />
          <Route
            path="/explore-next/:type/:imageTag"
            element={
              <Suspense fallback={<div>Loading Explore Next...</div>}>
                <ExploreNext />
              </Suspense>
            }
          />
          <Route path="/services" element={<Services />} />
        </Routes>

        <BlogAudioPlayer />
        {!exploreNext && !exploreRoute && <Footer />}
        <Analytics />
      </CartProvider>
    </BlogAudioProvider>
  );
}

export default App;
