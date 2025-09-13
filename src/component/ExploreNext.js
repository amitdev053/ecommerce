import React, { useEffect } from 'react'
import Explore from './Explore'
import { useParams, useLocation } from 'react-router-dom'
import { Helmet } from 'react-helmet';

const ExploreNext = () => {
    const displayImage = useParams()
    const location = useLocation()
     const title = `Explore ${displayImage.imageTag} Images | BrowseNext`;
  const description = `Browse a beautiful collection of images related to ${displayImage.imageTag} images. Download, explore, and get inspired with our curated collection on BrowseNext.`;
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
        <meta property="og:url" content={`https://www.browsenext.today/explore-next/${displayImage.type}/${displayImage.imageTag}`} />
        {(image) && <meta property="og:image" content={`${image.webformatURL}`} />}    
        
      </Helmet> */}

      <Helmet>
  <title>{title}</title>
  <meta name="description" content={description} />
  <meta name="keywords" content={`Explore ${displayImage.imageTag} images, free ${displayImage.imageTag} stock photos`} />
  <meta name="author" content="Browse Next" />
 <meta name="robots" content="index, follow" />  
  
  <link rel="canonical" href={`https://browsenext.today/explore-next/${displayImage.type}/${displayImage.imageTag}`} />

  <meta property="og:title" content={title} />
  <meta property="og:description" content={description} />
  <meta property="og:type" content="website" />
  <meta property="og:url" content={`https://browsenext.today/explore-next/${displayImage.type}/${displayImage.imageTag}`} />
  <meta property="og:image" content={image?.webformatURL || "https://browsenext.today/favicons.png"} />
 <meta property="og:image:alt" content={`Image of ${displayImage.imageTag}`} />

     <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image?.webformatURL || "https://browsenext.today/favicons.png"} />

       {/* <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ImageObject",
          "name": title,
          "description": description,
          "url": `https://browsenext.today/explore-next/${displayImage.type}/${displayImage.imageTag}`,
          "image": [image?.webformatURL || "https://browsenext.today/favicons.png"],
        })}
      </script> */}


      {/* <script
    type="application/ld+json"
    dangerouslySetInnerHTML={{
      __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Explore", "item": "https://browsenext.vercel.app/explore" },
          { "@type": "ListItem", "position": 2, "name": displayImage.imageTag, "item": `https://browsenext.vercel.app/explore-next/${displayImage.type}/${displayImage.imageTag}` }
        ]
      })
    }}
  /> */}

  {/* Dynamic ImageObject */}
  {/* <script
    type="application/ld+json"
    dangerouslySetInnerHTML={{
      __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "ImageObject",
        "name": title,
        "description": description,
        "url": `https://browsenext.today/explore-next/${displayImage.type}/${displayImage.imageTag}`,
        "image": [image?.webformatURL || "https://browsenext.today/favicons.png"],
        "license": "https://browsenext.today/terms",
        "creator": { "@type": "Organization", "name": "BrowseNext" }
      })
    }}
  /> */}


  
  <script
    type="application/ld+json"
    dangerouslySetInnerHTML={{
      __html: JSON.stringify([
        {
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": [
            {
              "@type": "ListItem",
              "position": 1,
              "name": "Explore",
              "item": "https://browsenext.vercel.app/explore"
            },
            {
              "@type": "ListItem",
              "position": 2,
              "name": displayImage?.imageTag || "Image",
              "item": `https://browsenext.today/explore-next/${displayImage?.type || "photo"}/${displayImage?.imageTag || "default"}`
            }
          ]
        },
        {
          "@context": "https://schema.org",
          "@type": "ImageObject",
          "name": title || "BrowseNext Image",
          "description": description || "Explore image on BrowseNext",
          "url": `https://browsenext.today/explore-next/${displayImage?.type || "photo"}/${displayImage?.imageTag || "default"}`,
          "image": [image?.webformatURL || "https://browsenext.today/favicons.png"],
          "license": "https://browsenext.today/terms",
          "creator": { "@type": "Organization", "name": "BrowseNext" }
        }
      ])
    }}
  />


  
</Helmet>



  <Explore
         key={`${displayImage.type}-${displayImage.imageTag}`}  
         componentFrom="exploreNext"   displayImage={displayImage.imageTag} ></Explore>
    </div>
  )
}

export default ExploreNext
