import React from "react";
// import { categories } from "../../../Data";
// import { courses } from "../../../Data";
// import Categories from "./Categories";
// import Course from "./Course";
// import { motion } from "framer-motion";
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

  const albums = [
    {
      title: 'Album Title 1',
      artist: 'Artist 1',
      year: '2023',
      cover: album1,
      tracks: ['Track 1', 'Track 2', 'Track 3']
    }
    
  ];

  const events = [
    {
      title: 'Event 1',
      image: 'event1.jpg',
      date: 'April 10, 2024',
      location: 'Venue 1, City 1',
      description: 'Description of event 1 goes here...'
    },
    {
      title: 'Event 2',
      image: 'event2.jpg',
      date: 'April 15, 2024',
      location: 'Venue 2, City 2',
      description: 'Description of event 2 goes here...'
    },
    // Add more events as needed
  ];

  return (
    <div className="section" id="Store">
      <div className="text-center">
        <div className="sm:text-3xl text-2xl font-bold mb-5">
          Our <span className="text-Teal">Albums</span> 
        </div>
        <p className="text-sm text-gray leading-7 max-w-[700px] mx-auto">
       
        </p>
      </div>
      <div className="flex flex-wrap justify-center">
      {albums.map((album, index) => (
        <MusicCard key={index} album={album} />
      ))}
    </div>
      {/* <motion.div
        variants={container}
        initial="hidden"
        whileInView="visible"
        className="grid md:grid-cols-4 sm:grid-cols-2 mt-12 gap-8"
      >
        {categories.map((category) => {
          return <Categories key={category.id} {...category} />;
        })}
      </motion.div> */}
      <br />
      <br />
      <div className=" text-center sm:text-3xl text-2xl font-bold m-7 " id="Event">Upcoming <span className="text-Teal">Events</span></div>
      <div className="mt-12 overflow-x-hidden w-full  relative">
        <div className="flex gap-8 md:w-full sm:w-[170%] xs:w-[340%] w-[480%] animate-slide">
          {/* {courses.map((course) => {
            return <Course key={course.id} {...course} />;
          })} */}


        </div>

    <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {events.map((event, index) => (
        <EventCard key={index} event={event} />
      ))}
    </div>
      </div>
    </div>
  );
};

export default Courses;
