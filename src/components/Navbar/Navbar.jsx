import React, { useEffect, useState } from "react";
import { navLinks } from "../../Data";
import { HiMenuAlt1, HiX } from "react-icons/hi";
import MobileNavLinks from "./MobileNavLinks";
import NavLink from "./NavLink";
import { motion } from "framer-motion";
import { Icon } from '@iconify/react';
// import CheckoutCard from "../container/CheckoutCard";

const Navbar = ({ cartItems }) => {

  const [toggle, setToggle] = useState(false);
  const [active, setActive] = useState(null);
  useEffect(() => {
    const scrollActive = () => {
      setActive(window.scrollY > 20);
    };
    window.addEventListener("scroll", scrollActive);
    return () => window.removeEventListener("scroll", scrollActive);
  }, [active]);

  // const [showPopup, setShowPopup] = useState(false);

  // const togglePopup = () => {
  //   setShowPopup(!showPopup);
  // };

  // const closePopup = () => {
  //   setShowPopup(false);
  // };
  

  const [showPopover, setShowPopover] = useState(false);

  const togglePopover = () => {
    setShowPopover(!showPopover);
  };

  return (
    <div
      className={`${
        active ? "shadow-lg bg-white p-4" : ""
      } fixed w-full top-0 left-0 z-20`}
    >
      <div>
        <div
          className={`${
            active ? "py-2 transition-all duration-300" : "py-4"
          } container  mx-auto flex items-center justify-between px-2`}
        >
          <div className="flex items-center gap-4">
            <HiMenuAlt1
              className="text-3xl sm:hidden cursor-pointer"
              onClick={() => setToggle(true)}
            />
            <div className="text-xl text-Teal uppercase flex tracking-wide font-bold">
            <Icon icon="bxs:book-add" /> <span className="text-black">New Singers</span>
            </div>
          </div>
          <div className="sm:flex items-center hidden">
            {navLinks.map((navLink) => {
              return <NavLink key={navLink.id} {...navLink} />;
            })}
          </div>
          {/* <button  onClick={togglePopup} className="font-bold text-Teal text-3xl border border-solid rounded-lg border-Teal">
          <Icon icon="ic:outline-shopify" />  {cartItemCount}
          </button> */}


<div className="relative">
      <button
        className="flex items-center justify-center relative"
        onClick={togglePopover}
      >
        <Icon icon="ph:shopping-cart-bold" className="text-3xl" />
        {cartItems.length > 0 && (
          <span className="absolute top-0 right-0 bg-red-500 text-white rounded-full px-2 py-1 text-xs">{cartItems.length}</span>
        )}
      </button>
      {showPopover && (
        <div className="absolute top-full right-0 mt-2 w-60 bg-white shadow-lg rounded-lg">
          {cartItems.length === 0 ? (
            <p className="p-4 text-sm text-gray-600">Your cart is empty</p>
          ) : (
            <ul className="divide-y divide-gray-200">
              {cartItems.map((item) => (
                <li key={item.id} className="p-4">
                  <p className="text-sm font-medium">{item.name}</p>
                  <p className="text-sm text-gray-600">{item.quantity} x {item.price}</p>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>

          {toggle && (
            <motion.div
              initial={{ x: -500, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="fixed h-full w-96 top-0 left-0 z-20 bg-Teal text-white flex flex-col justify-center items-center shadow-lg gap-8 py-8"
            >
              {navLinks.map((navLink) => {
                return (
                  <MobileNavLinks
                    key={navLink.id}
                    {...navLink}
                    setToggle={setToggle}
                  />
                );
              })}
              <HiX
                className="absolute right-12 top-12 text-3xl cursor-pointer"
                onClick={(prev) => setToggle(!prev)}
              />
            </motion.div>
          )}
        </div>
      </div>


      {/* {showPopup && (
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
           
           
            <CheckoutCard />
            
          </div>
        </div>
      )} */}


    </div>
  );
};

export default Navbar;
