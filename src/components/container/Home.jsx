import React from "react";
// import hero from "../../assets/hero.png";
// import { logos } from "../../Data";
// import { motion } from "framer-motion";
import DonatePopup from './DonatePopup';
import { Icon } from '@iconify/react';
import SlideShow from './SlideShow';
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


  

  return (
    <div className="section  my-12" id="home">
      <div className="md:flex items-center justify-center">
        
      <div className="md:w-[60%]">
      
      <SlideShow />
  
        </div>
        <div>
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
        </div>
       
      </div>
      <hr className="my-6 border-t border-Teal " />

      <div>
        
        

       
        {/* <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          className="flex items-center justify-center flex-wrap gap-8 p-2"
        >
          {logos.map((logo, index) => (
            <motion.div variants={item} className="w-28" key={index}>
              <img src={logo} alt="" className="w-full object-cover" />
            </motion.div>
          ))}
        </motion.div> */}
      </div>

      {/* <hr className="my-6 border-t border-Teal " /> */}
      <div className="text-center  items-center justify-center place-items-center">
      <div className="text-xl items-center flex flex-wrap justify-center w-full h-auto space-x-4 ">
      <DonatePopup />
      </div>
    </div>
    <hr className="my-6 border-t border-Teal " />
    </div>

    
  );
};

export default Home;
