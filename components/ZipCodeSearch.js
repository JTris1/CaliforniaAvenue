import React, { useEffect, useState } from 'react'

function ZipCodeSearch({ setSearchInput }) {
    const [codes] = useState(['90706', '93905', '92056', '91801', '90210', '91766', '90034', '92083', '95112']);
    const [placeholder, setPlaceholder] = useState('');
    const [currentCode, setCurrentCode] = useState(generateCode());

    function generateCode() {
        return codes[Math.floor(Math.random() * codes.length)];
    }

    return (
        <input className={`border-solid border-4 border-blue-500 rounded-xl w-full -ml-4 h-14 text-2xl py-2 px-4 focus:outline-none`} id='zipcode-home-search'
            type="text" name="zipcode"
            placeholder={currentCode}
            onInput={(e) => setSearchInput(e.target.value)}
        />
    )
}

export default ZipCodeSearch