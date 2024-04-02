import React from "react";
import { motion } from "framer-motion";
const Contact = () => {
  return (
    <div className="section" id="contact">
      <div className=" text-center sm:text-3xl text-2xl font-bold m-7 ">Contact <span className="text-Teal">Us</span></div>
      <div className="grid md:grid-cols-2 gap-8 place-items-center">
        
      
       

        {/* Company Location */}
        <div className="px-8 py-6 ml-4 flex-1">
          <h2 className="text-2xl font-semibold mb-6">Our Location</h2>
          <p className="text-gray-700 text-sm font-bold mb-2">Address:</p>
          <p className="text-gray-700 mb-4">123 Main Street, Cityville</p>
          <p className="text-gray-700 text-sm font-bold mb-2">Phone:</p>
          <p className="text-gray-700 mb-4">123-456-7890</p>
          <p className="text-gray-700 text-sm font-bold mb-2">Email:</p>
          <p className="text-gray-700">info@example.com</p>
        </div>
        <div className="px-8 py-6 mr-4 flex-1">
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Your Name"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Your Email"
            />
          </div>
          <div className="mb-6">
            <label htmlFor="message" className="block text-gray-700 text-sm font-bold mb-2">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              rows="5"
              placeholder="Your Message"
            />
          </div>
          <div className="flex items-center justify-center">
            <button
              className="bg-Teal hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
            >
              Send message
            </button>
          </div>
        </div>
   
       
      </div>
    </div>
  );
};

export default Contact;
