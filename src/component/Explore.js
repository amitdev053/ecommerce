import "./expore.css";
import React, { useEffect, useState, useContext } from "react";
import Loader from "./Loader";
import axios from "axios";
import EmptyCartImage from "../appimages/empty_cart.webp";

const Explore = () => {
  let content = [ "Travel", "Fashion", "Sports", "Music", "Gaming", "Technology", "Health", "Finance", "Education", "Lifestyle"]
  let index = 0;

const baseUrl = `https://pixabay.com/api/?key=45283300-eddb6d21a3d3d06f2a2381d7d&q=${content[index]}&image_type=photo`


const [loader, setloader] = useState(true);
const [images, setImages] = useState([]);


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
  setInterval(() => {
    index = (index + 1) % content.length;
    const newBaseUrl = `https://pixabay.com/api/?key=45283300-eddb6d21a3d3d06f2a2381d7d&q=${content[index]}&image_type=photo`
    getProducts(newBaseUrl)
    // Update the baseUrl variable or make an API call with the new URL
  }, 7200000); // 2 hours in milliseconds
  useEffect(() => {
    document.title = "Explore";
    getProducts(baseUrl);
  }, []);

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
          {images.map((image) => {
            console.log("app explore image", image);
            return (
              <div className="column">
                <img src={image.largeImageURL} alt="Image 1" />
              </div>
            );
          })}
        </div>
      </>
    );
  }
};

export default Explore;
