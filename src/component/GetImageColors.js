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
      reject("Image failed to load. CORS or invalid URL.");
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


export {getImageColors, generateCaption, getCachedColor}