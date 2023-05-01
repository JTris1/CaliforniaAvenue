import React, { useEffect, useState, useCallback } from 'react'
import { useRouter } from 'next/router'
import axios from 'axios';
import LoadingSpinner from '~/components/LoadingSpinner.js';
import Head from 'next/head';
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Column } from '~/components/ListItem';
import Bed from '~/components/icons/Bed';
import Bathtub from '~/components/icons/Bathtub';
import SqFt from '~/components/icons/SqFt';
import OpenInNew from '~/components/icons/OpenInNew';
import Link from 'next/link';

function Details() {
    const router = useRouter();
    const { id } = router.query;
    const [listing, setListing] = useState(null);
    const [marker, setMarker] = useState(null);

    // Get listing data
    useEffect(() => {
        async function getListing() {
            const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/property?id=${id}`);
            if (res.data) setListing(res.data);
        }
        if (id) getListing();
    }, [id]);

    // Create currency formatting
    let USD = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumSignificantDigits: 1
    });




    //// Init Google Map
    const [reqLatLng, setReqLatLng] = useState(undefined);
    const [map, setMap] = useState(null);

    // Setup Google Map data
    useEffect(() => {
        if (listing) {
            setMarker(<Marker key={listing.latitude + listing.longitude} position={{ lat: listing.latitude, lng: listing.longitude }} />);
        }
    }, [listing]);

    useEffect(() => {
        if (listing && marker) {
            panTo(listing.latitude, listing.longitude);
        }

    }, [marker, listing])

    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: process.env.NEXT_PUBLIC_MAPS_API_KEY,
        mapIds: ['ccbe9bc2fe9491c6']
    });

    const onLoad = useCallback(async (map) => {
        setMap(map);
    }, []);

    const onUnmount = useCallback((map) => {
        setMap(null);
    }, []);

    function panTo(lat, lng) {
        map.panTo({ lat: lat, lng: lng });
        map.setZoom(17);
    }
    ////

    if (listing) {
        return (
            <>
                <Head>
                    <title>{`${listing.address || '...'} | Cali Ave.`}</title>
                </Head>
                <div className='flex w-full h-full'>
                    {isLoaded ?
                        <GoogleMap mapContainerClassName='h-full w-1/3 g-map' center={reqLatLng ? reqLatLng : { lat: -34.397, lng: 150.644 }} zoom={12} onLoad={onLoad} onUnmount={onUnmount} >
                            {marker}
                        </GoogleMap>
                        : <></>
                    }
                    <div className='w-2/3 px-20 py-10'>
                        <div className='flex flex-col items-center rounded-xl w-full h-full bg-gray-100 p-10'>
                            <div className='flex flex-col mb-10 items-center'>
                                <h1 className='font-bold text-4xl mb-3'>{listing.address}</h1>
                                <p className='text-sm'>{listing.latitude}, {listing.longitude}</p>
                            </div>

                            <div className='w-full'>
                                <div className='bg-opacity-0 w-full h-96 rounded-2xl flex justify-center'>
                                    <Swiper
                                        modules={[Navigation, Pagination]}
                                        slidesPerView={1}
                                        navigation
                                        centeredSlides={true}
                                        loop={true}
                                        pagination={true}

                                        style={{
                                            '--swiper-navigation-size': '32px',
                                            '--swiper-navigation-sides-offset': '100px',
                                            '--swiper-navigation-color': '#1282A2',
                                            '--swiper-pagination-bottom': '0px',
                                            '--swiper-pagination-color': 'rgb(18, 130, 162)'
                                        }}
                                    >

                                        <SwiperSlide style={{ display: 'flex' }} className='justify-center items-center'>
                                            <Image src={'/example-house.jpg'} alt={`House at ${listing.address}`} width={500} height={333} className='rounded-lg' />
                                        </SwiperSlide>
                                        <SwiperSlide style={{ display: 'flex' }} className='justify-center items-center'>
                                            <Image src={'/example-house.jpg'} alt={`House at ${listing.address}`} width={500} height={333} className='rounded-lg' />
                                        </SwiperSlide>
                                        <SwiperSlide style={{ display: 'flex' }} className='justify-center items-center'>
                                            <Image src={'/example-house.jpg'} alt={`House at ${listing.address}`} width={500} height={333} className='rounded-lg' />
                                        </SwiperSlide>
                                    </Swiper>
                                </div>
                            </div>
                            <div className='flex flex-col w-[90%] bg-blue-500 rounded-xl mt-10 text-white'>
                                <div className='flex h-48 bg-blue-500 rounded-xl text-white relative mb-4'>
                                    <Column style={{ 'justifyContent': 'center' }}>
                                        {/* Col 1 */}
                                        <span className=''>
                                            <h1 className='font-bold text-3xl'>{USD.format(listing.price)}</h1>
                                            <p className='font-medium text-lg'>{`${listing.locality}, ${listing.region}`}</p>
                                        </span>
                                    </Column>
                                    <Column style={{ 'justifyContent': 'center' }}>
                                        <div className='flex justify-between w-fit md:flex-col md:m-5'>
                                            <span className='inline-flex items-center' >
                                                <Bed className={'fill-white w-7 mx-2'} />
                                                <p className='text-xl font-bold'>{listing.bedrooms}</p>
                                            </span>
                                            <span className='inline-flex items-center'>
                                                <Bathtub className={'fill-white w-7 mx-2'} />
                                                <p className='text-xl font-bold'>{listing.bathrooms}</p>
                                            </span>
                                            <span className='inline-flex items-center'>
                                                <SqFt className={'fill-white w-7 mx-2'} />
                                                <p className='text-xl font-bold'>{listing.floor_size_sq_ft} <span className='text-sm'>ft<sup>2</sup></span></p>
                                            </span>
                                        </div>
                                    </Column>
                                    <Link href={listing.link} className='absolute right-4 top-2'>
                                        <OpenInNew className={'fill-white w-6'} />
                                    </Link>
                                </div>
                                <div className='flex flex-col items-center p-10'>
                                    <h2 className='font-bold text-xl mb-6'>Description</h2>
                                    <p>{listing.description}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
    else {
        return <LoadingSpinner />
    }

}

export default Details