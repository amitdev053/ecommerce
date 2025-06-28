import React from 'react'
import "./About.css"
const About = () => {
  return (
   <>
    <div className='container mt-ps90 about_container app_container'>
    <h1>About Us</h1>
<div  className='scrolled_content'>
<p>
Welcome to <strong  className="strong">[Market-Shops Vercel App]</strong> – your go-to destination for discovering, enjoying, and interacting with high-quality content effortlessly.
</p>

<p>
We are a team of passionate creators, developers, and tech enthusiasts who believe in making content more accessible and enjoyable for everyone. Whether you're here to explore a wide variety of visually stunning images, listen to blog posts on the go, or enhance your own digital creations using our free tools – we've got you covered.
</p>

<h2>What We Offer</h2>
<ul>
  <li><strong className="strong">Listen to Blogs:</strong> Say goodbye to screen fatigue. You can now enjoy your favorite blog posts in audio format – hands-free, anytime, anywhere.</li>
  <li><strong className="strong">Image Gallery:</strong> Browse thousands of updated, high-resolution images categorized by niche and style.</li>
  <li><strong className="strong">Free Tools:</strong> From text styling to markdown conversion and caption creators, our free tools are designed to boost your productivity and creativity.</li>
</ul>

<h2>Our Mission</h2>
<p>
Our mission is to simplify the way people consume and create content. We believe that information should be available in multiple formats — whether it’s visual, textual, or auditory — so that it fits into your lifestyle.
</p>

<h2>Why Choose Us?</h2>
<ul>
  <li>100% free to use</li>
  <li>No account required</li>
  <li>Fast, responsive, and user-friendly</li>
  <li>Constantly updated with new features and content</li>
</ul>

<h2>Let’s Connect</h2>
<p>
Have feedback, questions, or just want to say hello? Head over to our <a href="/contact">Contact Us</a> page or drop us a message on WhatsApp!
</p>

<p>
Thank you for being a part of our growing community. We’re excited to have you here!
</p>

<p> Powered By<strong className='strong'> — [Vercel] Team</strong></p>
</div>
    </div>
   </>
  )
}

export default About