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
    <div className="container mt-ps90 about_container app_container">
      <h1 style={{ textAlign: 'center' }}>Contact Us</h1>
      <p style={{ textAlign: 'center' }}>
        If you have any questions, feedback, or business inquiries, feel free to reach out to us.
      </p>

      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', marginTop: '1rem' }}>
        {/* Email Card */}
        <div  className="contact_cards" style={cardStyle}>
          <h3 className="h3">Email</h3>
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Gmail_icon_%282020%29.svg/330px-Gmail_icon_%282020%29.svg.png"
              alt="Gmail"
              style={{ width: '50px', height: '50px', objectFit: "contain" , marginBottom: '10px' }}
            />
          <p>
            <a href="mailto:amitgarg0534@gmail.com">vercelteam@gmail.com</a>
          </p>
        </div>

        {/* WhatsApp Card */}
        <div className="contact_cards" style={cardStyle}>
          <h3 className="h3">WhatsApp</h3>
          <a
            href="https://wa.me/+918826483821?text=Hyy, i have some enquiry" // Replace with your real number
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
              alt="WhatsApp"
              style={{ width: '50px', height: '50px', marginBottom: '10px' }}
            />
          </a>
          <p>Chat with us on WhatsApp</p>
        </div>

        {/* Location Card */}
        <div className="contact_cards" style={cardStyle}>
          <h3 className="h3">Location</h3>
          <p>Market Shops Vercel, India</p>
          <p>(Online-based Platform)</p>
        </div>

        {/* Business Hours Card */}
        <div className="contact_cards" style={cardStyle}>
          <h3 className="h3">Business Hours</h3>
          <p>Available On WhatsApp</p>
          <p>at 24X7</p>
        </div>
      </div>
    </div>
  );
};

export default Contact;
