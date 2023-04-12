import React from 'react'

function CarouselItem({ imgSrc, price, city, state, bedrooms, baths }) {
    let USD = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumSignificantDigits: 1
    });

    return (
        <div className='flex w-2/3 h-4/5'>
            <div className='w-5/12 h-full bg-[#000] rounded-s-xl'>

            </div>
            <div className='w-7/12 h-full flex flex-col justify-between items-center bg-blue-700 rounded-e-xl p-8'>
                <div className='text-center text-white'>
                    <h2 className='text-4xl'>{USD.format(price)}</h2>
                    <h4>{city}, {state}</h4>
                </div>
                <div className='text-center text-white flex justify-evenly w-full'>
                    <span>{bedrooms}</span>
                    <span>{baths}</span>
                </div>
            </div>
        </div>
        // <div className='w-2/3 h-4/5 bg-blue-700 flex flex-col rounded-xl'>
        //     <div className='w-5/12 h-full bg-[#000] rounded-s-xl'>
        //         <div>
        //             <h2>{price}</h2>
        //             <h4>{city}, {state}</h4>
        //         </div>
        //         <div>

        //         </div>
        //     </div>
        // </div>
    )
}

export default CarouselItem