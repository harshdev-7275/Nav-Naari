import React from 'react';

const ServiceButton = ({ name, col }) => {
    
  return (
    <>
      <button className={` bg-[#${col}] text-white text-lg px-5 py-4 border-2`}>{name}</button>
    </>
  );
};

export default ServiceButton;
