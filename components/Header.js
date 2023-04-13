import Image from 'next/image'
import React, { useState } from 'react'
import AccountPane from './AccountPane';

function Header() {
    const [accPaneOpen, setAccPaneOpen] = useState(false);

    return (
        <>
            <header className='flex justify-between items-center px-10 py-5 bg-blue-300 box-border' id='navbar'>
                <span className="material-symbols-outlined invisible">account_circle</span>
                <Image src="/logo-light.png" height={64} width={64} alt="Logo" className='h-auto' />
                <span className="material-symbols-outlined h-full text-5xl text-white cursor-pointer"
                    onMouseOver={() => setAccPaneOpen(true)}
                    onMouseLeave={() => setAccPaneOpen(false)}
                >account_circle</span>
            </header>
            {accPaneOpen ? <AccountPane /> : undefined}
        </>
    )
}

export default Header