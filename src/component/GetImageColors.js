import { useCallback, useState, useEffect, useRef  } from 'react';
// this is s function of to get image colors in Explore.js


function getImageColors(imageUrl, colorCount = 6) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "Anonymous"; 
    img.src = imageUrl;

    img.onload = function () {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      const width = 200;
      const height = (img.height / img.width) * width;
      canvas.width = width;
      canvas.height = height;
      ctx.drawImage(img, 0, 0, width, height);

      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const pixels = imageData.data;
      let colors = [];

      for (let i = 0; i < pixels.length; i += 40) {
        colors.push([pixels[i], pixels[i + 1], pixels[i + 2]]);
      }

      const mainColors = kMeans(colors, colorCount);
      mainColors.sort((a, b) => brightness(b) - brightness(a));
      const hexColors = mainColors.map(rgbToHex);
      resolve(hexColors); // Return dominant hex colors
    };

    img.onerror = function () {
      // reject("Image failed to load. CORS or invalid URL.");
      console.log("cores")
    };
  });
}


// K-Means clustering to group similar colors
function kMeans(data, k) {
    const centroids = data.slice(0, k);
    let prevCentroids = [];
    let clusters = Array(k).fill().map(() => []);
    // console.log("clusters", clusters);
    while (!centroidsEqual(centroids, prevCentroids)) {
        clusters = Array(k).fill().map(() => []);
        data.forEach((color) => {
            const distances = centroids.map(c => colorDistance(color, c));
            const clusterIndex = distances.indexOf(Math.min(...distances));
            clusters[clusterIndex].push(color);
        });

        prevCentroids = [...centroids];
        centroids.forEach((_, i) => {
            if (clusters[i].length > 0) {
                centroids[i] = averageColor(clusters[i]);
            }
        });
    }

    return centroids;
}

// Check if centroids have changed
function centroidsEqual(a, b) {
    return JSON.stringify(a) === JSON.stringify(b);
}

// Calculate Euclidean distance between colors
function colorDistance(c1, c2) {
    return Math.sqrt(
        (c1[0] - c2[0]) ** 2 +
        (c1[1] - c2[1]) ** 2 +
        (c1[2] - c2[2]) ** 2
    );
}

// Find average color in a cluster
function averageColor(colors) {
    const avg = colors.reduce((acc, color) => {
        return [acc[0] + color[0], acc[1] + color[1], acc[2] + color[2]];
    }, [0, 0, 0]);

    return avg.map(c => Math.floor(c / colors.length));
}

// Convert RGB to Hex
function rgbToHex(color) {
    return `#${color.map(c => c.toString(16).padStart(2, "0")).join("")}`;
}


// Sort colors by brightness (Canva-like sorting)
function brightness(color) {
    return (color[0] * 0.299 + color[1] * 0.587 + color[2] * 0.114);
}
// this is s function of to get image colors in Explore.js end here

