import React, { useState } from "react";

const CheckoutCard = ({ title, price, description }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");

  const handleCheckout = () => {
    // Perform checkout logic here using the collected information
    console.log("Client Information:", { name, email, address, phone });
    // You can then proceed with the checkout process
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 w-80 mx-auto mb-4">
      <h2 className="text-2xl font-bold mb-4">{title}</h2>
      <p className="text-gray-600 mb-4">{description}</p>
      <div className="mb-4">
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
          Name
        </label>
        <input
          type="text"
          id="name"
          className="mt-1 p-2 border border-gray-300 rounded-md w-full"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
          Email
        </label>
        <input
          type="email"
          id="email"
          className="mt-1 p-2 border border-gray-300 rounded-md w-full"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <label htmlFor="address" className="block text-sm font-medium text-gray-700">
          Address
        </label>
        <input
          type="text"
          id="address"
          className="mt-1 p-2 border border-gray-300 rounded-md w-full"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
          Phone
        </label>
        <input
          type="tel"
          id="phone"
          className="mt-1 p-2 border border-gray-300 rounded-md w-full"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
      </div>
      <button 
        className="block w-full py-3 px-4 bg-teal-600 text-white rounded-md hover:bg-teal-700 focus:outline-none focus:bg-teal-700 transition duration-300"
        onClick={handleCheckout}
      >
        Proceed to Checkout
      </button>
    </div>
  );
};

export default CheckoutCard;
