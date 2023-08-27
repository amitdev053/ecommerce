import React, { useEffect, useState } from "react";
import Loader from "./Loader";
import { useNavigate } from "react-router-dom";

export default function Media() {
  const navigate = useNavigate();

  const [gallerymedia, setmedia] = useState([]);
  const [title, settitle] = useState("");
  const [loader, setloader] = useState(true);

  function getMedia() {
    let mediaurl =
      "https://backend.babusiya.com/website_assets/get_webasset_content";
    let requestjson = {
      content_id: "GAL_EL33B3K4SI",
      rows: "10",
      populate: "photos,videos",
      page: "1",
    };
    fetch(mediaurl, {
      method: "POST",
      Header: {
        accept: "application/json",
        "Content-type": "application/json",
      },
      body: JSON.stringify(requestjson),
    })
      .then((res) => res.json())
      .then((res) => {
        setloader(false)
        console.log("res=", res)
        let title = res.records.title;
        settitle(title);
        console.log(title);
        let data = res.records.records;
        console.log(data);
        setmedia(data);
        return data;
      });
    console.log("title is ");
  }
  useEffect(() => {
    getMedia();
  }, []);
  console.log("Media is ", gallerymedia);

  function viewAlbumn(id) {
    console.log(navigate);
    navigate("/viewgallery/"+id);
  }
  if(loader == true){
    return(
      <>
      <Loader></Loader>
      </>
    )
  }
else{
  return (
    <>
 
      <div className="container text-left mt-74">
    
        <div className="row">
          {/* Columns Started Here */}
          {gallerymedia.map((element) => {
            let image = element.url.medium_image_url;

            return (
              <div
                className="col-md-3 col-sm-12 gallerycol"
                key={element.content_id}
              >
                <div className="galleryimg">
                  <img src={image} alt="" />
                </div>
                <div className="mediacontent d-inline-block">
                  <p className="mb-1 totalgal">ALBUMN Photos: 5</p>
                  <h4 className="gallerytitle">{title}</h4>
                  <span>Mar 1 , 2023</span>
                  <br />
                  <button
                    className="btn btn-sm btn-primary viewgallerybtn"
                    onClick={() => {
                      viewAlbumn(element.content_id);
                    }}
                  >
                    View Albumn
                  </button>
                </div>
              </div>
            );
          })}
          {/* Columns End Upon the div Here */}
        </div>
      </div>
    </>
  );
  }
}
