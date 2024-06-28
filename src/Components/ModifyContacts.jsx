import React, { useState, useEffect } from 'react';

export default function ModifyContacts({ contact, onClose }) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');

  useEffect(() => {
    if (contact) {
      setName(contact.name);
      setPhone(contact.phone);
      setEmail(contact.email);
      setAddress(contact.address);
    }
  }, [contact]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({
      name,
      phone,
      email,
      address,
    });
    onClose();
  };

  return (
    <div className="main">
      <h1>Modify Contact</h1>
      <div className="contact-form">
        <form onSubmit={handleSubmit}>
          <div className="value">
            <label htmlFor="name">Name</label>
            <input 
              type="text" 
              id="name" 
              value={name} 
              onChange={(e) => setName(e.target.value)} 
              required 
            />
          </div>
          <div className="value">
            <label htmlFor="phone">Phone</label>
            <input 
              type="text" 
              id="phone" 
              value={phone} 
              onChange={(e) => setPhone(e.target.value)} 
              required 
            />
          </div>
          <div className="value">
            <label htmlFor="email">Email</label>
            <input 
              type="email" 
              id="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
            />
          </div>
          <div className="value">
            <label htmlFor="address">Address</label>
            <input 
              type="text" 
              id="address" 
              value={address} 
              onChange={(e) => setAddress(e.target.value)} 
            />
          </div>
          <button type="submit">Submit</button>
          <button type="button" onClick={onClose}>Close</button>
        </form>
      </div>
    </div>
  );
}
