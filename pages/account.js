import React from 'react'
import TextInput from '~/components/TextInput'

function Account() {

    function registerUser(e, form) {
        e.preventDefault();
        console.log(e);
        console.log(form);
    }

    return (
        <div className='w-full flex justify-center'>
            <div id="form" className='w-2/3 flex flex-col items-center'>
                <h1 className='font-bold text-3xl m-20'>{"Let's get you signed up!"}</h1>
                <form method='post' action='https://vishalhelloworld-375613.ue.r.appspot.com/subscribe' className='flex flex-col w-2/3'>
                    <TextInput name={'name'} placeholder={'Name'} />
                    <TextInput type={'email'} name={'email_address'} placeholder={'Email Address'} />
                    <TextInput type={'tel'} name={'phone_number'} placeholder={'Phone Number'} />
                    <TextInput type={'text'} name={'zip_code'} placeholder={'Zip Code'} />
                    <TextInput type={'password'} name={'password'} placeholder={'Password'} />
                    <TextInput type={'password'} name={'repassword'} placeholder={'Retype Password'} />

                    <input type="submit" value="Sign Up" className='self-end border-solid border-4 border-blue-500 bg-blue-500 text-white rounded-xl h-12 text-lg mb-5 py-2 px-4' />
                </form>
            </div>
        </div>
    )
}

export default Account