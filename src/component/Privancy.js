import React from 'react'
import "./About.css"

const Privancy = () => {
  return (
   <>
    <div className="container privacy-policy mt-74 about_container app_container" >
      <h1>Privacy Policy</h1>
      <p><strong className="strong">Effective Date:</strong> [Insert Date]</p>
      <p><strong className="strong">Website:</strong> <a href="https://market-shops.vercel.app" target="_blank" rel="noopener noreferrer">https://market-shops.vercel.app</a></p>

      <p>At <strong className="strong">Market Shops</strong>, we respect your privacy and are committed to protecting your personal information. This Privacy Policy outlines how we collect, use, and protect your data when you use our website and services.</p>

      <h2>1. Information We Collect</h2>
      <ul>
        <li><strong className="strong">Personal Information:</strong> When you sign up or interact with features like the cart or authentication system, we may collect your name, email address, and other necessary details.</li>
        <li><strong className="strong">Usage Data:</strong> We collect non-identifiable information such as browser type, pages visited, and time spent on the website.</li>
        <li><strong className="strong">Cookies:</strong> We use cookies to enhance user experience, such as keeping items in your cart or remembering login sessions.</li>
      </ul>

      <h2>2. How We Use Your Information</h2>
      <ul>
        <li>Provide and improve our e-commerce and blog services</li>
        <li>Authenticate and secure user accounts</li>
        <li>Offer personalized content and product suggestions</li>
        <li>Improve website functionality and user experience</li>
        <li>Monitor site performance and prevent abuse</li>
      </ul>

      <h2>3. Listening Feature for Blogs</h2>
      <p>Our website includes a <strong className="strong">desktop-only text-to-speech feature</strong> that allows users to listen to blog posts. This feature processes text locally in your browser and does not store or transmit the content externally.</p>

      {/* <h2>4. Third-Party Services</h2>
      <p>We may use third-party services such as:</p>
      <ul>
        <li><strong className="strong">Vercel</strong> – for site hosting</li>
        <li><strong className="strong">Analytics tools</strong> – to understand site usage</li>
        <li><strong className="strong">Authentication providers</strong> (e.g., Firebase) – if used for login/signup</li>
        <li><strong className="strong">Payment processors</strong> – if purchases are enabled in future</li>
      </ul>
      <p>Each third-party provider has its own privacy policy governing the data they collect.</p> */}

      <h2>5. Data Security</h2>
      <p>We use industry-standard measures to protect your information, including secure protocols (HTTPS) and encrypted authentication methods.</p>

      <h2>6. Your Rights</h2>
      <p>You have the right to:</p>
      <ul>
        <li>Access, correct, or delete your personal data</li>
        <li>Withdraw consent for data processing</li>
        <li>Request data portability where applicable</li>
      </ul>
      <p>To exercise your rights, contact us at <a href="mailto:your-email@example.com">your-email@example.com</a>.</p>

      <h2>7. Changes to This Policy</h2>
      <p>We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated "Effective Date."</p>

      <h2>8. Contact Us</h2>
      <p>If you have any questions about this Privacy Policy, please contact us:</p>
      <p>Email: <a href="mailto:your-email@example.com">your-email@example.com</a></p>
      <p>Website: <a href="https://market-shops.vercel.app" target="_blank" rel="noopener noreferrer">https://market-shops.vercel.app</a></p>
    </div>
   </>
  )
}

export default Privancy