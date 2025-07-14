import React from 'react'
import "./Services.css"
import AppShareer from './AppShareer'

const servicesData = [
  {
    icon: "🚀",
    title: "Landing Page",
    description: "Create stunning, responsive landing pages in 3 days.",
    price: "₹1,499",
    features: [
      "SEO optimized",
      "Fast & responsive",
      "Conversion-ready"
    ]
  },
  {
    icon: "🛠️",
    title: "Maintenance",
    description: "Fix bugs, update content, and improve performance monthly.",
    price: "₹9,99",
    features: [
      "One-time or monthly",
      "Speed optimization",
      "Minor updates"
    ]
  },
  {
    icon: "🎨",
    title: "Website Design",
    description: "Custom-designed layouts, Figma-to-code delivery.",
    price: "₹1,999",
    features: [
      "Clean UI/UX",
      "Mobile optimized",
      "Design-first approach"
    ]
  },
  {
    icon: "✨",
    title: "Button Effects",
    description: "Add smooth hover animations and interactive feedbacks.",
    price: "₹7,99",
    features: [
      "Animated CTAs",
      "Hover styles",
      "Unique UI effects"
    ]
  },
  {
    icon: "🌐",
    title: "Full Website",
    description: "Build the entire website front from scratch — fast and SEO-ready.",
    price: "₹2,999",
    features: [
      "Custom frontend",
      "Mobile-first layout",
      "Deployed on Vercel"
    ]
  },
   {
    icon: "💎",
    title: "Premium Services",
    description: "Build the entire website front from scratch — fast and SEO-ready.",
    price: "₹3,499",
    features: [
      "Custom frontend",
      "Mobile-first layout",
      "Deployed on Vercel"
    ]
  }
]


const Services = () => {
    function shareServices(event){
        event.stopPropagation(); // Prevent bubbling if needed
        const sharedBox = document.querySelector('.app_sharer_container');
        sharedBox.style.opacity = `0%`;
       


  const button = event.currentTarget; // The share button
  const rect = button.getBoundingClientRect(); // Position of the button

  

  // Calculate position (slightly below the button)
  const top = rect.bottom + window.scrollY + 20; // 8px spacing
  const left = rect.left + window.scrollX;

  // Apply position
  sharedBox.style.position = 'absolute';
  sharedBox.style.width = `315px`;
  sharedBox.style.top = `${top}px`;
  sharedBox.style.left = `${left}px`;
  sharedBox.style.opacity = `100%`;
  

    }
  return (
    <>
    <div className='container app_container mt-ps90'>
<div className="hero">
    <h1>✨ Amazing Web Services</h1>
    <p>Modern. Fast. Designed to convert.</p>
  </div>

  
  <section className="services-grid">
  {servicesData.map((service, index) => (
    <div className="service-card position-relative" key={index}>
      <div className="icon-badge">{service.icon}</div>
      <h3>{service.title}</h3>
      <p className="gallerytitle productname productdiscripation">{service.description}</p>
      <ul>
        {service.features.map((feature, i) => (
          <li key={i} className="gallerytitle productname productdiscripation">{feature}</li>
        ))}
      </ul>
      <div className="price">{service.price}</div>
      <div className='app_services_cta_button'>
      <button  className="cta-button " onClick={(event)=>{shareServices(event)}}> <i class="fa-solid fa-arrow-up-from-bracket share_cta_icon"></i> Share Now</button>
      <button  className="cta-button ">  Buy Now <i class="fa-solid fa-angle-right buy_cta_icon"></i></button>

      </div>
    </div>
  ))}
</section>

  
  <div className="trust gallerytitle productname productdiscripation">
    Trusted by 20+ businesses • Payments secured via Razorpay • Built with love & Care 💙
  </div>
  </div>
  <AppShareer />
    </>
  )
}

export default Services