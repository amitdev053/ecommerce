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
    // // console.log("rgbToHexa Color", color)
    // let rgb = `rgb + ${color}`
    // const values = rgb.match(/\d+/g);


    return `#${color.map(c => c.toString(16).padStart(2, "0")).join("")}`;
}


// Sort colors by brightness (Canva-like sorting)
function brightness(color) {
    return (color[0] * 0.299 + color[1] * 0.587 + color[2] * 0.114);
}
export {getImageColors}