import React, { useEffect, useState } from 'react'

function ZipCodeSearch() {
    const [codes] = useState(['90706', '93905', '92056', '91801', '90210', '91766', '90034', '92083', '95112']);
    const [placeholder, setPlaceholder] = useState([]);
    const [currentCode, setCurrentCode] = useState(generateCode());

    function generateCode() {
        return codes[Math.floor(Math.random() * codes.length)];
    }

    useEffect(() => {
        setPlaceholder(currentCode);
        // function randomZipCodes() {
        //     setInterval(() => {
        //         let tempCode = generateCode();
        //         setCurrentCode(tempCode);

        //         let char = 0;
        //         let timeOut;

        //         function typeIt() {
        //             var humanize = Math.round(Math.random() * (200 - 30)) + 30;
        //             timeOut = setTimeout(() => {

        //                 console.log(`Current iteration: ${char} (${currentCode[char]})`);
        //                 let text = currentCode[char];
        //                 setPlaceholder([...placeholder, text, '|']);
        //                 console.log(placeholder);

        //                 if (char == currentCode.length - 1) {
        //                     setPlaceholder([...placeholder, placeholder.slice(0, -1)]);
        //                     clearTimeout(timeOut);
        //                     console.log('timeout cleared');
        //                 }
        //                 else {
        //                     char++;
        //                     typeIt();
        //                 }
        //             }, humanize);
        //         }

        //         typeIt();
        //     }, 4000);

        // }
        // randomZipCodes();
    }, [])

    return (
        <input className={`border-solid border-4 border-blue-500 rounded-xl w-1/2 h-14 text-2xl py-2 px-4 focus:outline-none`} id='zipcode-home-search' type="text" name="zipcode" placeholder={placeholder} />
    )
}

export default ZipCodeSearch