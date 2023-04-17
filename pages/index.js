import { Lato } from 'next/font/google'
import Head from 'next/head';
import { useRouter } from 'next/router';
import Script from 'next/script';
import { useEffect, useState } from 'react';
import Carousel from '~/components/Carousel';
import ZipCodeSearch from '~/components/ZipCodeSearch';

const lato = Lato({ weight: ['400', '700', '900'], subsets: ['latin'] });

export default function Home() {
  const [searchInput, setSearchInput] = useState(null);
  const [searchStatus, setSearchStatus] = useState(null);
  const router = useRouter();

  function sumbitZipCode(e) {
    // This does NOT submit a form, or query the API.
    // This simply routes to the 'listings' page, which handles all of that.
    if (e) {
      e.preventDefault();
    }

    if (searchInput.length === 5 && searchInput[0] == '9') {
      setSearchStatus('OK');
      router.push(`/listings?zipcode=${searchInput}`);
    }
    else {
      setSearchStatus('BAD_ZIP_CODE');
    }
  }

  return (
    <>
      <Head>
        <title>California Avenue</title>
      </Head>
      <main className={`flex flex-col min-w-[1280px] max-w-[1920px] items-center p-16 ${lato.className}`}>
        <div className='flex flex-col items-center my-32'>
          <h1 className='font-bold text-5xl mb-3'>Ready to find your dream property?</h1>
          <h1 className='font-bold text-5xl'>Start by entering your Zip Code below.</h1>
        </div>
        <div className='flex flex-col justify-center items-center w-2/5'>
          <form action="" method="get" className='w-full flex justify-center flex-col'
            onSubmit={(e) => sumbitZipCode(e)}
          >
            <div className='flex justify-center items-center w-full'>
              <ZipCodeSearch setSearchInput={setSearchInput} />
              <button className='bg-blue-500 rounded-full w-10 h-10 -ml-14 text-white font-black' onClick={() => sumbitZipCode()}>
                <span className="material-symbols-outlined text-3xl">arrow_forward</span>
              </button>
            </div>
            {searchStatus === "BAD_ZIP_CODE" ?
              (
                <div className='flex items-center mt-5'>
                  <span className='material-symbols-outlined text-3xl text-red-500 rounded-full mr-4'>error</span>
                  <p className='w-full text-red-500 font-bold'>Not a valid Zip Code</p>
                </div>
              )
              :
              undefined}

          </form>

        </div>
        <Carousel slides={3} />
      </main>
    </>

  )
}
