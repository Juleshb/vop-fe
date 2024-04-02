import React from 'react';
import { Icon } from '@iconify/react';

const EventCard = ({ event }) => {
  return (
    <div className="max-w-sm  overflow-hidden shadow-lg border border-solid rounded-lg border-Teal">
    <p className='text-3xl text-Teal m-2'> <Icon icon="material-symbols:event-available-outline-sharp" /></p> 
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{event.title}</div>
        <p className="text-gray-700 text-base">{event.date}</p>
        <p className="text-gray-700 text-base mt-2">{event.location}</p>
        <p className="text-gray-700 text-base mt-2">{event.description}</p>
      </div>
    </div>
  );
};

export default EventCard;
