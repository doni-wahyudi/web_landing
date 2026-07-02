import React from 'react';
import './ClientLogos.css';

const ClientLogos = () => {
  const clients = [
    "TanyaAdvokat.id",
    "Bimbel Junior",
    "Intan Miracle",
    "Auro Barbers",
    "Putra Karya Pallet",
    "GlowMart",
    "KlinikSehat",
    "RentalKu",
    "Sweet Delights Bakery",
    "EO Arjuna Event"
  ];

  // Double the list to create a seamless infinite loop
  const marqueeList = [...clients, ...clients];

  return (
    <div className="client-logos-section">
      <div className="container">
        <div className="client-logos-marquee">
          <div className="client-logos-track">
            {marqueeList.map((client, index) => (
              <div key={index} className="client-logo-item">
                <span className="client-logo-text">{client}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientLogos;
