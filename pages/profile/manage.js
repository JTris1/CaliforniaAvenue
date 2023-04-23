import React from 'react'
import { hasCookie } from 'cookies-next';
import { useRouter } from 'next/router';

function Manage() {
    const router = useRouter();

    if (hasCookie('user_data')) {
        if (data) {
            return (
                <>

                </>
            )
        }
        else {
            return (
                <div className='relative w-20 h-20'>
                    <span className='absolute top-0 right-0 bottom-0 left-0'>Loading...</span>
                </div>
            )
        }
    }
    else {
        if (typeof window !== 'undefined') {
            // client-side-only code
            router.push('/login');
        }

    }
}

export default Manage