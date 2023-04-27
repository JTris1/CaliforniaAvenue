import React, { use, useEffect, useState } from 'react'
import Head from 'next/head'
import TextInput from '~/components/TextInput'
import axios from 'axios'
import useUserData from '~/hooks/useUserData'
import { getCookie } from 'cookies-next';
import { useRouter } from 'next/router'
import Error from '~/components/icons/Error'

function Login() {

    return (
        <>
            <Head>
                <title>Sign In | Cali Ave.</title>
            </Head>
            <div className='w-full flex justify-center'>
                <div id="form" className='w-2/3 flex flex-col items-center'>
                    <h1 className='font-bold text-3xl m-20'>{"Welcome Back!"}</h1>
                    <LoginForm />
                </div>
            </div>
        </>
    )
}


function LoginForm() {
    const [inputs, setInputs] = useState({});
    const [loginError, setLoginError] = useState(false);
    const [data, setData] = useUserData();
    const router = useRouter();


    useEffect(() => {
        setLoginError((current) => { if (current) return (false) });
    }, [inputs])

    async function sendLoginData(e) {
        e.preventDefault();

        let loginCredentials = {
            email: inputs.email_address,
            password: inputs.password
        };

        const loginRes = await loginUser(loginCredentials);

        if (loginRes) {
            setData(loginRes.data);
            router.push('/profile');
        }
        else {
            setLoginError(true);
        }
    }

    async function loginUser(credentials) {
        try {
            let res = await axios.post(process.env.NEXT_PUBLIC_API_URL + '/users/login', credentials);
            console.log(res);
            return res;
        }
        catch (err) {
            console.error(err);
            return null;
        }
    }

    return (
        <form method='post' className='flex flex-col w-full max-w-screen-sm' onSubmit={(e) => sendLoginData(e)}>
            <TextInput type={'email'} name={'email_address'} label={true} label_text={'Email Address'} useParentInput={[inputs, setInputs]} />
            <TextInput type={'password'} name={'password'} label={true} label_text={'Password'} useParentInput={[inputs, setInputs]} />

            <div className='flex justify-between'>
                <div className={`flex items-center ${loginError ? '' : 'invisible'}`}>
                    <Error className={'fill-red-500 w-6 mr-2'} />
                    <p className='text-red-500 text-sm font-bold'>Not a valid email or password. Please try again.</p>
                </div>

                <input type="submit" value="Login" className='self-end bg-blue-500 text-white rounded-xl h-12 text-lg py-2 px-4 cursor-pointer' />
            </div>

        </form>
    )
}

export default Login