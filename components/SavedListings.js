import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper'
import 'swiper/css'
import 'swiper/css/navigation'
import Image from 'next/image'

function SavedListings({ savedListings }) {

    return (
        <div className='w-full h-56 flex justify-center'>
            <Swiper
                modules={[Navigation]}
                slidesPerView={1}
                navigation
                centeredSlides={true}
                style={{
                    '--swiper-navigation-size': '24px',
                    '--swiper-navigation-sides-offset': '0px',
                    '--swiper-navigation-color': '#000000'
                }}
            >
                <SwiperSlide className='flex justify-center items-center'>
                    <ListingItem price={500000} city={'Los Angeles'} state={'CA'} beds={3} baths={4}></ListingItem>
                </SwiperSlide>
                <SwiperSlide className='flex justify-center items-center'>

                </SwiperSlide>
            </Swiper>
        </div>
    )
}

function ListingItem({ price, city, state, address, beds, baths }) {

    let USD = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumSignificantDigits: 1
    });

    return (
        <div className='flex flex-col items-center justify-center px-20 h-full lg:flex-row xl:flex-row 2xl:flex-row'>
            <div className='w-full h-4/5 bg-blue-300 flex items-center text-white rounded-lg'>
                <div className='w-2/5 h-full relative'>
                    <Image src={'/example-house.jpg'} alt={`House at ${"INSERT HOUSE ADDRESS HERE"}`} fill={true} sizes="450px" className='object-cover rounded-s-xl' />
                </div>
                <div className='flex w-3/5 h-full p-5'>
                    <div className='w-4/5 h-full flex flex-col items-center justify-between'>
                        <div className=''>
                            <h2 className='text-3xl font-bold'>{USD.format(price)}</h2>
                            <h3 className='text-lg'>{city}, {state}</h3>
                        </div>
                        <h4 className='text-lg'>{address}</h4>
                    </div>
                    <div className='flex flex-col justify-evenly items-center'>
                        <span className='inline-flex items-center'>
                            <span className="material-symbols-outlined text-2xl mr-5">bed</span>
                            <p className='text-xl font-bold'>{beds}</p>
                        </span>
                        <span className='inline-flex items-center'>
                            <span className="material-symbols-outlined text-2xl mr-5">bathtub</span>
                            <p className='text-xl font-bold'>{baths}</p>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SavedListings