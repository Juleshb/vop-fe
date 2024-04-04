import React, { useState } from "react";
import { Icon } from '@iconify/react';

const DonatePopup = ({ addToCart }) => {
  const [showPopup, setShowPopup] = useState(false);
  const [donationAmount, setDonationAmount] = useState("");

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Add donation to cart
    addToCart({
      id: Math.random().toString(36).substr(2, 9), // Generate a unique ID for the donation
      name: "Donation", // Name of the item
      price: parseFloat(donationAmount), // Convert donation amount to float
      quantity: 1, // Quantity of the donation (can be adjusted later if needed)
    });

    // Reset form fields
    setDonationAmount("");
  };

  return (
    <div>
      <p className="mb-4 text-sm leading-7 text-gray">
        Your support can change lives! With your generous donation, we can continue our mission. Every contribution, no matter how small, helps us make a positive impact in the lives. Together, we can make a difference!
      </p>
      <div className="flex items-center justify-center">
        <button
          className="mt-4 px-4 py-3 bg-white text-Teal rounded-lg hover:bg-Teal hover:text-white border border-Teal focus:outline-none focus:ring focus:ring-Teal focus:ring-opacity-50 items-center flex"
          onClick={togglePopup}
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
            <div className="max-w-sm mx-auto  px-8 pt-6 pb-8 mb-4">
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="donationAmount"
                  >
                    Donation amount ( Fr )
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="donationAmount"
                    type="number"
                    placeholder="Enter donation amount"
                    value={donationAmount}
                    onChange={(e) => setDonationAmount(e.target.value)}
                  />
                </div>
                <div className="flex items-center justify-center">
                  <button
                    className="mt-4 px-4 py-3 bg-white text-Teal rounded-lg hover:bg-Teal hover:text-white border border-Teal focus:outline-none focus:ring focus:ring-Teal focus:ring-opacity-50 items-center flex"
                    type="submit"
                  >
                    <Icon icon="ph:shopping-cart-bold" /> ADD TO CART
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DonatePopup;
