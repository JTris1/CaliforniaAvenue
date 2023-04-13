import React from 'react'
import Header from './Header'

function Layout({ children }) {
    return (
        <>
            <Header />
            <div className='flex flex-col items-center text-[#202020]' style={{ height: `calc(100vh - 96px)` }}>
                {children}
            </div>

        </>

    )
}

export default Layout