import React from "react";
import about from "../../assets/vop.jpeg";

const About = () => {
  return (
    <div className="section" id="about">
      <div className="grid md:grid-cols-2 gap-8 place-items-center">
        <div className="border-[3px] border-solid border-Teal rounded-lg">
          <img src={about} alt="" className="p-4" />
        </div>
        <div>
          <div className="font-bold sm:text-[1.875rem] text-[1.5rem] mb-5">
          Welcome to 
            <span className="text-Teal">New Singers </span>
            Family
          </div>
          <p className="text-sm text-gray leading-7 mb-4">
          New,Singers SDA Rwandan Gospel Choir Based at Kigali Bilingual Church. Started in CAG (Collège adventiste de Gitwe) in 1984. We are Glad to have each other.</p>
          <button className="py-3 px-6 text-sm border border-solid border-gray rounded-lg font-bold">
          Be part of us
          </button>
        </div>
      </div>
    </div>
  );
};

export default About;
