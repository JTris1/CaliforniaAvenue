import Image from 'next/image'
import React from 'react'

function Header() {
    return (
        <header className='flex justify-between items-center px-10 py-5 bg-blue-300 box-border' id='navbar'>
            <span className="material-symbols-outlined invisible">account_circle</span>
            <Image src="/logo-light.png" height={64} width={64} alt="Logo" className='h-auto' />
            <span className="material-symbols-outlined text-5xl text-white">account_circle</span>
        </header>
    )
}

export default Header