const handleShare = async (productTitle, productDesc= "", productImage , fromWhere) => {
    console.log("Attempting to share content:", productTitle, productDesc, productImage);
  
    if (navigator.canShare && navigator.canShare({ files: [new File([""], "test.jpg", { type: "image/jpeg" })] })) {
      try {
        const response = await fetch(productImage);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const blob = await response.blob();
        console.log("Image fetched successfully, creating file...");
  
        const file = new File([blob], 'image.jpg', { type: 'image/jpeg' });
        console.log("File created successfully:", file);
  console.log("Attempting to share content:",file, [file], URL.createObjectURL(file))
        await navigator.share({
          title: productTitle,
          text: productDesc,
          url: "Market-shops" +  window.location.href,
          files: [file],
        });
  
        console.log('Content shared successfully');
      } catch (error) {
        console.error('Error sharing content:', error);
      }
    } else {
      alert('Web Share API is not supported in your browser or the current device cannot share files.');
    }
  };

  function ShareButton (props) {
    return (
      <button className="btn btn-sm btn-primary p_s_btn brand_button " onClick={() => handleShare(props.productTitle, props.productDesc, props.productImage, props.fromWhere)}>
        Share 
        <i class="fa-solid fa-share-nodes icon_margin"></i>
        {/* <i class="fa-regular fa-share-from-square icon_margin"></i> */}
      </button>


      
    );
  }

  export{handleShare, ShareButton}