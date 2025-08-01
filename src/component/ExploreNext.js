import React, { useEffect } from 'react'
import Explore from './Explore'
import { useParams, useLocation } from 'react-router-dom'
import { Helmet } from 'react-helmet';

const ExploreNext = () => {
    const displayImage = useParams()
    const location = useLocation()
     const title = `Explore Images for ${displayImage.imageTag}`;
  const description = `Browse a beautiful collection of images related to ${displayImage.imageTag}. Find inspiration, download, and explore more.`;
   const image = location.state?.imageData; // 👈 safely access the passed image
    useEffect(()=>{
        console.log("display params", displayImage, image)
    }, [displayImage.imageTag])

  return (
    <div>  
      {/* <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`https://www.market-shops.vercel.app/explore-next/${displayImage.type}/${displayImage.imageTag}`} />
        {(image) && <meta property="og:image" content={`${image.webformatURL}`} />}    
        
      </Helmet> */}

      <Helmet>
  <title>{title}</title>
  <meta name="description" content={description} />
  <meta name="keywords" content={`Explore ${displayImage.imageTag} images, free ${displayImage.imageTag} stock photos`} />
  
  <meta property="og:title" content={title} />
  <meta property="og:description" content={description} />
  <meta property="og:type" content="website" />
  <meta property="og:url" content={`https://market-shops.vercel.app/explore-next/${displayImage.type}/${displayImage.imageTag}`} />
  <meta property="og:image" content={image?.webformatURL || "https://market-shops.vercel.app/favicon.png"} />

  <meta name="twitter:card" content="summary_large_image" />
  <link rel="canonical" href={`https://market-shops.vercel.app/explore-next/${displayImage.type}/${displayImage.imageTag}`} />
</Helmet>



  <Explore
         key={`${displayImage.type}-${displayImage.imageTag}`}  
         componentFrom="exploreNext"   displayImage={displayImage.imageTag} ></Explore>
    </div>
  )
}

export default ExploreNext
