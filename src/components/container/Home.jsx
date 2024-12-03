
import DonatePopup from './DonatePopup';
import { Icon } from '@iconify/react';
// import SlideShow from './SlideShow';
import Navbar from "../Navbar/Navbar";
import React, { useState } from "react";
import HeroSectionWithSlideshow from './HeroSection';
const Home = () => {
  const container = {
    hidden: {
      opacity: 0,
      scale: 0,
    },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.1,
      },
    },
  };
  const item = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };


  const [cartItems, setCartItems] = useState([]);

  const addToCart = (item) => {
    setCartItems([...cartItems, item]);
  };

  const updateCartItem = (itemId, newQuantity) => {
    const updatedItems = cartItems.map((item) => {
      if (item.id === itemId) {
        return { ...item, quantity: newQuantity };
      }
      return item;
    });
    setCartItems(updatedItems);
  };

  const removeCartItem = (itemId) => {
    const updatedItems = cartItems.filter((item) => item.id !== itemId);
    setCartItems(updatedItems);
  };
  return (
    <div className="font-Poppins bg-white"  id="home">
      <Navbar cartItems={cartItems}
      updateCartItem={updateCartItem} 
      removeCartItem={removeCartItem} />
      <HeroSectionWithSlideshow />
    <div className="section">
      <div className="md:flex items-center justify-center">
        
      {/* <div className="md:w-[60%]">
      
      <SlideShow />
  
        </div> */}
        {/* <div>
          <div className="font-bold text-xs text-Teal ">
          <p className="text-sm leading-7 text-gray max-w-sm">
          New singers family
          </p>
          </div>

          
          <div className="sm:text-[2.5rem] text-[1.825rem] font-bold">
            FOLLOWING JESUS <br /> WHERE WE ARE<br /> 
          </div>
          <p className="text-sm leading-7 text-gray max-w-sm">
         Sing to Him, sing praises to Him! tell of all his wondrous worked Glory in his holly name.
          </p>
          <div className="mt-6">
            <button className="px-6 py-3 font-bold text-white bg-Teal rounded-lg mr-4 text-sm">
              Be part of us
            </button>
            <button className="px-6 py-3 font-bold border border-solid border-gray rounded-lg text-sm">
              Read more
            </button>
          </div>
        </div> */}
       
      </div>
      <hr className="my-6 border-t border-Teal " />

      <div>
        
      </div>

      <div className="text-center  items-center justify-center place-items-center">
      <div className="text-xl items-center flex flex-wrap justify-center w-full h-auto space-x-4 ">
      <DonatePopup addToCart={addToCart}/>
      </div>
    </div>
    <hr className="my-6 border-t border-Teal " />
    </div>
    </div>

    
  );
};

export default Home;