// this is a function for genrates the the images captions for explorejs page 
function getUseCase(tagsString) {
  const tags = tagsString.toLowerCase().split(',').map(t => t.trim());

  if (tags.some(tag => ["kiss", "hugs", "romantic", "date night", "valentine", "rose", "couples", "sibling love"].includes(tag)))
    return "romantic blogs, Valentine's Day content, or love-themed projects";

  if (tags.some(tag => ["fashion"].includes(tag)))
    return "style blogs, fashion campaigns, or clothing store promotions";

  if (tags.some(tag => ["sports", "fitness", "wellness"].includes(tag)))
    return "sports articles, workout apps, or healthy lifestyle content";

  if (tags.some(tag => ["music", "gaming"].includes(tag)))
    return "music playlists, gaming channels, or digital content creation";

  if (tags.some(tag => ["technology", "innovation", "science"].includes(tag)))
    return "tech reviews, science magazines, or startup pitch decks";

  if (tags.some(tag => ["health", "meditation"].includes(tag)))
    return "healthcare blogs, wellness products, or mindfulness content";

  if (tags.some(tag => ["finance"].includes(tag)))
    return "financial blogs, investment platforms, or fintech branding";

  if (tags.some(tag => ["education", "books", "literature"].includes(tag)))
    return "online courses, study materials, or academic blogs";

  if (tags.some(tag => ["lifestyle", "luxury and lifestyle", "minimalism", "motivation and productivity"].includes(tag)))
    return "lifestyle branding, productivity tips, or luxury blog content";

  if (tags.some(tag => ["travel and adventure", "nature", "wildlife"].includes(tag)))
    return "travel websites, adventure blogs, or nature-themed campaigns";

  if (tags.some(tag => ["art and creativity", "hobbies and skills"].includes(tag)))
    return "creative portfolios, art blogs, or DIY project inspiration";

  if (tags.some(tag => ["food", "culinary"].includes(tag)))
    return "recipe blogs, restaurant branding, or food delivery ads";

  if (tags.some(tag => ["history", "culture"].includes(tag)))
    return "educational blogs, museum sites, or cultural documentaries";

  if (tags.some(tag => ["architecture", "design"].includes(tag)))
    return "architecture showcases, design portfolios, or real estate brochures";

  if (tags.some(tag => ["space", "astronomy"].includes(tag)))
    return "space blogs, astronomy education, or sci-fi project covers";

  return "blogs, ads, or creative design projects";
}


const templates = [
  (tags, use) => `This photo highlights ${tags}, perfect for ${use}.`,
  (tags, use) => `A beautiful depiction of ${tags}, ideal for ${use}.`,
  (tags, use) => `Featuring ${tags}, this image fits well in ${use}.`,
  (tags, use) => `Use this high-quality image of ${tags} in ${use}.`,
  (tags, use) => `With its focus on ${tags}, this image suits ${use}.`,
  (tags, use) => `Great for ${use}, this image captures ${tags} perfectly.`,
];
// Global in-memory caption cache
const captionCache = {};

// Caption generator
function generateCaption(imageData) {
  // ✅ Step 1: Return from cache if already exists
  if (captionCache[imageData.id]) return captionCache[imageData.id];

  // ✅ Step 2: Generate unique tags
  const tagList = [...new Set(imageData.tags.split(',').map(tag => tag.trim()))];
  const topTags = tagList.slice(0, 3).join(', ');

  // ✅ Step 3: Determine use case like "ideal for ads, blogs..."
  const useCase = getUseCase(imageData.tags);

  // ✅ Step 4: Pick a random caption template
  const template = templates[Math.floor(Math.random() * templates.length)];
  const caption = template(topTags, useCase);

  // ✅ Step 5: Cache it
  captionCache[imageData.id] = caption;

  return caption;
}

const colorCache = {};

async function getCachedColor(imageUrl) {
  if (colorCache[imageUrl]) return colorCache[imageUrl];
  const colors = await getImageColors(imageUrl, 1);
  colorCache[imageUrl] = colors[0];
  return colors[0];
}

// custom hook for the imageCache

 function useSessionCache(keyPrefix) {
  const getCache = useCallback((key) => {
    const fullKey = `${keyPrefix}:${key}`;
    const cached = sessionStorage.getItem(fullKey);
    return cached ? JSON.parse(cached) : null;
  }, [keyPrefix]);

  const setCache = useCallback((key, data) => {
    const fullKey = `${keyPrefix}:${key}`;
    sessionStorage.setItem(fullKey, JSON.stringify(data));
  }, [keyPrefix]);

  const clearCache = useCallback((key) => {
    if (key) {
      sessionStorage.removeItem(`${keyPrefix}:${key}`);
    } else {
      Object.keys(sessionStorage)
        .filter(k => k.startsWith(`${keyPrefix}:`))
        .forEach(k => sessionStorage.removeItem(k));
    }
  }, [keyPrefix]);

  return { getCache, setCache, clearCache };
}



