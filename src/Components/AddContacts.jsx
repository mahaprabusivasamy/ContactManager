// import React from 'react';
// import './AddContacts.css';

// export default function AddContacts({ onClose }) {
//   return (
//     <div className="main">
//       <button className="close-button" onClick={onClose}>×</button>
//       <h1>Register New Contact</h1>
//       <div className="contact-form">
//         <form action="">
//           <div className="field">
//             <label htmlFor="name">Name *</label>
//             <input type="text" id="name" required />
//           </div>
//           <div className="field">
//             <label htmlFor="phone">Phone *</label>
//             <div className="phone-input">
//               <select id="country-code" name="country-code">
//                 <option value="+1">+1</option>
//                 <option value="+44">+44</option>
//               </select>
//               <input type="number" id="phone" required />
//             </div>
//           </div>
//           <div className="field">
//             <label htmlFor="email">Email</label>
//             <input type="email" id="email" />
//           </div>
//           <div className="field">
//             <label htmlFor="address">Address</label>
//             <input type="text" id="address" />
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }
import React, { useState } from 'react';
import './AddContacts.css';

export default function AddContacts({ onClose }) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    countryCode: '+91',
    email: '',
    address: ''
  });

  const [submitStatus, setSubmitStatus] = useState(null); // State to track submission status

  const handleChange = (event) => {
    const { id, value } = event.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent default form submission

    // Assuming you are using fetch API to POST data
    fetch('http://localhost:8001/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then(response => response.json())
      .then(data => {
        console.log('Success:', data);
        // Set submission status to 'success'
        setSubmitStatus('success');
        // Optionally, you can perform actions after successful submission
        // For example, closing the modal or displaying a success message
        onClose(); // Close the modal after successful submission
      })
      .catch((error) => {
        console.error('Error:', error);
        // Handle errors if any
        // Optionally, you can display an error message or handle it accordingly
        setSubmitStatus('error'); // Set submission status to 'error' on failure
      });
  };

  return (
    <div className="main">
      <button className="close-button" onClick={onClose}>×</button>
      <h1>Register New Contact</h1>
      <div className="contact-form">
        <form onSubmit={handleSubmit}>
          <div className="field">
            <label htmlFor="name">Name *</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="field">
            <label htmlFor="phone">Phone *</label>
            <div className="phone-input">
              <select
                id="countryCode"
                name="countryCode"
                value={formData.countryCode}
                onChange={handleChange}
              >
                <option value="+91">+1</option>
                <option value="+44">+44</option>
              </select>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="field">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div className="field">
            <label htmlFor="address">Address</label>
            <input
              type="text"
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
            />
          </div>
          <button className="sub" type="submit">Submit</button>
          {/* Conditional alert message */}
          {submitStatus === 'success' && (
            <div className="success-message">
              Successfully registered contact!
            </div>
          )}
          {submitStatus === 'error' && (
            <div className="error-message">
              Registration failed. Please try again.
            </div>
          )}
        </form>
      </div>
    </div>
  );
}

