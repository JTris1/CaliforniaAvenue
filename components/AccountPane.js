import React, { useEffect, useState } from 'react'
import { getCookie } from 'cookies-next'
import Link from 'next/link';
import useLogout from '~/hooks/useLogout';

function AccountPane({ setAccPaneOpen }) {
    const [userData, setUserData] = useState(null);
    const logout = useLogout();

    useEffect(() => {
        const cookie = getCookie('user_data');
        if (cookie) {
            setUserData(JSON.parse(cookie));
        }
        else {
            setUserData(null);
        }
    }, [setUserData])

    return (
        <div className='w-[325px] h-[400px] absolute right-0 flex flex-col justify-between items-end bg-blue-300 text-white p-7 drop-shadow-xl rounded-bl-md'
            onMouseOver={() => setAccPaneOpen(true)}
            onMouseLeave={() => setAccPaneOpen(false)}
        >

            {userData ? (
                <>
                    <div className='flex flex-col'>
                        <Link href={'/profile'} className='text-right'>
                            <h1 className='font-extrabold text-2xl li-anim-white underline-offset-4 mb-5 text-right'>{userData.name}</h1>
                        </Link>
                        <ul className='text-right'>
                            <Link href={'/profile/listings'}><li className='font-bold text-xl py-1 cursor-pointer li-anim-white'>Saved Listings</li></Link>
                            <Link href={'/profile/manage'}><li className='font-bold text-xl py-1 cursor-pointer li-anim-white'>Account Settings</li></Link>
                        </ul>
                    </div>
                    <h1 className='font-extrabold text-2xl cursor-pointer li-anim-white' onClick={() => logout()}>Logout</h1>
                </>
            ) : (
                <>
                    <div className='flex flex-col w-full items-center'>
                        <span className='flex justify-center'>
                            <Link href="/login">
                                <h1 className='font-extrabold text-3xl li-anim-white underline-offset-4 my-10 text-right'>Login</h1>
                            </Link>
                        </span>
                        <span className='text-lg'>or</span>
                        <span className='flex justify-center'>
                            <Link href="/register">
                                <h1 className='font-extrabold text-3xl li-anim-white underline-offset-4 my-10 text-center'>Register</h1>
                            </Link>
                        </span>
                    </div>
                </>
            )}
        </div>
    )
}

export default AccountPane