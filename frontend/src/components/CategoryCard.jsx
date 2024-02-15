import React from 'react';
import { Link } from 'react-router-dom';


const CategoryCard = ({ icon, title, to }) => {

  return (
    <Link  to="/">
      <div className='w-[200px] h-[200px] flex flex-col items-center justify-center rounded-md shadow-md hover:scale-90 cursor-pointer transition-all px-5 py-4 bg-white text-[#25316D] font-bold'>
        <div>{icon}</div>
        <h1 className='text-md text-center'>{title}</h1>
      </div>
    </Link>
  );
};

export default CategoryCard;
