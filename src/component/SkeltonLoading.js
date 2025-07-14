// ExploreSkeleton.jsx
import React from 'react';
import './SkeltonLoading.css';
// import './expore.css'

const SkeltonLoading = ({ count = 12 }) => {
  return (
    <div className="skeleton-container mt-ps90">
      {Array.from({ length: count }).map((_, index) => (
        <div className="skeleton-card" key={index}></div>
      ))}
    </div>
  );
};

export default SkeltonLoading;
