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

import React from 'react';
import './SkeltonLoading.css';
import { useLocation } from 'react-router-dom';

const SkeltonLoading = () => {
  const location = useLocation();
  const isExploreNextPage = location.pathname.startsWith('/explore-next/photo/');
  console.log(location.pathname);
  return (
    // <div className="skeleton-grid container my-5">
    <div className={`skeleton-grid container  ${isExploreNextPage ? 'mt-74' : 'my-5'}`}>
      {/* Column 1 */}
      <div className="skeleton-column">
        <div className="skeleton-card small" />
        <div className="skeleton-card small" />
      </div>

      {/* Column 2 (tall center card) */}
      <div className="skeleton-column second_col">
        <div className="skeleton-card tall" />
      </div>

      {/* Column 3 */}
      <div className="skeleton-column">
        <div className="skeleton-card small" />
        <div className="skeleton-card small" />
      </div>
    </div>
  );
};

export default SkeltonLoading;
