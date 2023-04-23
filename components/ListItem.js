import Image from 'next/image'
import React from 'react'

function ListItem({ price, latlng, bedrooms, bathrooms, floor_size_sq_ft, description, locality, panTo }) {
    let USD = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumSignificantDigits: 1
    });

    return (
        <div className='h-40 bg-blue-500 text-white my-5 rounded-xl flex'>
            <div className='relative w-1/3'>
                <Image src="/example-house.jpg" alt='Home Image' fill={true} sizes="450px" className='object-cover rounded-s-xl z-50' />
            </div>
            <div className='w-2/3 flex justify-evenly px-2 py-3 relative'>
                <Column>
                    {/* Col 1 */}
                    <span className='self-start'>
                        <h1 className='font-bold text-3xl'>{USD.format(price)}</h1>
                        <p className='font-medium text-lg'>{locality}</p>
                    </span>
                    <div className='flex justify-between w-full'>
                        <span className='inline-flex items-center' >
                            <span className="material-symbols-outlined text-2xl mx-2">bed</span>
                            <p className='text-xl font-bold'>{bedrooms}</p>
                        </span>
                        <span className='inline-flex items-center'>
                            <span className="material-symbols-outlined text-2xl mx-2">bathtub</span>
                            <p className='text-xl font-bold'>{bathrooms}</p>
                        </span>
                        <span className='inline-flex items-center'>
                            <span className="material-symbols-outlined text-2xl mx-2">square_foot</span>
                            <p className='text-xl font-bold'>{floor_size_sq_ft} <span className='text-sm'>ft<sup>2</sup></span></p>
                        </span>
                    </div>
                </Column>
                <Column>
                    {/* Col 2 */}
                    <div className='overflow-hidden max-h-full'>
                        <p className='[display:-webkit-box] [-webkit-box-orient:vertical] overflow-ellipsis overflow-hidden [line-clamp:2] clamp'>{description}</p>
                    </div>

                </Column>
                <span className="material-symbols-outlined text-2xl absolute bg-white text-blue-500 w-8 h-8 rounded-xl text-center right-4 cursor-pointer"
                    onClick={() => { panTo(latlng.lat, latlng.lng) }}>pin_drop</span>
            </div>

        </div>
    )
}



function Column({ children, style }) {


    return (
        <div className='w-1/3 flex listings-content-section'>
            <div className='flex flex-col items-center justify-between w-full before:absolute before:content-[""] before:bg-white before:bg-opacity-70 before:w-0.5 before:h-[90%] before:top-0 before:bottom-0 before:my-auto before:-left-12' style={style}>
                {children}
            </div>
        </div>

    )
}


export default ListItem