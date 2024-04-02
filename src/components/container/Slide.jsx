import React from 'react';
import { Icon } from '@iconify/react';

const Slide = ({ image, text }) => {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="max-w-lg mx-auto">
        <div className="overflow-hidden rounded-lg shadow-lg">
          <img src={image} alt="Slide" className="transition-all duration-500 ease-in-out transform scale-100 hover:scale-105" style={{ width: '600px', height: '400px' }} />
        </div>
        <p className="text-xl text-center transition-all duration-500 ease-in-out transform opacity-100 hover:opacity-50"><Icon icon="svg-spinners:3-dots-fade" /></p>
      </div>
    </div>
  );
};

export default Slide;
