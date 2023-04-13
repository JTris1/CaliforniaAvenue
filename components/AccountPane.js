import React from 'react'

function AccountPane() {
    return (
        <div className='w-[325px] h-[400px] absolute right-0 flex flex-col justify-between items-end bg-blue-300 text-white p-7'>
            <div className='flex flex-col'>
                <h1 className='font-extrabold text-3xl underline underline-offset-4 mb-5'>Hello, Example!</h1>
                <ul className='text-right'>
                    <li className='font-bold text-xl hover:underline py-1 cursor-pointer'>Saved Listings</li>
                    <li className='font-bold text-xl hover:underline py-1 cursor-pointer'>Account Settings</li>
                </ul>
            </div>
            <h1 className='font-extrabold text-2xl cursor-pointer hover:underline'>Logout</h1>
        </div>
    )
}

export default AccountPane