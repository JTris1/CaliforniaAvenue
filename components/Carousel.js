import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import CarouselItem from './CarouselItem';

function Carousel({ slides }) {
    const [slideObjs, setSlideObjs] = useState([]);

    return (
        <>
            <div className='bg-[#c4c4c4] w-full h-96 mt-32 rounded-2xl flex justify-center'>
                <Swiper
                    modules={[Navigation]}
                    slidesPerView={1}
                    navigation
                    onSlideChange={() => console.log('slide change')}
                    centeredSlides={true}
                >
                    <SwiperSlide style={{ display: 'flex' }} className='justify-center items-center'>
                        <CarouselItem price={250000} city={'Indianapolis'} state={'IN'} bedrooms={3} baths={2} />
                    </SwiperSlide>
                    <SwiperSlide style={{ display: 'flex' }} className='justify-center items-center'>
                        <CarouselItem />
                    </SwiperSlide>
                </Swiper>
            </div>
        </>

    )
}

export default Carousel