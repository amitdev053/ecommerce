import React from 'react';
import "./Contact.css"; // You can add styling tweaks here

const Contact = () => {
  const cardStyle = {
    flex: '1 1 200px',
    background: '#fff',
    padding: '1.5rem',
    borderRadius: '12px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.06)',
    margin: '1rem',
    textAlign: 'center',
  };

  return (
    <div className="container mt-74 about_container app_container">
      <h1 style={{ textAlign: 'center' }}>Contact Us</h1>
      <p style={{ textAlign: 'center' }}>
        If you have any questions, feedback, or business inquiries, feel free to reach out to us.
      </p>

      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', marginTop: '2rem' }}>
        {/* Email Card */}
        <div style={cardStyle}>
          <h3>Email</h3>
          <p>
            <a href="mailto:your-email@example.com">your-email@example.com</a>
          </p>
        </div>

        {/* WhatsApp Card */}
        <div style={cardStyle}>
          <h3>WhatsApp</h3>
          <a
            href="https://wa.me/1234567890" // Replace with your real number
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
              alt="WhatsApp"
              style={{ width: '50px', height: '50px', marginBottom: '0.5rem' }}
            />
          </a>
          <p>Chat with us on WhatsApp</p>
        </div>

        {/* Location Card */}
        <div style={cardStyle}>
          <h3>Location</h3>
          <p>Market Shops Vercel, India</p>
          <p>(Online-based Platform)</p>
        </div>

        {/* Business Hours Card */}
        <div style={cardStyle}>
          <h3>Business Hours</h3>
          <p>Mon – Fri: 9 AM – 6 PM IST</p>
          <p>Sat: 10 AM – 2 PM IST</p>
        </div>
      </div>
    </div>
  );
};

export default Contact;
