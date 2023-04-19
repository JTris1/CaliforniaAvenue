import Image from 'next/image';
import React from 'react';

function CarouselItem({ imgSrc, price, city, state, bedrooms, baths }) {
    let USD = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumSignificantDigits: 1
    });

    return (
        <div className='flex flex-col items-center w-2/3 h-4/5 drop-shadow-xl lg:flex-row xl:flex-row 2xl:flex-row'>
            <div className='w-7/12 h-full bg-white rounded-t-xl relative'>
                <Image src={imgSrc} alt="House" fill={true} sizes="450px" className='object-cover rounded-s-xl' />
            </div>
            <div className='w-7/12 h-full flex flex-col justify-between items-center bg-blue-500 rounded-e-xl p-8'>
                <div className='text-center text-white'>
                    <h2 className='text-4xl font-bold'>{USD.format(price)}</h2>
                    <h4 className='text-xl'>{city}, {state}</h4>
                </div>
                <div className='text-center text-white flex justify-evenly w-full'>
                    <span className='inline-flex items-center'>
                        <span className="material-symbols-outlined text-5xl mx-5">bed</span>
                        <p className='text-3xl font-bold'>{bedrooms}</p>
                    </span>
                    <span className='inline-flex items-center'>
                        <span className="material-symbols-outlined text-5xl mx-5">bathtub</span>
                        <p className='text-3xl font-bold'>{baths}</p>
                    </span>
                </div>
            </div>
        </div>
    )
}

export default CarouselItem