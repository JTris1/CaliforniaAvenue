import Image from 'next/image'
import React from 'react'

function Header() {
    return (
        <header className='flex justify-center px-10 py-5 bg-blue-300 box-border'>
            <Image src="/logo-light.png" height={64} width={64} alt="Logo" />
        </header>
    )
}

export default Header