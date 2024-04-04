import React, { useState } from "react";
import { Icon } from '@iconify/react';

const DonateForm = ({ addToCart }) => {
  const [donationAmount, setDonationAmount] = useState("");

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
            type="number" // Use type "number" for donation amount input
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
  );
};

export default DonateForm;
