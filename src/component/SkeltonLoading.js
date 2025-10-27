import React from 'react';
import { useLocation } from 'react-router-dom';
import './SkeltonLoading.css';

const SkeltonLoading = (props, { columns = 3, itemsPerColumn = 6, loadingFor }) => {
    const location = useLocation();
  const isExploreNextPage = location.pathname.startsWith('/explore-next/photo/');
  // const generateRandomHeights = () => {
  //   return Array.from({ length: itemsPerColumn }, () =>
  //     Math.floor(Math.random() * 100) + 180 // 180px to 280px
  //   );
  // }; 
  const heightOptions = [200, 220, 240, 260];

const generateRandomHeights = () => {
  return Array.from({ length: itemsPerColumn }, () =>
    heightOptions[Math.floor(Math.random() * heightOptions.length)]
  );
};
// ✅ For home page — show exactly 7 cards
  if (loadingFor === "home") {
    const heights = generateRandomHeights(7);
    return (
      <div className="masonry-skeleton-wrapper container app_skelton_wrapper my-5 p-0">
        <div className="masonry-single-row">
          {heights.map((height, index) => (
            <div
              key={index}
              className="masonry-skeleton-card"
              style={{ height: `${height}px`, flex: '1 1 13%' }} // around 7 items in one row
            ></div>
          ))}
        </div>
      </div>
    );
  }

  const skeletonColumns = Array.from({ length: columns }).map((_, colIndex) => {
    const heights = generateRandomHeights();
    return (
     
      <div  className="masonry-column" key={colIndex}>
        {heights.map((height, index) => (
          <div
            key={index}
            className="masonry-skeleton-card"
            style={{ height: `${height}px` }}
          ></div>
        ))}
      </div>
    );
  });
 
  return <div  className={`masonry-skeleton-wrapper container app_skelton_wrapper  ${isExploreNextPage ? 'mt-ps90' : 'mt-ps90'}  ${props.loadingFor === "home" && 'my-5 p-0'}`}   >{skeletonColumns}</div>;
};

export default SkeltonLoading;

