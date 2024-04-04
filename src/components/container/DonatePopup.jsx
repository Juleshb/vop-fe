import React, { useState } from "react";
import { Icon } from '@iconify/react';
import DonateForm from "./DonateForm"; // Import your DonateForm component

const DonatePopup = () => {
  const [showPopup, setShowPopup] = useState(false);

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  return (
    <div>
        <p className="mb-4 text-sm leading-7 text-gray">
              Your support can change lives! With your generous donation, we can continue our mission. Every contribution, no matter how small, helps us make a positive impact in the lives. Together, we can make a difference!
            </p>
            <div className="flex items-center justify-center">
      <button
        className="mt-4 px-4 py-3 bg-white text-Teal rounded-lg hover:bg-Teal hover:text-white border border-Teal focus:outline-none focus:ring focus:ring-Teal focus:ring-opacity-50 items-center flex"
        onClick={togglePopup} // Toggle the popup when button is clicked
      >
        <Icon icon="iconoir:hand-cash" /> DONATE
      </button>
      </div>
      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center ">
          <div className="bg-white p-6 rounded-lg shadow-xl border-dotted border-2 border-Teal ">
          

            <h2 className="text-3xl font-bold mb-8 relative">
              <button
                className="absolute top-0 right-0  bg-white text-close rounded-lg hover:bg-Teal hover:text-white focus:outline-none focus:ring focus:ring-Teal focus:ring-opacity-50 "
                onClick={closePopup}
              >
                <Icon icon="material-symbols:close" />
              </button>
              
            </h2>
            <h2 className="text-2xl font-bold mb-4  ">Donate to our ministry</h2>
           
            <DonateForm />
            
          </div>
        </div>
      )}


    </div>
  );
};

export default DonatePopup;
