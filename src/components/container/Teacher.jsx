import React from "react";
import { accordions } from "../../Data";
import Accordion from "./Accordion";
const Teacher = () => {
  return (
    <div className="section" id="teacher">
      <div className="text-center my-8 font-bold sm:text-[1.875rem] text-[1.5rem]">Rehearsal 
       <span className="text-Teal">Hours</span>
      </div>
      <div className="mt-12 max-w-[700px] mx-auto text-Teal border border-solid rounded-lg border-Teal p-4">
        {accordions.map((accordion) => {
          return <Accordion key={accordion.id} {...accordion} />;
        })}
      </div>
    </div>
  );
};

export default Teacher;
