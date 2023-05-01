import Head from 'next/head';
import { useRouter } from 'next/router'
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';
import { Loader } from '@googlemaps/js-api-loader';
import React, { useCallback, useEffect, useRef, useState } from 'react'
import Script from 'next/script';
import axios from 'axios';
import ListItem from '~/components/ListItem';

function Listings() {
    const router = useRouter();
    // ZipCode is taken from the queryString. Ex: ('https://domain.com/listings?zipcode=12345')
    const { zipcode } = router.query;
    const [listings, setListings] = useState(null);
    const [listitems, setListitems] = useState(null);
    const [markers, setMarkers] = useState([]);
    const [bounds, setBounds] = useState(null);


    useEffect(() => {
        async function getListings() {
            const req = axios.get(`${process.env.NEXT_PUBLIC_API_URL}/propertyEnquiry?zip_code=${zipcode}`)
                .then((req) => {
                    setListings(req.data);
                })
                .catch((error) => {
                    if (error.response) {
                        console.log(error.response.data);
                        console.log(error.response.status);
                        console.log(error.response.headers);
                    } else if (error.request) {
                        console.log(error.request);
                    } else {
                        console.log('Error', error.message);
                    }
                    console.log(error.config);
                    setListings(null);
                })
            setListings(req.data);
        }
        if (zipcode !== undefined) getListings();
    }, [zipcode])

    useEffect(() => {
        if (listings) {
            let markers = [];
            let bounds = [];
            const objs = listings.map((l) => {
                markers.push(<Marker key={l.latitude + l.longitude} position={{ lat: l.latitude, lng: l.longitude }} />);
                bounds.push({ lat: l.latitude, lng: l.longitude });


                return (
                    <ListItem
                        key={l.latitude + l.longitude}
                        id={l.uniq_id}
                        price={l.price}
                        bedrooms={l.bedrooms}
                        bathrooms={l.bathrooms}
                        description={l.description}
                        floor_size_sq_ft={l.floor_size_sq_ft}
                        latlng={{ lat: parseFloat(l.latitude), lng: parseFloat(l.longitude) }}
                        locality={l.locality}
                        panTo={panTo}
                    />)
            });

            setMarkers(markers);
            setBounds(bounds);

            setListitems(objs);
        }
    }, [listings])


    //// GOOGLE MAP
    const [reqLatLng, setReqLatLng] = useState({ lat: -34.397, lng: 150.644 });
    const [map, setMap] = useState(null);

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
        map.setZoom(18);
    }


    // Convert zipcode to coordinates
    useEffect(() => {
        async function fetch() {
            if (zipcode) {
                const req = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${zipcode}&components=country:US&key=${process.env.NEXT_PUBLIC_MAPS_API_KEY}`);
                if (req.data.status === "OK") {
                    setReqLatLng(req.data.results[0].geometry.location);
                }
            }
        }
        fetch();
    }, [zipcode])

    useEffect(() => {
        async function setBounds() {
            if (bounds) {
                const { LatLngBounds } = await google.maps.importLibrary("core");
                const mapBounds = new LatLngBounds;
                bounds.forEach((i) => {
                    mapBounds.extend(i);
                })

                if (map) {
                    map.fitBounds(mapBounds);
                }
            }
        }

        setBounds();
    }, [bounds, map])

    //// END GOOGLE MAP


    return (
        <>
            <Head>
                <title>{`Listings for ${zipcode || '...'} | Cali Ave.`}</title>
            </Head>
            <div className='flex w-full h-full'>
                {isLoaded ?
                    <GoogleMap mapContainerClassName='h-full w-1/3 g-map' center={reqLatLng} zoom={12} onLoad={onLoad} onUnmount={onUnmount} >
                        {markers}
                    </GoogleMap>
                    : <></>
                }
                <div className='w-2/3 px-20 py-10'>
                    <div className='flex flex-col items-center rounded-xl w-full h-full bg-gray-100 p-10'>
                        <h1 className='font-bold text-4xl mb-10'>Results for <span className='font-black'>{zipcode}</span></h1>

                        <div className='w-full'>
                            {listitems}
                        </div>
                    </div>

                </div>

            </div>

        </>
    )
}

export default Listings