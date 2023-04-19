import Image from 'next/image'
import React, { useState } from 'react'
import AccountPane from './AccountPane';
import Link from 'next/link';

function Header() {
    const [accPaneOpen, setAccPaneOpen] = useState(false);

    return (
        <>
            <header className={`flex justify-center items-center h-[76px] px-10 bg-blue-300 box-border relative`} id='navbar'>
                <Link href={'/'}>
                    <Image src="/logo-light.svg" height={200} width={200} alt="Logo" className='h-auto' />
                </Link>
                <div className={`absolute right-0 h-full w-16 mr-10 flex items-center justify-center cursor-pointer`}
                    onMouseOver={() => setAccPaneOpen(true)}
                    onMouseLeave={() => setAccPaneOpen(false)}>
                    <span className="material-symbols-outlined text-5xl text-white select-none">account_circle</span>
                </div>
            </header>
            {accPaneOpen ? <AccountPane setAccPaneOpen={setAccPaneOpen} /> : undefined}
        </>
    )
}

export default Header