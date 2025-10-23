const handleShare = async (productTitle, productDesc, productImage , fromWhere= undefined, pageUrl= null) => {
    // console.log("Attempting to share content:", productTitle, productDesc, productImage);
  
    if (navigator.canShare && navigator.canShare({ files: [new File([""], "test.jpg", { type: "image/jpeg" })] })) {
      try {
        const response = await fetch(productImage);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const blob = await response.blob();
        // console.log("Image fetched successfully, creating file...");
        
        const file = new File([blob], 'image.jpg', { type: 'image/jpeg' });
        // console.log("File created successfully:", file);
  // console.log("Attempting to share content:",file, [file], URL.createObjectURL(file))
     
        if(fromWhere === "captionTools"){
          console.log("yes tools_share")
              await navigator.share({
                title: productTitle,
                text: productDesc,
                url: pageUrl || window.location.href,                
              });
        }else{
              await navigator.share({
                title: productTitle,
                text: productDesc,
                url: pageUrl || window.location.href,
                files: [file],
              });
        }
  
        // console.log('Content shared successfully');
      } catch (error) {
        console.error('Error sharing content:', error);
      }
    } else {
      alert('Web Share API is not supported in your browser or the current device cannot share files.');
    }
  };

  function ShareButton ({productTitle, productDesc, productImage, btnClass, callingFrom}) {
  
    return (
      (callingFrom === "captionTools")
        ? <i className={`fa-solid fa-share-nodes icon_margin ${btnClass}`} 
         role="button" tabIndex={0} aria-label={`Share tools`}
         onClick={() => handleShare(productTitle, productDesc, productImage, callingFrom)}
          onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    handleShare(productTitle, productDesc, "", callingFrom)
                  }
                }}
        ></i> :
 <button className={`btn btn-sm btn-primary p_s_btn brand_button btnClass ${btnClass} margin_left_for_share`}  onClick={() => handleShare(productTitle, productDesc, productImage, callingFrom)}>
        Share 
        <i className="fa-solid fa-share-nodes icon_margin"></i>
        {/* <i class="fa-regular fa-share-from-square icon_margin"></i> */}
      </button>


      
     


      
    );
  }

  export{handleShare, ShareButton}