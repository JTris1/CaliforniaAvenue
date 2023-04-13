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

  function sumbitZipCode(e) {
    // This does NOT submit a form, or query the API.
    // This simply routes to the 'listings' page, which handles all of that.
    if (e) {
      e.preventDefault();
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
        <div className='flex justify-center items-center w-2/3'>
          <form action="" method="get" className='w-full flex justify-center items-center'
            onSubmit={(e) => sumbitZipCode(e)}
          >
            <ZipCodeSearch setSearchInput={setSearchInput} />
            <button className='bg-blue-500 rounded-full w-10 h-10 -ml-14 text-white font-black' onClick={() => sumbitZipCode()}>
              <span className="material-symbols-outlined text-3xl">arrow_forward</span>
            </button>
          </form>

        </div>
        <Carousel slides={3} />
      </main>
    </>

  )
}
