import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import CarouselItem from './CarouselItem';
import axios from 'axios';
import LoadingSpinner from './LoadingSpinner';

function Carousel({ slideCount }) {
    const [slides, setSlides] = useState([]);
    const [properties, setProperties] = useState([]);

    useEffect(() => {
        async function getProperties() {
            const properties = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/propertyEnquiry?zip_code=90503`);
            setProperties(properties.data);
        }
        getProperties();
    }, [slideCount]);

    if (properties.length > 0) {
        return (
            <>
                <div className='bg-white w-full h-96 mt-32 rounded-2xl flex justify-center'>
                    <Swiper
                        modules={[Navigation, Autoplay]}
                        slidesPerView={1}
                        navigation
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
                        {properties.map((i) => (
                            <SwiperSlide key={i.latitude + i.longitude} style={{ display: 'flex' }} className='justify-center items-center'>
                                <CarouselItem imgSrc={'/example-house.jpg'} price={i.price} city={i.locality} state={i.region} bedrooms={i.bedrooms} baths={i.bathrooms} />
                            </SwiperSlide>)
                        )}
                    </Swiper>
                </div>
            </>

        )
    }
    else {
        return (
            <div className='relative w-20 h-96 mt-32 flex items-center justify-center'>
                <div className='absolute'>
                    <LoadingSpinner />
                </div>
            </div>
        )
    }
}

export default Carousel