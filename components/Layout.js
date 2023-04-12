import React from 'react'
import Header from './Header'

function Layout({ children }) {
    return (
        <>
            <Header />
            <div className='flex flex-col items-center'>
                {children}
            </div>

        </>

    )
}

export default Layout