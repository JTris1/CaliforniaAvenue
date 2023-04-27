import axios from 'axios';
import Head from 'next/head'
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import TextInput from '~/components/TextInput'
import CheckCircle from '~/components/icons/Check_Circle';
import useLogin from '~/hooks/useLogin';

function Register() {
    const [inputs, setInputs] = useState({});
    const [loginSuccess, setLoginSuccess] = useState(false);
    const router = useRouter();
    const login = useLogin();

    useEffect(() => {
        if (loginSuccess) {
            setTimeout(() => {
                router.push('/profile');
            }, 3000)
        }
    }, [loginSuccess])

    async function handleSubmit(e) {
        e.preventDefault();


        console.log(inputs);

        axios.post(process.env.NEXT_PUBLIC_API_URL + '/users/register', inputs)
            .then(async (res) => {
                console.log(res.status);
                if (res.status === 201) {
                    // LOGIN
                    login({ 'email': inputs.email_address, 'password': inputs.password }).then((res) => {
                        if (res) {
                            console.log('Success');
                            setLoginSuccess(true);
                        }
                        else {
                            console.log('Couldn\'t login');
                        }
                    })
                }
                else if (res.status === 409) {
                    console.log('That email already exisits');
                    setLoginSuccess(false);
                }
            })
            .catch((e) => {
                console.log(e);
            });
    }




    return (
        <>
            <Head>
                <title>Sign Up | Cali Ave.</title>
            </Head>
            <div className='w-full flex justify-center'>
                <div id="form" className='w-2/3 flex flex-col items-center'>
                    <h1 className='font-bold text-3xl m-20'>{"Let's get you signed up!"}</h1>
                    <form method='post' action='' className='flex flex-col w-full max-w-screen-sm' onSubmit={(e) => handleSubmit(e)}>
                        <TextInput name={'name'} label={true} label_text={'Name'} useParentInput={[inputs, setInputs]} />
                        <TextInput type={'email'} name={'email_address'} label={true} label_text={'Email Address'} useParentInput={[inputs, setInputs]} />
                        <TextInput type={'tel'} name={'phone_number'} label={true} label_text={'Phone Number'} useParentInput={[inputs, setInputs]} />
                        <TextInput type={'text'} name={'zip_code'} label={true} label_text={'Zip Code'} useParentInput={[inputs, setInputs]} />
                        <TextInput type={'password'} name={'password'} label={true} label_text={'Password'} useParentInput={[inputs, setInputs]} />
                        <TextInput type={'password'} name={'repassword'} label={true} label_text={'Confirm Password'} useParentInput={[inputs, setInputs]} />

                        <input type="submit" value="Sign Up" className='self-end bg-blue-500 text-white rounded-xl h-12 text-lg mb-5 py-2 px-4 cursor-pointer' />
                    </form>
                </div>
            </div>
            {loginSuccess ? (
                <>
                    <div className='w-full h-full'>
                        <div className='w-2/5 h-1/4 bg-blue-300 absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-xl z-[150] drop-shadow-2xl flex justify-center items-center '>
                            <div className='relative flex flex-col justify-between items-center h-full w-full text-white p-12'>
                                <span className='invisible'>dummy</span>
                                <span className="material-symbols-outlined text-4xl absolute right-5 top-5 cursor-pointer" onClick={() => setLoginSuccess(false)}>
                                    close
                                </span>
                                <div className='flex items-center'>
                                    <h1 className='text-white font-bold text-3xl mr-8'>Registration Successful!</h1>
                                    <CheckCircle className={'fill-white w-12 h-12'} />
                                </div>
                                <span>Automatically redirecting to your account page in 3 seconds...</span>
                            </div>
                        </div>
                    </div>
                </>
            ) : (
                <>

                </>
            )}
        </>
    )
}

export default Register