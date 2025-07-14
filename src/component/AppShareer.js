import React from 'react'
import "./AppShareer.css"
const AppShareer = () => {

    function shareWhatsApp() {
        const title = document.title;
        const url = window.location.href;
        const imageUrl = "https://yourwebsite.com/images/services-banner.jpg";

        const message = `${title}\n${url}\n${imageUrl}`;
        window.open(`https://wa.me/?text=${encodeURIComponent(message)}`, '_blank');
}

  return (
    <div class="app_sharer_container">
        <i class="fa-brands fa-whatsapp whatsapp_icon"></i>
        <i class="fa-brands fa-facebook facebook_icon"></i>
        <i class="fa-brands fa-twitter twitter_icon"></i>
        <i class="fa-brands fa-instagram instgram_icon"></i>
        <i class="fa-brands fa-linkedin linkedin_icon"></i>
        <i class="fa-solid fa-comment-sms sms_icon"></i>
        <i class="fa-regular fa-copy copy_icon"></i>
    </div>
  )
}

export default AppShareer