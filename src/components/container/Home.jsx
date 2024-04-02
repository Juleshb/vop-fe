import React from "react";
// import hero from "../../assets/hero.png";
// import { logos } from "../../Data";
// import { motion } from "framer-motion";
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
    <div className="section" id="home">
      <div className="md:flex items-center justify-center">
        
       
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
        <div className="md:w-[60%]">
      
      <SlideShow />
  
        </div>
      </div>
 
    </div>
  );
};

export default Home;
