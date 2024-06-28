// import React, { useState } from 'react';
// import AddContacts from './AddContacts';
// import ModifyContacts from './ModifyContacts';
// import Image from "../assets/contact_default_icon.png"
// import './MainPage.css';

// export default function MainPage() {
//   const [showForm, setShowForm] = useState(false);
//   const [selectedContact, setSelectedContact] = useState(null);
//   const [contacts, setContacts] = useState([
//     {
//       id: 1,
//       name: 'John Doe',
//       phone: '+1 123 456 7890',
//       email: 'john.doe@example.com',
//       address: '123 Main St, Anytown, USA',
//       image: 'path/to/user/image.jpg'
//     },
//     {
//         id: 2,
//         name: 'John Doe',
//         phone: '+1 123 456 7890',
//         email: 'john.doe@example.com',
//         address: '123 Main St, Anytown, USA',
//         image: 'path/to/user/image.jpg'
//       },
//       {
//         id: 3,
//         name: 'John Doe',
//         phone: '+1 123 456 7890',
//         email: 'john.doe@example.com',
//         address: '123 Main St, Anytown, USA',
//         image: 'path/to/user/image.jpg'
//       },
//     // Add more initial contacts if needed
//   ]);

//   const handleCreateContact = () => {
//     setSelectedContact(null);
//     setShowForm(true);
//   };

//   const handleCloseForm = () => {
//     setShowForm(false);
//   };

//   const handleEditContact = (contact) => {
//     setSelectedContact(contact);
//     setShowForm(true);
//   };

//   return (
//     <div className="main-page">
//       <h1>Name</h1>
//       <button className="create-contact-button" onClick={handleCreateContact}>
//         Create Contact
//       </button>
//       {showForm && (
//         <div className="form-overlay">
//           <div className="form-wrapper">
//             {selectedContact ? (
//               <ModifyContacts 
//                 contact={selectedContact} 
//                 onClose={handleCloseForm}
//               />
//             ) : (
//               <AddContacts onClose={handleCloseForm} />
//             )}
//           </div>
//         </div>
//       )}
//       <div className={`contact-container ${showForm ? 'blur' : ''}`}>
//         {contacts.map((contact) => (
//           <div key={contact.id} className="contact-card">
//             <button className="edit-button" onClick={() => handleEditContact(contact)}>✎</button>
//             <div className="image-placeholder">
//               <img src={Image} alt={contact.name} />
//             </div>
//             <div className="contact-info">
//               <p><strong>Name:</strong> {contact.name}</p>
//               <p className="highlight"><strong>Phone:</strong> {contact.phone}</p>
//               <p><strong>Email:</strong> {contact.email}</p>
//               <p><strong>Address:</strong> {contact.address}</p>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }
import React, { useState, useEffect } from 'react';
import AddContacts from './AddContacts';
import ModifyContacts from './ModifyContacts';
import Image from "../assets/contact_default_icon.png";
import './MainPage.css';

export default function MainPage() {
  const [showForm, setShowForm] = useState(false);
  const [selectedContact, setSelectedContact] = useState(null);
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    // Function to fetch contacts from the API
    const fetchContacts = async () => {
      try {
        const response = await fetch('http://localhost:8001/get');
        if (!response.ok) {
          throw new Error('Failed to fetch contacts');
        }
        const data = await response.json();
        setContacts(data); // Update state with fetched contacts
      } catch (error) {
        console.error('Error fetching contacts:', error);
        // Handle error as needed, e.g., show an error message
      }
    };

    // Call the fetchContacts function when the component mounts
    fetchContacts();
  }, []); // Empty dependency array ensures this effect runs only once

  const handleCreateContact = () => {
    setSelectedContact(null);
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
  };

  const handleEditContact = (contact) => {
    setSelectedContact(contact);
    setShowForm(true);
  };

  return (
    <div className="main-page">
      <h1>Name</h1>
      <button className="create-contact-button" onClick={handleCreateContact}>
        Create Contact
      </button>
      {showForm && (
        <div className="form-overlay">
          <div className="form-wrapper">
            {selectedContact ? (
              <ModifyContacts 
                contact={selectedContact} 
                onClose={handleCloseForm}
              />
            ) : (
              <AddContacts onClose={handleCloseForm} />
            )}
          </div>
        </div>
      )}
      <div className={`contact-container ${showForm ? 'blur' : ''}`}>
        {contacts.map((contact) => (
          <div key={contact.id} className="contact-card">
            <button className="edit-button" onClick={() => handleEditContact(contact)}>✎</button>
            <div className="image-placeholder">
              <img src={Image} alt={contact.name} />
            </div>
            <div className="contact-info">
              <p><strong>Name:</strong> {contact.name}</p>
              <p className="highlight"><strong>Phone:</strong> {contact.phone}</p>
              <p><strong>Email:</strong> {contact.email}</p>
              <p><strong>Address:</strong> {contact.address}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
