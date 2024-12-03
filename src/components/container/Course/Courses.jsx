import React from "react";
import EventCard from './ EventCard'
import MusicCard from './MusicCard';
import album1 from '../../../assets/Ntwari.jpg'

const Courses = () => {
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
        staggerChildren: 0.2,
      },
    },
  };

  return (
    <div className="section" id="Store">
      <div className="text-center">
        <div className="sm:text-3xl text-2xl font-bold mb-5">
          Our <span className="text-Teal">Albums</span> 
        </div>
        <p className="text-sm text-gray leading-7 max-w-[700px] mx-auto">
       
        </p>
      </div>
      <MusicCard />
      <div className="flex flex-wrap justify-center">
      
       
     
    </div>
  
      <br />
      <br />
      <div className=" text-center sm:text-3xl text-2xl font-bold m-7 " id="Event">Upcoming <span className="text-Teal">Events</span></div>
      <div className="mt-12 overflow-x-hidden w-full  relative">
        <div className="flex gap-8 md:w-full sm:w-[170%] xs:w-[340%] w-[480%] animate-slide">
         


        </div>
        
   
    <EventCard  />
    
      </div>
    </div>
  );
};

export default Courses;
