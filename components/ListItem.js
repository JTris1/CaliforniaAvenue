import Image from 'next/image'
import React from 'react'
import Bed from './icons/Bed';
import Bathtub from './icons/Bathtub';
import SqFt from './icons/SqFt';
import PinDrop from './icons/PinDrop';
import Link from 'next/link';

function ListItem({ price, latlng, bedrooms, bathrooms, floor_size_sq_ft, description, locality, panTo, id }) {
    let USD = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumSignificantDigits: 1
    });

    return (
        <Link href={`/listings/details?id=${id}`}>
            <div className='h-40 bg-blue-500 text-white my-5 rounded-xl flex'>
                <div className='relative w-1/3'>
                    <Image src="example-house.jpg" alt='Home Image' fill={true} sizes="450px" className='object-cover rounded-s-xl z-50' />
                </div>
                <div className='w-fit flex justify-evenly px-2 py-3 relative'>
                    <Column>
                        {/* Col 1 */}
                        <span className=''>
                            <h1 className='font-bold text-3xl'>{USD.format(price)}</h1>
                            <p className='font-medium text-lg'>{locality}</p>
                        </span>
                        <div className='flex justify-between w-fit md:flex-col md:m-5'>
                            <span className='inline-flex items-center' >
                                <Bed className={'fill-white w-7 mx-2'} />
                                <p className='text-xl font-bold'>{bedrooms}</p>
                            </span>
                            <span className='inline-flex items-center'>
                                <Bathtub className={'fill-white w-7 mx-2'} />
                                <p className='text-xl font-bold'>{bathrooms}</p>
                            </span>
                            <span className='inline-flex items-center'>
                                <SqFt className={'fill-white w-7 mx-2'} />
                                <p className='text-xl font-bold'>{floor_size_sq_ft} <span className='text-sm'>ft<sup>2</sup></span></p>
                            </span>
                        </div>
                    </Column>
                    <Column>
                        {/* Col 2 */}
                        <div className='overflow-hidden max-h-full md:my-5 mx-10'>
                            <p className='[display:-webkit-box] [-webkit-box-orient:vertical] overflow-ellipsis overflow-hidden [line-clamp:2] clamp'>{description}</p>
                        </div>

                    </Column>
                    <span className='bg-white w-8 h-8 rounded-xl absolute right-4 cursor-pointer flex justify-center items-center' onClick={() => { panTo(latlng.lat, latlng.lng) }}>
                        <PinDrop className={'fill-blue-500 w-6'} />
                    </span>
                </div>

            </div>
        </Link>
    )
}



export function Column({ children, className, style }) {


    return (
        <div className='w-1/3 md:w-1/2 md:p-2 flex listings-content-section'>
            <div className={`flex flex-col items-center justify-between w-full md:flex-row before:absolute before:content-[""] before:bg-white before:bg-opacity-70 before:w-0.5 before:h-[90%] before:top-0 before:bottom-0 before:my-auto before:-left-1 ${className}`} style={style}>
                {children}
            </div>
        </div>

    )
}

export default ListItem