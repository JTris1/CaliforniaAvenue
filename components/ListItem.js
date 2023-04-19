import Image from 'next/image'
import React from 'react'

function ListItem({ price, latlng, bedrooms, bathrooms, floor_size_sq_ft, description, locality }) {
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
                    <span>
                        <h1 className='font-bold text-3xl'>{USD.format(price)}</h1>
                        <p className='font-medium text-lg'>{locality}</p>
                    </span>
                    <div className='flex justify-evenly w-full'>
                        <span className='inline-flex items-center' >
                            <span className="material-symbols-outlined text-2xl mx-2">bed</span>
                            <p className='text-xl font-bold'>{bedrooms}</p>
                        </span>
                        <span className='inline-flex items-center'>
                            <span className="material-symbols-outlined text-2xl mx-2">bathtub</span>
                            <p className='text-xl font-bold'>{bathrooms}</p>
                        </span>
                    </div>
                </Column>
                <Column>
                    {/* Col 2 */}

                </Column>
                <Column>
                    <p className='h-full w-full flex-wrap'>{description}</p>
                </Column>
                <span className="material-symbols-outlined text-2xl absolute bg-white text-blue-500 w-8 h-8 rounded-xl text-center right-4 cursor-pointer"
                    onClick={() => { console.warn("Todo: center map on click") }}>pin_drop</span>
            </div>

        </div>
    )
}



function Column({ children, style }) {


    return (
        <div className='flex flex-col items-center justify-between w-1/3 before:absolute before:bg-white before:w-1 before:h-[90%] before:top-0 before:bottom-0 before:my-auto before:left-[-4px]' style={style}>
            {children}
        </div>
    )
}


export default ListItem