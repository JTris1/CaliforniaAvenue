import axios from 'axios';
import React, { useEffect, useState } from 'react'
import useUserData from '~/hooks/useUserData'
import Head from 'next/head';
import { useRouter } from 'next/router';
import InfoPanel from '~/components/InfoPanel';
import { hasCookie } from 'cookies-next';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper';
import 'swiper/css'
import 'swiper/css/navigation'


function Profile() {
    const [data] = useUserData();
    console.log(data);
    const [localData, setLocalData] = useState(null);


    const router = useRouter();

    useEffect(() => {
        if (data) {
            const config = { headers: { Authorization: `Bearer ${data.accessToken}` } }
            axios.get(`${process.env.NEXT_PUBLIC_API_URL}/users/profile`, config)
                .then((res) => {
                    setLocalData(res.data);
                })
                .catch((e) => {
                    if (e.response) {
                        console.error(e.response.data);
                        console.error(e.response.status);
                        console.error(e.response.headers);
                    }
                    else if (error.request) {
                        console.error(error.request);
                    }
                    else {
                        console.error('Error', e.message);
                    }
                    console.error(e.config);
                });
        }

    }, [data])


    if (hasCookie('user_data')) {
        if (data && localData) {
            return (
                <>
                    <Head>
                        <title>Profile | Cali Ave.</title>
                    </Head>
                    <div className='py-14 px-52 w-full h-full flex'>
                        <InfoPanel
                            itemNames={[
                                {
                                    name: 'Overview',
                                    link: '/profile'
                                },
                                {
                                    name: 'Saved Listings',
                                    link: '/profile/listings',
                                },
                                {
                                    name: 'Manage Account',
                                    link: '/profile/manage'
                                }
                            ]}
                        />
                        <div className='flex flex-col items-center w-3/4 bg-gray-100 p-10 rounded-e-lg'>
                            <h1 className='font-bold text-3xl mb-10'>Welcome Back, {data.name.split(' ')[0]}!</h1>
                            <h2 className='font-bold text-2xl underline underline-offset-4'>Overview</h2>

                            <div className='w-full h-full flex flex-col'>
                                <div className='w-full h-1/4 flex justify-center'>
                                    <Swiper
                                        modules={[Navigation]}
                                        slidesPerView={1}
                                        navigation
                                        centeredSlides={true}
                                        style={{
                                            '--swiper-navigation-size': '24px',
                                            '--swiper-navigation-sides-offset': '0px',
                                            '--swiper-navigation-color': '#000000'
                                        }}
                                    >
                                        <SwiperSlide className='flex justify-center items-center'>
                                            <div className='flex flex-col items-center h-4/5 drop-shadow-xl lg:flex-row xl:flex-row 2xl:flex-row'>
                                                test
                                            </div>
                                        </SwiperSlide>
                                        <SwiperSlide className='flex justify-center items-center'>
                                            <div className='flex flex-col items-center w-2/3 h-4/5 drop-shadow-xl lg:flex-row xl:flex-row 2xl:flex-row'>
                                                test
                                            </div>
                                        </SwiperSlide>
                                        <SwiperSlide className='flex justify-center items-center'>
                                            <div className='flex flex-col items-center w-2/3 h-4/5 drop-shadow-xl lg:flex-row xl:flex-row 2xl:flex-row'>
                                                test
                                            </div>
                                        </SwiperSlide>
                                    </Swiper>
                                </div>

                            </div>
                        </div>
                    </div>
                </>
            )
        }
        else {
            // This for some reason causing a hydration error and i cant figure it out

            // return (
            //     <div className='relative w-20 h-20'>
            //         <span className='absolute top-0 right-0 bottom-0 left-0'>Loading...</span>
            //     </div>
            // )
        }
    }
    else {
        if (typeof window !== 'undefined') {
            // client-side-only code
            router.push('/login');
        }
    }
}



export default Profile