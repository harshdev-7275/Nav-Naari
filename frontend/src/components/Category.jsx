import React from 'react';
import { ImSpoonKnife } from "react-icons/im";
import { TfiHeadphoneAlt } from "react-icons/tfi";
import { FaUserDoctor } from "react-icons/fa6";
import { PiStudentFill } from "react-icons/pi";
import { IoMdTrendingUp } from "react-icons/io";
import { PiHandshakeFill } from "react-icons/pi";
import { FaChildren } from "react-icons/fa6";
import { FaShoppingBag } from "react-icons/fa";
import CategoryCard from './CategoryCard';


const Category = () => {
    const categoryData = [
        {
            icon: <ImSpoonKnife size={50} />,
            title:"Cooking and Culinary Arts",
            link:"/findtalent/cooking"
        },
        {
            icon: <TfiHeadphoneAlt size={50} />,
            title:"Creative Arts",
            link:"/findtalent/arts"
        },
        {
            icon: <FaUserDoctor size={50} />,
            title:"Health and Wellness",
            link:"/findtalent/health"
        },
        {
            icon: <PiStudentFill size={50} />,
            title:"Education and Tutoring",
            link:"/findtalent/education"
        },
        {
            icon: <IoMdTrendingUp size={50} />,
            title:"Home and Lifestyle",
            link:"/findtalent/lifestyle"
        },
        {
            icon: <PiHandshakeFill size={50}/>,
            title:"Consultation Services",
            link:"/findtalent/consultation"
        },
        {
            icon: <FaChildren size={50}/>,
            title:"Childcare and Parenting",
            link:"/findtalent/care"
        },
        {
            icon: <FaShoppingBag size={50}/>,
            title:"Fashion and Beauty",
            link:"/findtalent/care"
        }
    ];

    return (
        <div className='w-full container mx-auto pt-20 flex flex-col items-center justify-center pb-10'>
            <div className='text-5xl text-center font-semibold pb-10'>
                <h1>Explore By Category</h1>
            </div>
            <div className='max-w-[1000px] container'>
                <ul className='grid grid-cols-4 gap-7'>
                    {categoryData.map((category, index) => (
                      <CategoryCard key={index} icon={category.icon} title={category.title} to={category.link} />
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Category;
