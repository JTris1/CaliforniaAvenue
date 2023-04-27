import axios from 'axios';
import React, { useEffect, useState } from 'react'
import useUserData from '~/hooks/useUserData'
import Head from 'next/head';
import { useRouter } from 'next/router';
import InfoPanel from '~/components/InfoPanel';
import { hasCookie } from 'cookies-next';
import SavedListings from '~/components/SavedListings';
import TextInput from '~/components/TextInput';
import { isEqual } from 'lodash-es';
import useUpdateUser from '~/hooks/useUpdateUser';
import CheckCircle from '~/components/icons/Check_Circle';


// TODO: Dynamically pull in saved listings from user data


function Profile() {
    const [data] = useUserData();
    const updateUser = useUpdateUser();
    const [localData, setLocalData] = useState(null);
    const [inputs, setInputs] = useState({});
    const [allowSubmit, setAllowSubmit] = useState(false);
    const [updateSuccess, setUpdateSuccess] = useState(null);

    const router = useRouter();

    // Create a copy of user data whenever it is loaded from the DB
    useEffect(() => {
        if (localData) {
            setInputs({ ...localData });
        }
    }, [localData])

    // Compare user data to input data to see if it has been changed.
    // We dont want the user to be able to update their info if they haven't changed anything.
    useEffect(() => {
        if (inputs) {
            isEqual(localData, inputs) ? setAllowSubmit(false) : setAllowSubmit(true);
        }
    }, [inputs])


    useEffect(() => {
        if (updateSuccess) {
            setTimeout(() => {
                setUpdateSuccess(null);
            }, 3000)
        }
    }, [updateSuccess])


    // Get user data from DB using JWT
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
                    else if (e.request) {
                        console.error(e.request);
                    }
                    else {
                        console.error('Error', e.message);
                    }
                    router.push('/login');
                });
        }

    }, [data])


    async function handleDataUpdate() {
        const res = updateUser(inputs)
        if (res) {
            console.log(res);
            setUpdateSuccess(true);
            setAllowSubmit(false);
            setLocalData({ ...inputs });
        }
        else {
            console.error(e);
            setUpdateSuccess(false);
            setAllowSubmit(false);
        }
    }


    if (hasCookie('user_data')) {
        if (data && localData) {
            return (
                <>
                    <Head>
                        <title>Profile | Cali Ave.</title>
                    </Head>
                    <div className='py-14 px-52 w-3/4 h-full flex-col items-center m-14 rounded-xl bg-gray-100'>
                        <div className='flex flex-col items-center w-full my-10 rounded-e-lg'>
                            <h1 className='font-bold text-3xl mb-10'>Welcome Back, {data.name.split(' ')[0]}!</h1>
                        </div>

                        <div className='flex flex-col w-full items-center'>
                            <h3 className='text-lg underline font-bold mb-5'>Your Saved Listings</h3>
                            <div className='max-w-screen-lg flex flex-col items-center mb-20'>
                                <SavedListings savedListings={[]} />
                            </div>
                        </div>


                        <div className='p-20 flex flex-col items-center'>
                            <h3 className='text-lg underline font-bold mb-10'>Account Details</h3>
                            <div className='flex flex-col w-full items-center'>
                                <div className='w-1/2 flex flex-col'>
                                    <TextInput labelClassic edit disabled
                                        label_text={'Name'}
                                        name={'name'}
                                        useParentInput={[inputs, setInputs]}
                                    />
                                    <TextInput labelClassic edit disabled
                                        label_text={'Email'}
                                        name={'email'}
                                        useParentInput={[inputs, setInputs]}
                                    />
                                    <TextInput labelClassic edit disabled
                                        label_text={'Zip Code'}
                                        name={'zip_code'}
                                        useParentInput={[inputs, setInputs]}
                                    />
                                    <div className='flex justify-between items-center'>
                                        <div className={`flex transition-opacity ${updateSuccess ? 'opacity-100' : 'opacity-0'} flex items-center`}>
                                            <h1 className={`text-green-600 font-bold text-lg mr-2 `}>Update Successful!</h1>
                                            <CheckCircle className={'fill-green-600 w-6 h-6'} />
                                        </div>
                                        <input type="button" value="Update" disabled={!allowSubmit} className={`self-end text-white rounded-xl h-12 text-lg py-2 px-4 ${!allowSubmit ? 'bg-gray-500 cursor-default' : 'bg-blue-500'} cursor-pointer`} onClick={() => { handleDataUpdate() }} />
                                    </div>

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