function useIndexedDBCache(dbName = "ImageCacheDB", storeName = "cacheStore") {
  const [db, setDb] = useState(null);
  const memoryCache = useRef(new Map()).current;

  useEffect(() => {
    const openRequest = indexedDB.open(dbName, 1);

    openRequest.onupgradeneeded = (event) => {
      const db = event.target.result;
      if (!db.objectStoreNames.contains(storeName)) {
        db.createObjectStore(storeName);
      }
    };

    openRequest.onsuccess = () => {
      setDb(openRequest.result);
    };

    openRequest.onerror = (e) => {
      console.error("❌ IndexedDB open error:", e);
    };
  }, [dbName, storeName]);

  

const getCache = useCallback((key) => {
  return new Promise((resolve) => {
    if (memoryCache.has(key)) return resolve(memoryCache.get(key));
    if (!db) return resolve(null);

    const tx = db.transaction(storeName, "readonly");
    const store = tx.objectStore(storeName);
    const request = store.get(key);

    request.onsuccess = () => {
      const result = request.result;
      if (result) memoryCache.set(key, result); // cache in memory
      resolve(result);
    };

    request.onerror = () => resolve(null);
  });
}, [db, storeName]);

  const setCache = useCallback((key, value) => {
    if (!db) return;
      memoryCache.set(key, value);
    const tx = db.transaction(storeName, "readwrite");
    const store = tx.objectStore(storeName);
    store.put(value, key);
  }, [db, storeName]);

  const clearCache = useCallback((key = null) => {
    if (!db) return;
    const tx = db.transaction(storeName, "readwrite");
    const store = tx.objectStore(storeName);
    if (key) {
      store.delete(key);
    } else {
      store.clear();
    }
  }, [db, storeName]);

  return { getCache, setCache, clearCache };
}
export {getImageColors, generateCaption, getCachedColor, useSessionCache, useIndexedDBCache}


//   async function getImages(url, exploreNextInfiniteScroll = false) {
//     console.log("yes getImages runs")
//     if((trakImages && props.componentFrom !== "home")){
//       setloader(true);

//     }
    

// const queryMatch = url.match(/[\?&]q=([^&]+)/i);
// const query = queryMatch ? decodeURIComponent(queryMatch[1]) : "default";

// const pageMatch = url.match(/[\?&]page=(\d+)/i);
// const pageNum = pageMatch ? pageMatch[1] : "1";

// const componentPrefix = props.componentFrom || "explore";
// const cacheKey = `${componentPrefix}-${(componentPrefix === "explore") ? query : props.displayImage}-page-${pageNum}`;
//     let cacheCatch =  await getCache(cacheKey)


//   const urlParams = new URLSearchParams(url.split("?")[1]);
// const queryFromUrl = urlParams.get("q")?.toLowerCase();

// const isExploreNext = props.componentFrom === "exploreNext";
// const expectedQuery = isExploreNext
//   ? props.displayImage?.toLowerCase()
//   : content[updatedHours()].toLowerCase(); // fallback for explore page
//   let cacheArray = cacheKey.split("-")
// console.log("query for", cacheKey.split("-"), expectedQuery, cacheArray.includes(expectedQuery))


// if (
 
//   cacheCatch && cacheArray.includes(expectedQuery)

// ) {
//   console.log("💾 Using cached result for", cacheCatch, cacheKey, queryFromUrl, expectedQuery);
//   setupImageOnPage(cacheCatch);
//   return;
// }

// // if(cacheArray.includes(expectedQuery)) return





// // console.log("fecthing image for", queryFromUrl , expectedQuery)




//      try {
//       console.log("try runs")
//     const response = await fetch(url);   

//     const result = await response.json();
// setCache(cacheKey, result); // 💾 Save to cache
//     if (props.componentFrom === "home") {
//       // console.log("explore images", result.hits);
//       console.log("yes home props")
//       // setImages(result.hits.splice(0, 7));
//       const maxImages = 7;
// const hits = result.hits.slice(0, maxImages);

