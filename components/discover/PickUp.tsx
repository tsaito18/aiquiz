'use client';

import 'swiper/css';
import 'swiper/css/autoplay';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import QuizCard from './QuizCard';

export default function PickUp() {
  return (
    <Swiper
      modules={[Autoplay, Navigation, Pagination]}
      breakpoints={{
        0: {
          slidesPerView: 1.4,
          spaceBetween: 10,
        },
        1024: {
          slidesPerView: 2,
          spaceBetween: 10,
        },
      }}
      autoplay={{ delay: 5000, disableOnInteraction: false }}
      speed={1000}
      centeredSlides
      grabCursor
      navigation
      pagination={{ clickable: true }}
      loop
      slidesPerView="auto"
    >
      <SwiperSlide>
        <QuizCard />
      </SwiperSlide>
      <SwiperSlide>
        <QuizCard />
      </SwiperSlide>
      <SwiperSlide>
        <QuizCard />
      </SwiperSlide>
      <SwiperSlide>
        <QuizCard />
      </SwiperSlide>
    </Swiper>
  );
}
