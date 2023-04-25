import React, { useEffect, useState } from 'react'
import useUserData from '~/hooks/useUserData';

function ZipCodeSearch({ setSearchInput }) {
    const [codes] = useState(['90706', '93905', '92056', '91801', '90210', '91766', '90034', '92083', '95112']);
    const [placeholder, setPlaceholder] = useState('');
    const [currentCode, setCurrentCode] = useState(generateCode());
    const [data] = useUserData();

    function generateCode() {
        return codes[Math.floor(Math.random() * codes.length)];
    }

    return (
        // <input className={`border-solid border-4 border-blue-500 rounded-xl w-full -ml-4 h-14 text-2xl py-2 px-4 focus:outline-none`} 
        <input className={`border-solid border-2 border-blue-300 bg-white rounded-xl h-14 w-full text-2xl -ml-4 py-2 px-4 transition-shadow focus:outline-none focus:[box-shadow:0_0_1px_3px_rgba(3,64,120,0.5)]`}
            id='zipcode-home-search'
            type="text" name="zipcode"
            placeholder={currentCode}
            onInput={(e) => setSearchInput(e.target.value)}
            value={data ? data.zip_code : undefined}
        />
    )
}

export default ZipCodeSearch