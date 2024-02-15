import React from 'react'
import c1 from "../img/carousel-1.jpg"
import c2 from "../img/carousel-2.jpg"
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';

import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import ImageTouch from './ImageTouch';


const TestimonialCaraousal = () => {
  return (
    <>
     <Swiper
      // install Swiper modules
      modules={[Navigation, Pagination, Scrollbar, A11y]}
      spaceBetween={0}
      slidesPerView={1}
      navigation
      pagination={{ clickable: true }}
    //   scrollbar={{ draggable: true }}
    //   onSwiper={(swiper) => console.log(swiper)}
      onSlideChange={() => console.log('slide change')}
    >
      <SwiperSlide><ImageTouch val={c1}/></SwiperSlide>
      <SwiperSlide><ImageTouch val={c2}/></SwiperSlide>
      {/* <SwiperSlide><img src={c2}  alt="" /></SwiperSlide> */}
  
      
    </Swiper></>
  )
}

export default TestimonialCaraousal