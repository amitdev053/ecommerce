import React, { useEffect } from 'react'
import Explore from './Explore'
import { useParams } from 'react-router-dom'

const ExploreNext = () => {
    const displayImage = useParams()
    useEffect(()=>{
        console.log("display params", displayImage)
    }, [])
  return (
    <div>
        <Explore
         key={`${displayImage.type}-${displayImage.imageTag}`}  
         componentFrom="exploreNext"   displayImage={displayImage.imageTag} ></Explore>
    </div>
  )
}

export default ExploreNext