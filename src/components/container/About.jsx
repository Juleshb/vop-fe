import React from "react";
import about from "../../assets/About.jpg";

const About = () => {
  return (
    <div className="section" id="about">
      <div className="grid md:grid-cols-2 gap-8 place-items-center">
        <div className="border-[3px] border-solid border-Teal rounded-lg">
          <img src={about} alt="" className="p-4" />
        </div>
        <div>
          <div className="font-bold sm:text-[1.875rem] text-[1.5rem] mb-5">
          I like<br />To {" "}
            <span className="text-Teal">Collaborate</span>
          </div>
          <p className="text-sm text-gray leading-7 mb-4">
          I'm passionate about the power of teamwork to drive innovation and success. 
          As a Software developer with a strong collaborative mindset, I believe that the synergy 
          created when individuals with diverse skills come together is unparalleled.<br />
          I'm excited to bring my collaborative spirit to your projects. If you're looking for a team player who is motivated by collective success and who can contribute valuable skills, let's connect. Together, we can turn ideas into impactful realities.
          </p>
          <button className="py-3 px-6 text-sm border border-solid border-gray rounded-lg font-bold">
          Let's Collaborate
          </button>
        </div>
      </div>
    </div>
  );
};

export default About;
