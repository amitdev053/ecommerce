import "./expore.css";
import React, { useEffect, useState, useContext } from "react";
import Loader from "./Loader";
import axios from "axios";
import EmptyCartImage from "../appimages/empty_cart.webp";
import defaultBlogImage from "../defaultBlog.jpg";

const Explore = () => {
  // let content = [ "couples", "Fashion", "Sports", "Music", "Gaming", "Technology", "Health", "Finance", "Education", "Lifestyle"]
  let content = [
    "kisses", "Fashion", "Sports", "Music", "Gaming", "Technology", "Health", "Finance", "Education", "Lifestyle", "Travel and Adventure",    "Art and Creativity", "Nature and Wildlife", "Food and Culinary", "History and Culture","Fitness and Wellness", "Architecture and Design","Space and Astronomy", "Books and Literature",
    "Motivation and Productivity",  "Luxury and Lifestyle",  "Science and Innovation",   "Minimalism and Aesthetics", "Photography and Videography",  "Pets and Animals",
    "DIY and Crafting",  "Sustainability and Eco-living", "Hobbies and Skills",  "Vintage and Retro", "couples"
  ];
  

  const storedIndex = localStorage.getItem('exploreImage');
  const [index, setIndex] = useState(storedIndex ? parseInt(storedIndex) : 0);
  const [loader, setloader] = useState(true);
  const [images, setImages] = useState([]); // assume this is where you get your images
  const [imageStates, setImageStates] = useState([]);

 

  const baseUrl = `https://pixabay.com/api/?key=45283300-eddb6d21a3d3d06f2a2381d7d&q=${content[index]}&image_type=photo`


  function getProducts(url) {
    fetch(url)
      .then((response) => {
        setloader(false);
        console.log("response", response);
        return response.json();
      })
      .then((result) => {
        // console.log("products product.js", result);
        console.log("explore images", result.hits);
        setImages(result.hits);
      });
  }
 
  useEffect(() => {
    document.title = `Explore images for ${content[index]}`;

    // Fetch images for the initial index
    getProducts(baseUrl);

    // Update index and fetch images every 2 hours
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % content.length);
    
    }, 1 * 60 * 60 * 1000); // 1 hours in milliseconds

    // Cleanup the interval on component unmount
    return () => clearInterval(interval);
  }, []);
  useEffect(() => {
    setImageStates(images.map(() => ({ loaded: false })));
  }, [images, index]);
  // Fetch images whenever the index changes
  useEffect(() => {
    getProducts(baseUrl);
    localStorage.setItem('exploreImage', index.toString());
    setImageStates(images.map(() => ({ loaded: false })));
  }, [index]);

  if (loader === true) {
    return (
      <>
        <Loader></Loader>
      </>
    );
  } else {
    return (
      <>
 <div className="pinterest-layout mt-ps90">
      {images.map((image, index) => {
        if (!imageStates[index]) return null; // add this line
        const { loaded } = imageStates[index];

        return (
          <div className="column position-relative" key={index}>
            <img
              src={image.largeImageURL}
              onLoad={() =>
                setImageStates((prevStates) =>
                  prevStates.map((state, i) =>
                    i === index ? { loaded: true } : state
                  )
                )
              }
              onError={(e) =>{
                        e.target.src = defaultBlogImage;
                        e.target.alt = "Default image";
                      
                        }}
           
                      alt="Could'nt load"
           
            />
            {!loaded && <div className="app_loader" />}
          </div>
        );
      })}
    </div>
      </>
    );
  }
};

export default Explore;
