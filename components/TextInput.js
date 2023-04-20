import React from 'react'

function TextInput({ name, placeholder, type, label, label_text }) {
    return (
        <span className='flex flex-col-reverse relative'>
            <input type={type || 'text'} name={name} placeholder={placeholder} className={`peer border-solid border-2 border-blue-300 bg-white rounded-xl h-12 text-lg mb-5 py-2 px-4 transition-shadow focus:outline-none focus:[box-shadow:0_0_1px_3px_rgba(3,64,120,0.50)]`} />
            {label ? <label className={`bg-white text-gray-500 w-fit ml-3 absolute top-3 px-1 z-10 peer-focus:-translate-y-6 transition-transform`}>{label_text}</label> : undefined}
        </span>

    )
}

export default TextInput