// // Trim to multiple of 3 (e.g., 6 instead of 7)
// const cleanCount = hits.length - (hits.length % 3);
// const cleanHits = hits.slice(0, cleanCount);

//       // setupImageOnPage(result.hits.splice(0, 7))
//       setupImageOnPage(cleanHits)
//     } else if(props.componentFrom === "exploreNext"){
//       // let isTracking = trakImages;
//       console.log("explorenext page", props.displayImage, url, trakImages)
//       let exploreNextPhotos;

//       let exploreNextUrl
//       if(exploreNextInfiniteScroll){
//         exploreNextUrl = url
//         // setTrakImage(true)
//       //  isTracking = trakImages 
//         console.log("inifinite scroll", pageState, exploreNextUrl, trakImages)

//       }else{
        
//         exploreNextUrl = `https://pixabay.com/api/?key=45283300-eddb6d21a3d3d06f2a2381d7d&q=${props.displayImage}&image_type=photo`

//       }
//         // if(isTracking){
//         try{
//           console.log("explorenext url", exploreNextUrl)
//           const response = await fetch(exploreNextUrl);  
//           exploreNextPhotos = await response.json();
//           console.log("return", exploreNextPhotos)
//           setupImageOnPage(exploreNextPhotos)

//         }catch(error){
//              setloader(false);    
//             setBottomLoader(false);
//         console.log("catch eroor in rxplore next page", pageState, error)
//         }
    
//               // return 
              
//             // }

        
//     }
    
//     else {
//       console.log("explore loading results")
//      setupImageOnPage(result)
//     }
//   } catch (error) {
//     setloader(false);    
//     setBottomLoader(false);
//     console.log("catch eroor in app images", pageState, error)
//   }
// }






// async function getImages(url, exploreNextInfiniteScroll = false) {
//   console.log("🚀 getImages called", url);

 
// const queryMatch = url.match(/[\?&]q=([^&]+)/i);
// const query = queryMatch ? decodeURIComponent(queryMatch[1]) : "default";

// const pageMatch = url.match(/[\?&]page=(\d+)/i);
// const pageNum = pageMatch ? pageMatch[1] : "1";

// const componentPrefix = props.componentFrom || "explore";
// const cacheKey = `${componentPrefix}-${(componentPrefix === "explore") ? query : props.displayImage}-page-${pageNum}`;
//     let cacheCatch =  await getCache(cacheKey)


//   const urlParams = new URLSearchParams(url.split("?")[1]);
// const queryFromUrl = urlParams.get("q")?.toLowerCase();

// const isExploreNext = props.componentFrom === "exploreNext";
// const expectedQuery = isExploreNext
//   ? props.displayImage?.toLowerCase()
//   : content[updatedHours()].toLowerCase(); // fallback for explore page
//   let cacheArray = cacheKey.split("-").map(item => item.toLowerCase())
// console.log("query for",cacheArray, expectedQuery, cacheArray.includes(expectedQuery.toLowerCase()))


// if (
 
//   cacheCatch && cacheArray.includes(expectedQuery.toLowerCase())

// ) {
//   console.log("💾 Using cached result for", cacheCatch, cacheKey, queryFromUrl, expectedQuery);
//   setupImageOnPage(cacheCatch);
//   return;
// }


//   try {
//     console.log("🌐 Fetching from network");
//     const response = await fetch(url);
//     const result = await response.json();

//     setCache(cacheKey, result); // 💾 Save to IndexedDB
 
// if( props.componentFrom === "home") {
//    const maxImages = 7;
// const hits = result.hits.slice(0, maxImages);

// // Trim to multiple of 3 (e.g., 6 instead of 7)
// const cleanCount = hits.length - (hits.length % 3);
// const cleanHits = hits.slice(0, cleanCount);
//   setupImageOnPage(cleanHits);
// }else{

//   setupImageOnPage(result);
// }
//   } catch (error) {
//     console.error("❌ Error in getImages", error);
//     setloader(false);
//     setBottomLoader(false);
//   }
// }
