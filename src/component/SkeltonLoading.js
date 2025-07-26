// ExploreSkeleton.jsx
// import React from 'react';
// import './SkeltonLoading.css';


// const SkeltonLoading = ({ count = 12 }) => {
//   return (
//     <div className="container skeleton-container">
//       {Array.from({ length: count }).map((_, index) => (
//         <div className="skeleton-card" key={index}></div>
//       ))}
//     </div>
//   );
// };

// export default SkeltonLoading;

// import React from 'react';
// import './SkeltonLoading.css';
// import { useLocation } from 'react-router-dom';

// const SkeltonLoading = () => {
//   const location = useLocation();
//   const isExploreNextPage = location.pathname.startsWith('/explore-next/photo/');
//   console.log(location.pathname);
//   return (
//     // <div className="skeleton-grid container my-5">
//     <div className={`skeleton-grid container  ${isExploreNextPage ? 'mt-74' : 'my-5'}`}>
//       {/* Column 1 */}
//       <div className="skeleton-column">
//         <div className="skeleton-card small" />
//         <div className="skeleton-card small" />
//       </div>

//       {/* Column 2 (tall center card) */}
//       <div className="skeleton-column second_col">
//         <div className="skeleton-card tall" />
//       </div>

//       {/* Column 3 */}
//       <div className="skeleton-column">
//         <div className="skeleton-card small" />
//         <div className="skeleton-card small" />
//       </div>
//     </div>
//   );
// };

// export default SkeltonLoading;


// import React, { useEffect, useState } from 'react';
// import './SkeltonLoading.css';

// const SkeltonLoading = ({ count = 9 }) => {
//   const [isMobile, setIsMobile] = useState(false);

//   useEffect(() => {
//     const checkWidth = () => setIsMobile(window.innerWidth < 550);
//     checkWidth();
//     window.addEventListener('resize', checkWidth);
//     return () => window.removeEventListener('resize', checkWidth);
//   }, []);

//   if (isMobile) {
//     // Mobile View: show 20 small cards flat
//     return (
//       <div className="skeleton-grid container my-5 flex-wrap gap-2">
//         {Array.from({ length: 24 }).map((_, index) => (
// <>
//           {/* <div className="skeleton-card small mobile-card" key={index} /> */}

//            <div className="skeleton-column">
//         <div className="skeleton-card small" />
//         <div className="skeleton-card small" />
//       </div>

// </>
//         ))}
//       </div>
//     );
//   }

//   // Desktop View: structured 3-column layout
//   return (
//     <div className="skeleton-grid container my-5">
//       {/* Column 1 */}
//       <div className="skeleton-column">
//         <div className="skeleton-card small" />
//         <div className="skeleton-card small" />
//       </div>

//       {/* Column 2 (tall center card) */}
//       <div className="skeleton-column second_col">
//         <div className="skeleton-card tall" />
//       </div>

//       {/* Column 3 */}
//       <div className="skeleton-column">
//         <div className="skeleton-card small" />
//         <div className="skeleton-card small" />
//       </div>
//     </div>
//   );
// };

// export default SkeltonLoading;


import React from 'react';
import { useLocation } from 'react-router-dom';
import './SkeltonLoading.css';

const SkeltonLoading = ({ columns = 3, itemsPerColumn = 6 }) => {
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
 
  return <div  className={`masonry-skeleton-wrapper container app_skelton_wrapper  ${isExploreNextPage ? 'mt-74' : 'my-5'}`}   >{skeletonColumns}</div>;
};

export default SkeltonLoading;

