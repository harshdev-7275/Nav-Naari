import React from 'react';
import C1 from '../img/carousel-1.jpg'; 
import C2 from '../img/carousel-2.jpg'; 

const ImageTouch = ({val}) => {
  return (
    <div className='w-[1500px] h-[700px] relative'>
      <img src={val} alt="" className='object-cover w-full h-full' style={{ filter: 'brightness(50%)' }} />
    </div>
  );
};

export default ImageTouch;
