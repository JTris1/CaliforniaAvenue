import Head from 'next/head';
import { useRouter } from 'next/router'
import { GoogleMap, useJsApiLoader, } from '@react-google-maps/api';
import React, { useCallback, useEffect, useRef, useState } from 'react'
import Script from 'next/script';
import axios from 'axios';

function Listings() {
    const router = useRouter();
    // ZipCode is taken from the queryString. Ex: ('https://domain.com/listings?zipcode=12345')
    const { zipcode } = router.query;


    //// GOOGLE MAP
    const [reqLatLng, setReqLatLng] = useState({ lat: -34.397, lng: 150.644 });
    const [map, setMap] = useState(null);

    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: 'AIzaSyAVZNv2F1n9Gb4dzXASG67q3KW_IxQx62A',
        mapIds: ['ccbe9bc2fe9491c6']
    });

    const onLoad = useCallback((map) => {

    }, []);

    const onUnmount = useCallback((map) => {
        setMap(null);
    }, []);

    // Convert zipcode to coordinates
    useEffect(() => {
        async function fetch() {
            if (zipcode) {
                const req = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${zipcode}&key=AIzaSyAVZNv2F1n9Gb4dzXASG67q3KW_IxQx62A`);
                console.log(req.data);
                setReqLatLng(req.data.results[0].geometry.location);
            }
        }
        fetch();
    }, [zipcode])

    //// END GOOGLE MAP


    return (
        <>
            <Head>
                <title>Listings for {zipcode}</title>
            </Head>
            <div className='flex w-full h-full'>
                {isLoaded ?
                    <GoogleMap mapContainerClassName='h-full w-[50%]' center={reqLatLng} zoom={12} onLoad={onLoad} onUnmount={onUnmount}></GoogleMap>
                    : <></>
                }
                <div className='flex flex-col items-center w-[50%] p-12'>
                    <h1 className='font-bold text-4xl'>Results for <span className='font-black'>{zipcode}</span></h1>
                </div>

            </div>

        </>
    )
}

export default Listings