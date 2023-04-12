import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import CarouselItem from './CarouselItem';

function Carousel({ slides }) {
    const [slideObjs, setSlideObjs] = useState([]);

    return (
        <>
            <div className='bg-white w-9/12 h-96 mt-32 rounded-2xl flex justify-center'>
                <Swiper
                    modules={[Navigation, Autoplay]}
                    slidesPerView={1}
                    navigation
                    onSlideChange={() => console.log('slide change')}
                    centeredSlides={true}
                    loop={true}
                    autoplay={{
                        delay: 5000,
                        pauseOnMouseEnter: true,
                        reverseDirection: true
                    }}


                    style={{
                        '--swiper-navigation-size': '32px',
                        '--swiper-navigation-sides-offset': '100px',
                        '--swiper-navigation-color': '#1282A2'
                    }}
                >
                    <SwiperSlide style={{ display: 'flex' }} className='justify-center items-center'>
                        <CarouselItem imgSrc={'/example-house.jpg'} price={250000} city={'Indianapolis'} state={'IN'} bedrooms={3} baths={2} />
                    </SwiperSlide>
                    <SwiperSlide style={{ display: 'flex' }} className='justify-center items-center'>
                        <CarouselItem imgSrc={'/example-house.jpg'} price={250000} city={'Indianapolis'} state={'IN'} bedrooms={3} baths={2} />
                    </SwiperSlide>
                    <SwiperSlide style={{ display: 'flex' }} className='justify-center items-center'>
                        <CarouselItem imgSrc={'/example-house.jpg'} price={250000} city={'Indianapolis'} state={'IN'} bedrooms={3} baths={2} />
                    </SwiperSlide>
                </Swiper>
            </div>
        </>

    )
}

export default Carousel