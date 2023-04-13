import Image from 'next/image'
import React, { useState } from 'react'
import AccountPane from './AccountPane';

function Header() {
    const [accPaneOpen, setAccPaneOpen] = useState(false);

    const header_x_pad_marg = '10'

    return (
        <>
            <header className={`flex justify-center items-center px-${header_x_pad_marg} py-5 bg-blue-300 box-border relative`} id='navbar'>
                {/* <span className="material-symbols-outlined invisible">account_circle</span> */}
                <Image src="/logo-light.png" height={64} width={64} alt="Logo" className='h-auto' />
                <div className={`absolute right-0 h-full w-16 mr-${header_x_pad_marg} flex items-center justify-center cursor-pointer`}
                    onMouseOver={() => setAccPaneOpen(true)}
                    onMouseLeave={() => setAccPaneOpen(false)}>
                    <span className="material-symbols-outlined text-5xl text-white">account_circle</span>
                </div>
            </header>
            {accPaneOpen ? <AccountPane setAccPaneOpen={setAccPaneOpen} /> : undefined}
        </>
    )
}

export default Header