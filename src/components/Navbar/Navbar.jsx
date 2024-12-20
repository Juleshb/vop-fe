import React, { useEffect, useState } from "react";
import { navLinks } from "../../Data";
import { HiMenuAlt1, HiX } from "react-icons/hi";
import MobileNavLinks from "./MobileNavLinks";
import NavLink from "./NavLink";
import { motion } from "framer-motion";
import { Icon } from '@iconify/react';
import Logo from '../../assets/logo.png'
// import CheckoutCard from "../container/CheckoutCard";

const Navbar = ({ cartItems, updateCartItem, removeCartItem }) => {

  const [toggle, setToggle] = useState(false);
  const [active, setActive] = useState(null);
  useEffect(() => {
    const scrollActive = () => {
      setActive(window.scrollY > 20);
    };
    window.addEventListener("scroll", scrollActive);
    return () => window.removeEventListener("scroll", scrollActive);
  }, [active]);


  const [showPopover, setShowPopover] = useState(false);

  const togglePopover = () => {
    setShowPopover(!showPopover);
  };

  const getTotalAmount = () => {
    return cartItems.reduce((total, item) => total + (item.quantity * item.price), 0);
  };

  return (
    <div
      className={`${
        active ? "shadow-lg bg-white p-4" : ""
      } fixed w-full text-Teal top-0 left-0 z-20`}
    >
      <div>
        <div
          className={`${
            active ? "py-2 transition-all duration-300" : "py-4"
          } container  mx-auto flex items-center justify-between px-2`}
        >
          <div className="flex items-center">
            <HiMenuAlt1
              className="text-3xl sm:hidden cursor-pointer"
              onClick={() => setToggle(true)}
            />
            <div className="text-xl text-Teal uppercase flex tracking-wide font-bold">
            <img
    src={Logo}
    className="w-10 h-10 sm:w-24 sm:h-24 md:w-32 md:h-15 lg:w-20 lg:h-20 object-contain"
    alt="Logo"
  />
            </div>
          </div>
          <div className="sm:flex items-center hidden">
            {navLinks.map((navLink) => {
              return <NavLink key={navLink.id} {...navLink} />;
            })}
          </div>

<div className="relative">
      <button
        className="flex items-center text-Teal justify-center relative"
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
            <div>
            <ul className="divide-y divide-gray-200">
                {cartItems.map((item) => (
                  <li key={item.id} className="p-4">
                    <p className="text-sm font-medium">{item.name}</p>
                    <div className="flex items-center justify-between">
                      <p className="text-sm text-gray-600">{item.quantity} x {item.price}</p>
                      <div className="text-xl">
                        <button onClick={() => updateCartItem(item.id, item.quantity + 1)} className="text-teal-500">+</button>
                        <button onClick={() => updateCartItem(item.id, item.quantity - 1)} className="text-teal-500 m-4">-</button>
                        <button onClick={() => removeCartItem(item.id)} className="text-red-500"><Icon icon="fluent:delete-24-regular" /></button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
              <div className="px-4 py-2 bg-gray-100">
                <p className="text-sm font-medium">Total Amount:</p>
                <p className="text-lg font-bold text-teal-500">{getTotalAmount()} Fr</p>
              </div>
            <button 
            className="block w-full py-3 px-4 bg-teal-600 text-white rounded-md hover:bg-teal-700 focus:outline-none focus:bg-teal-700 transition duration-300"
           
          >
            Proceed to Checkout
          </button>
          </div>
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


    </div>
  );
};

export default Navbar;
