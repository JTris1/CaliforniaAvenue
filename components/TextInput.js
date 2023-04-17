import React from 'react'

function TextInput({ name, placeholder, type }) {
    return (
        <input type={type || 'text'} name={name} placeholder={placeholder} className='border-solid border-4 border-blue-500 rounded-xl h-12 text-lg mb-5 py-2 px-4 focus:outline-none' />
    )
}

export default TextInput