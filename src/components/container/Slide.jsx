import React from 'react';
import { Icon } from '@iconify/react';

const Slide = ({ image, text }) => {
  return (
    <div className="flex items-center justify-center m-2 ">
      <div className="max-w-lg mx-auto">
        <div className="border-[3px] border-solid border-Teal rounded-lg">
          <img src={image} alt="Slide" className="transition-all duration-500 ease-in-out transform scale-100 hover:scale-105 p-4" />
        </div>
        <p className="text-xl text-center transition-all duration-500 ease-in-out transform opacity-100 hover:opacity-50"></p>
      </div>
    </div>
  );
};

export default Slide;
