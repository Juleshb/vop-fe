import React from "react";
import { categories } from "../../../Data";
import { courses } from "../../../Data";
import Categories from "./Categories";
import Course from "./Course";
import { motion } from "framer-motion";

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
    <div className="section" id="courses">
      <div className="text-center">
        <div className="sm:text-3xl text-2xl font-bold mb-5">
          Top <span className="text-Teal">Projects</span> 
        </div>
        <p className="text-sm text-gray leading-7 max-w-[700px] mx-auto">
        I'm excited to introduce a range of services that can empower your business to reach new
         heights. With a passion for innovation and a commitment to delivering results, I offer
          a suite of solutions designed to address your unique needs and challenges.

          <br />
          Running a successful business comes with its share of challenges, from establishing 
          a strong online presence to optimizing internal processes for efficiency. My services are
           meticulously crafted to help you navigate these challenges and harness untapped potential.
        </p>
      </div>
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="visible"
        className="grid md:grid-cols-4 sm:grid-cols-2 mt-12 gap-8"
      >
        {categories.map((category) => {
          return <Categories key={category.id} {...category} />;
        })}
      </motion.div>
      <br />
      <br />
      <div className=" text-center sm:text-3xl text-2xl font-bold mb-5 ">Most popular <span className="text-Teal">project I worked on</span></div>
      <div className="mt-12 overflow-x-hidden w-full  relative">
        <div className="flex gap-8 md:w-full sm:w-[170%] xs:w-[340%] w-[480%] animate-slide">
          {courses.map((course) => {
            return <Course key={course.id} {...course} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default Courses;
