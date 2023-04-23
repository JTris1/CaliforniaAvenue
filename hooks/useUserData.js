import React, { useEffect, useState } from 'react'
import { setCookie, getCookie, hasCookie } from 'cookies-next'
const ms = require('ms');

function useUserData() {
    const [data, setData] = useState(getData());

    function saveData(data) {
        console.log(data);
        const stringData = JSON.stringify(data);

        // Cookie expires one month after login data
        setCookie('user_data', stringData, { expires: new Date(data.ts + ms('30d')) });
        console.log('cookie saved');
        setData(data);
        console.log('Data in useUserData: ', data);
    }

    function getData() {
        const dataString = getCookie('user_data');

        if (dataString !== undefined) {
            const userObj = JSON.parse(dataString);
            return userObj;
        }
        else {
            console.log('user data is undefined')
            return null;
        }
    }

    return [data, saveData]
}

export default useUserData